"use client"

import { useRouter } from "next/navigation";
import Image from 'next/image';

type Room = {
    name: string;
    amenities: string,
    rentPerDay: number;
    media?: any;
    _id: string;
    type: any
};

const Filter = ({ rooms }: { rooms: Room[] }) => {

    const router = useRouter();

    return (
        <>
            <header className="section__container header__container">
                <div className="header__image__container">
                    <div className="header__content">
                        <h1>Enjoy Your Dream Vacation</h1>
                        <p>Book Hotels, Flights and stay packages at lowest price.</p>
                    </div>
                    {/* <div className="booking__container">
                        <form>
                            <div className="form__group">
                                <div className="input__group">
                                    <input type="text" />
                                    <label>Location</label>
                                </div>
                                <p>Where are you going?</p>
                            </div>
                            <div className="form__group">
                                <div className="input__group">
                                    <input type="text" />
                                    <label>Check In</label>
                                </div>
                                <p>Add date</p>
                            </div>
                            <div className="form__group">
                                <div className="input__group">
                                    <input type="text" />
                                    <label>Check Out</label>
                                </div>
                                <p>Add date</p>
                            </div>
                            <div className="form__group">
                                <div className="input__group">
                                    <input type="text" />
                                    <label>Guests</label>
                                </div>
                                <p>Add guests</p>
                            </div>
                        </form>
                        <button className="btn"><i className="ri-search-line" /></button>
                    </div> */}





                </div>
            </header>
            <div className="nav__logo" style={{ textAlign: "center" }}> Top Rooms</div>
            <div className="hotel-list">

                {rooms?.length > 0 ? (
                    rooms.map((room) => (
                        <div key={room?._id} className="hotel-card">
                            <img src={room?.media?.[0]} alt={room.name} className="hotel-image" />
                            <div className='hotel-info'>

                                <h2 className="hotel-name">{room.name || "Room Name Unavailable"}</h2>
                                <p>Type: <b>{room?.type || "Not specified"} </b></p>
                                <p>Price:<b> ₹{room?.rentPerDay || "Not specified"} per day</b></p>

                                <button className="header-button"
                                    onClick={() => router.push(`/hotels/room/${room?._id}`)}
                                >View Details</button>

                            </div>
                            {/* <div className="room-info">
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #ddd", paddingBottom: "3px" }}>
                                    <h3 className='poppins-bold' >{room.name || "Room Name Unavailable"}</h3>
                                    <button className="room-view-details "
                                        onClick={() => router.push(`/hotels/room/${room?._id}`)}
                                    >View Details</button>
                                </div>
                                <p>Type: <b>{room?.type || "Not specified"} </b></p>
                                <p>Price:<b> ₹{room?.rentPerDay || "Not specified"} per day</b></p>
                                <ul className="amenities">
                                    {room?.amenities?.split(",")?.length > 0 ? (
                                        room?.amenities?.split(",")?.map((amenity, index) => <li key={index} className='each-amenity'>{amenity}</li>)
                                    ) : (
                                        <li>No amenities listed</li>
                                    )}
                                </ul>
                            </div> */}
                        </div>
                    ))
                ) : (
                    <p>No rooms available at the moment</p>
                )}
            </div>
        </>
    )
}

export default Filter