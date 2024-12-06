import { connect } from "@/dbConfig/dbConfig";
import HotelModel from "@/models/hotel-model";
connect()

const HotelDetailCard = async ({ hotelId }: { hotelId: string | any }) => {

    // console.log("hotelId--------------------", hotelId);

    const response = await HotelModel.findOne({ _id: hotelId });
    // console.log("hotel", response)

    return (
        <>
            {/* Hotel Details Section */}
            <div className="hotel-details">
                <img src={response?.media?.[0]} alt={response?.name} className="hotel-image" />
                <h2 className="poppins-bold heading-two"> {response?.name}</h2>
                <p style={{ padding: "4px 1px" }}><strong>Owner:</strong> {response?.owner}</p>
                <p style={{ padding: "4px 1px" }}><strong>Email:</strong> {response?.email}</p>
                <p style={{ padding: "4px 1px" }}><strong>Phone:</strong> {response?.phone}</p>
                <p style={{ padding: "4px 1px" }}><strong>Address:</strong> {response?.address}</p>

            </div>
        </>
    )
}

export default HotelDetailCard