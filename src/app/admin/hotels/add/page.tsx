import React from "react";
import HotelForm from "../_common/hotel-form";

function AddHotelPage() {
    return (
        <div className="poppins-regular">
            <p className="add-hotel"><span style={{ color: "#6e8efb", fontSize: "1rem", fontWeight: "bold" }}>ADD HOTEL</span> (All (*) marked fields are mandatory)</p>
            <HotelForm
                type="add"
            />
        </div>
    );
}

export default AddHotelPage;
