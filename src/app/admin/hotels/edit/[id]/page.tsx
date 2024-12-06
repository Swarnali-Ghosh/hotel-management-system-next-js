import React from "react";
import HotelForm from "../../_common/hotel-form";
import HotelModel from "@/models/hotel-model";

async function EditHotelPage({
    params,
}: {
    params: {
        id: string;
    };
}) {
    const hotelId = params.id;
    const response = await HotelModel.findById(hotelId);
    const hotel = JSON.parse(JSON.stringify(response));
    return (
        <div className="poppins-regular">
            <p className="add-hotel"><span style={{ color: "#6e8efb", fontSize: "1rem", fontWeight: "bold" }}>EDIT HOTEL</span> ( All (*) marked fields are mandatory )</p>
            <HotelForm type="edit"
                initialData={hotel}
            />
        </div>
    );
}

export default EditHotelPage;
