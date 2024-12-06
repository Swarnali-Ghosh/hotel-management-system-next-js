"use client";

import { useRouter } from "next/navigation";
import '../style/style.css'

type Hotel = {
    id: string;
    name: string;
    address: string;
    media?: string[];
    _id: string;
};

const HotelCardList = ({ hotels }: { hotels: Hotel[] }) => {
    const router = useRouter();

    return (
        <>
            <br></br>
            <br />
            <div className="nav__logo" style={{ textAlign: "center" }}> Top Hotels</div>
            <br />
            <div className="hotel-list">
                {hotels?.length > 0 ? (
                    hotels.map((hotel) => (
                        <div key={hotel?._id} className="hotel-card">
                            <img src={hotel.media?.[0]} alt={hotel.name} className="hotel-image" />
                            <div className="hotel-info">
                                <h2 className="hotel-name">{hotel.name}</h2>
                                <p className="hotel-address">
                                    {hotel?.address?.length > 40
                                        ? `${hotel?.address.slice(0, 40)}...`
                                        : hotel?.address}
                                </p>


                                <button className="header-button"
                                    onClick={() => router.push(`/hotels/${hotel?._id}`)}
                                >View Details</button>



                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hotels available</p>
                )}
            </div>
            <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                {/* <button className="view-details">Load More</button> */}
            </div>
        </>
    );
};

export default HotelCardList;
