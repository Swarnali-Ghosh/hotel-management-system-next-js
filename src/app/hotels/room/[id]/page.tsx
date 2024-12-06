import Header from '@/components/Header'
import React from 'react'
import '../../style/style.css'
import RoomModel from '@/models/room-model';
import HotelModel from '@/models/hotel-model';
import RoomCheckoutForm from '../../_common/room-checkout-form';
import Image from 'next/image';

const HotelRoom = async ({
    params,
}: {
    params: {
        id: string;
    };
}) => {

    const roomId = params.id;

    const response = await RoomModel.findOne({ _id: roomId }).sort({ createdAt: -1 });
    const room = JSON.parse(JSON.stringify(response));

    const hotel_response = await HotelModel.findOne({ _id: response?.hotel }).sort({ createdAt: -1 });
    const hotel = JSON.parse(JSON.stringify(hotel_response));
    // console.log("hotel ------------->", hotel)

    return (

        <>
            <Header />

            <div className="room-page-content poppins-medium">
                <div className='room-page-first-section'>
                    {/* Images Section */}
                    <div className="room-img-info">
                        {room?.media?.map((each_room: any) => (
                            <img key={each_room} src={each_room} alt={each_room} className="room-page-image" />
                        ))}
                    </div>

                    {/* Room Info */}
                    <div className="info-section">
                        <br></br>
                        <div className="info-block">
                            <p style={{ display: "flex" }}><label>Room Name: </label> &nbsp; {room?.name}</p>
                            <p style={{ display: "flex" }}><label>Room Type: </label>&nbsp; {room?.type}</p>
                            <p style={{ display: "flex" }}><label>Rent Per Day: </label>&nbsp; ₹{room?.rentPerDay}</p>
                        </div>
                        <div className="info-block">
                            <p style={{ display: "flex" }}><label>Room Number: </label>&nbsp; {room?.roomNumber}</p>
                            <p style={{ display: "flex" }}><label>Bedrooms: </label>&nbsp; {room?.bedrooms}</p>
                            <p style={{ display: "flex" }}><label>Owner: </label>&nbsp; {hotel?.owner}</p>
                        </div>
                        <div className="info-block">
                            <p style={{ display: "flex" }}><label>Email: </label>&nbsp; {hotel?.email}</p>
                            <p style={{ display: "flex" }}><label>Phone: </label>&nbsp; {hotel?.phone}</p>
                            <p style={{ display: "flex" }}><label>Address: </label>&nbsp; {hotel?.address}</p>
                        </div>
                    </div>

                    {/* Amenities Section */}
                    <div className="amenities">
                        <label>Amenities:</label>
                        <ul className="amenities">
                            {room?.amenities?.split(",")?.length > 0 ? (
                                room?.amenities?.split(",")?.map((amenity: any) => <li key={amenity} className='each-amenity'>{amenity}</li>)
                            ) : (
                                <li>No amenities listed</li>
                            )}
                        </ul>
                    </div>
                </div>

                <RoomCheckoutForm room={room} />
            </div>
        </>
    )
}

export default HotelRoom