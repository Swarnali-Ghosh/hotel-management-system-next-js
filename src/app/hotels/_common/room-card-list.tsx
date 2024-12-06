"use client"
// [console error] × You're importing a component that needs useRouter. It only works in a Client Component but none of its parents are marked with "use client", so they're Server Components by default. 

import { useRouter } from "next/navigation";
import '../style/style.css'

type Room = {
    name: string;
    amenities: string,
    rentPerDay: number;
    media?: any;
    _id: string;
    type: any
};

const RoomCardList = ({ rooms }: { rooms: Room[] }) => {

    const router = useRouter();

    return (
        <div>
            <main className="rooms">
                <h2 className='poppins-bold heading-two'>Rooms</h2>
                {rooms?.length > 0 ? (
                    rooms.map((room) => (
                        <div key={room?._id} className="each-room-card">

                            <div className='room-img-info'>
                                {room?.media?.length > 0 ? (
                                    room?.media?.map((each_media: any) => <img
                                        src={each_media}
                                        alt={each_media}
                                        className="room-image"
                                    />
                                    )) : (
                                    <div className="room-placeholder">No image available</div>
                                )}
                            </div>
                            <div className="room-info">
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
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No rooms available at the moment</p>
                )}

            </main>

        </div>
    )
}

export default RoomCardList