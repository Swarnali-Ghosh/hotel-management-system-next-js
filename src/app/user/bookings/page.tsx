"use server"
import Header from "@/components/Header";
import { connect } from "@/dbConfig/dbConfig";
import BookingModel from "@/models/booking-model";
import "@/models/room-model"
import "@/models/hotel-model"
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers"; // Import cookies utility
import UserBooking from "./_common/user-booking";

connect();

const BookingRoom = async () => {
    // Access the token from the cookies
    const cookieStore = cookies();
    const token: any = cookieStore.get("token"); // Replace 'token' with the actual cookie name

    // console.log("token", token)

    const decoded: any = token ? jwtDecode(token?.value) : null;

    let userBookings: any = [];

    if (!decoded) {
        console.log("missing data");
    } else {
        const userBookingsResponse = await BookingModel.find({
            user: decoded?.id,
        })
            .populate("room")
            .populate("hotel")
            .sort({ createdAt: -1 });
        userBookings = JSON.parse(JSON.stringify(userBookingsResponse));
    }



    return (
        <>
            <Header />
            <UserBooking bookings={userBookings} />

        </>
    );
};

export default BookingRoom;
