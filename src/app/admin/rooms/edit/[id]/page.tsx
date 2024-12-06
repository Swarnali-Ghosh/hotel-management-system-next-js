import React from "react";
import RoomsForm from "../../_common/rooms-form";
import RoomModel from "@/models/room-model";
import HotelModel from "@/models/hotel-model";

async function EditRoomPage({
    params,
}: {
    params: {
        id: string;
    };
}) {
    const roomId = params.id;
    const response = await RoomModel.findById(roomId);
    const rooms = JSON.parse(JSON.stringify(response));

    const hotelsReponse = await HotelModel.find();
    const hotels = JSON.parse(JSON.stringify(hotelsReponse));
    return (
        <div className="poppins-regular">
            <p className="add-hotel"><span style={{ color: "#6e8efb", fontSize: "1rem", fontWeight: "bold" }}>EDIT HOTEL</span> ( All (*) marked fields are mandatory )</p>
            <RoomsForm
                initialData={rooms}
                type="edit" hotels={hotels}
            />
        </div>
    );
}

export default EditRoomPage;
