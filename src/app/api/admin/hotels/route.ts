"use server";

import { connect } from "@/dbConfig/dbConfig";
import HotelModel from "@/models/hotel-model";
import { revalidatePath } from "next/cache";

export const AddHotel = async (payload: any) => {
    try {

        // console.log("payload --->", payload);

        await connect();
        const newHotel = new HotelModel(payload);
        await newHotel.save();
        revalidatePath("/admin/hotels");
        return {
            success: true,
            message: "Hotel added successfully",
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message,
        };
    }
};

export const EditHotel = async ({
    hotelId,
    payload,
}: {
    hotelId: string;
    payload: any;
}) => {
    try {
        await connect();
        await HotelModel.findByIdAndUpdate(hotelId, payload);
        revalidatePath("/admin/hotels");
        return {
            success: true,
            message: "Hotel updated successfully",
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message,
        };
    }
};

export const DeleteHotel = async (hotelId: string) => {
    try {
        await connect();
        await HotelModel.findByIdAndDelete(hotelId);
        revalidatePath("/admin/hotels");
        return {
            success: true,
            message: "Hotel deleted successfully",
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message,
        };
    }
};
