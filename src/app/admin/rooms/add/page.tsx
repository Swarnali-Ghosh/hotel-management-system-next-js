import React from "react";
import RoomsForm from "../_common/rooms-form";
import HotelModel from "@/models/hotel-model";
import { connect } from "@/dbConfig/dbConfig";


async function AddRoomPage() {
    await connect();
    const response = await HotelModel.find();
    const hotels = JSON.parse(JSON.stringify(response));
    return (
        <div className="poppins-regular">
            <p className="add-hotel"><span style={{ color: "#6e8efb", fontSize: "1rem", fontWeight: "bold" }}>ADD ROOM</span> (All (*) marked fields are mandatory)</p>
            <RoomsForm
                hotels={hotels}
            />
        </div>
    );
}

export default AddRoomPage;