"use server";

// import { GetCurrentUserFromMongoDB } from "./users";
import { revalidatePath } from "next/cache";
import RoomModel from "@/models/room-model";
import BookingModel from "@/models/booking-model";
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import mongoose from "mongoose";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


// connect();

export const CheckRoomAvailability = async ({
    roomId,
    reqCheckInDate,
    reqCheckOutDate
}: {
    roomId: string,
    reqCheckInDate: string,
    reqCheckOutDate: string
}) => {
    try {
        console.log(roomId, reqCheckInDate, reqCheckOutDate);
        await connect(); // Ensure DB connection is established

        const reqCheckInDateObj = new Date(reqCheckInDate);
        let reqCheckOutDateObj = new Date(reqCheckOutDate);
        // Adjust check-out date to the end of the day
        reqCheckOutDateObj.setUTCHours(23, 59, 59, 999);

        // console.log("reqCheckInDateObj", reqCheckInDateObj);// 2024-12-08T00:00:00.000Z

        // console.log("reqCheckOutDateObj", reqCheckOutDateObj);// 2024-12-08T00:00:00.000Z



        // Check for bookings that overlap with the requested dates
        const bookedSlots = await BookingModel.findOne({
            room: new mongoose.Types.ObjectId(roomId),
            bookingStatus: "Booked",
            $or: [
                // Check if requested check-in date is within an existing booking's range
                {
                    checkInDate: {
                        $gte: reqCheckInDateObj,  // Requested check-in is after existing check-in
                        $lt: reqCheckOutDateObj,  // And before requested checkout
                    },
                },
                // Check if requested check-out date is within an existing booking's range
                {
                    checkOutDate: {
                        $gt: reqCheckInDateObj,  // Requested check-out is after existing check-in
                        $lte: reqCheckOutDateObj, // And before existing check-out
                    },
                },
                // Check if the requested date range completely overlaps an existing booking
                {
                    $and: [
                        { checkInDate: { $lt: reqCheckInDateObj } }, // Existing booking starts before requested check-in
                        { checkOutDate: { $gt: reqCheckOutDateObj } }, // And ends after requested check-out
                    ],
                },
            ],
        });

        // If a booking exists for the requested room and dates, it's not available
        if (bookedSlots) {
            return {
                success: false,
                message: "Room is not available for the requested dates."
            };
        }

        return {
            success: true,
            message: "Room is available."
        };

    } catch (error: any) {
        return {
            success: false,
            message: error.message
        };
    }
};


export const BookRoom = async (payload: any) => {
    try {
        await connect(); // Ensure DB connection is established
        const cookieStore = cookies();

        const token_data = cookieStore.get("token")?.value || null;

        const decoded: any = token_data ? jwtDecode(token_data) : null;

        if (!decoded?.id || !mongoose.Types.ObjectId.isValid(decoded.id)) {
            throw new Error("Invalid or missing user ID");
        }

        // Updated ObjectId conversion
        payload.user = new mongoose.Types.ObjectId(decoded.id);

        const booking = new BookingModel(payload);
        let data = await booking.save();

        // console.log("booking", booking);
        revalidatePath("/user/bookings");
        return {
            success: true,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        };
    }
};

export const CancelBooking = async ({
    bookingId,
    paymentId,
}: {
    bookingId: string;
    paymentId: string;
}) => {
    try {
        await connect(); // Ensure DB connection is established
        // console.log("bookingId", bookingId);
        // console.log("paymentId", paymentId);

        // change the status of the booking to cancelled
        await BookingModel.findByIdAndUpdate(bookingId, {
            bookingStatus: "Cancelled",
        });

        // refund the payment

        const refund: any = "";
        await stripe.refunds.create({
            payment_intent: paymentId,
        });

        if (refund?.status !== "succeeded") {
            return {
                success: false,
                message:
                    "Your booking has been cancelled but the refund failed. Please contact support for further assistance.",
            };
        }

        revalidatePath("/user/bookings");
        return {
            success: true,
            message:
                "Your booking has been cancelled and the refund has been processed.",
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        };
    }
};

export const GetAvailableRooms = async ({
    reqCheckInDate,
    reqCheckOutDate,
    type,
}: {
    reqCheckInDate: string;
    reqCheckOutDate: string;
    type: string;
}) => {
    try {
        await connect(); // Ensure DB connection is established
        // if checkin date or checkout date is not valid return data only with type filter
        if (!reqCheckInDate || !reqCheckOutDate) {
            const rooms = await RoomModel.find({
                ...(type && { type }),
            }).populate("hotel");
            return {
                success: true,
                data: JSON.parse(JSON.stringify(rooms)),
            };
        }

        // first get all the rooms which are booked in the given date range
        const bookedSlots = await BookingModel.find({
            bookingStatus: "Booked",
            $or: [
                {
                    checkInDate: {
                        $gte: reqCheckInDate,
                        $lte: reqCheckOutDate,
                    },
                },
                {
                    checkOutDate: {
                        $gte: reqCheckInDate,
                        $lte: reqCheckOutDate,
                    },
                },
                {
                    $and: [
                        { checkInDate: { $lte: reqCheckInDate } },
                        { checkOutDate: { $gte: reqCheckOutDate } },
                    ],
                },
            ],
        });

        const bookedRoomIds = bookedSlots.map((slot) => slot.room);

        // get all the rooms by excluding the booked rooms
        const rooms = await RoomModel.find({
            _id: { $nin: bookedRoomIds },
            ...(type && { type }),
        }).populate("hotel");

        return {
            success: true,
            data: JSON.parse(JSON.stringify(rooms)),
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        };
    }
};