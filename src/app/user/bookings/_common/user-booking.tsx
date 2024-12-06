"use client";
import { BookingType } from '@/interfaces';
import '../../style/style.css'
import React, { useEffect, useState } from 'react'
import CancelBookingModal from './cancel-booking-modal';
import { useRouter } from 'next/navigation';

const UserBooking = ({ bookings }: { bookings: BookingType[] }) => {

    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);
    const [loginState, setLoginState] = useState(false);

    const [showCancelBookingModal, setShowCancelBookingModal] =
        React.useState(false);
    const [selectedBooking, setSelectedBooking] =
        React.useState<BookingType | null>(null);

    const onCancel = async (booking: BookingType) => {
        setSelectedBooking(booking);
        setShowCancelBookingModal(true);
    };

    useEffect(() => {
        // Fetch the token from the API
        fetch("/api/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                setToken(data?.token)
            });

    }, []);

    useEffect(() => {
        if (token) {
            setLoginState(true);
        } else {
            setLoginState(false)
        }
    }, [token]);

    const auth = () => {
        if (loginState) {
            // logout();
        } else {
            router.push('/signup');
        }
    };

    return (
        <>
            <main className="" style={{ padding: "18px" }}>
                <h3 className='poppins-bold heading-two'>Booking Details</h3>
                {loginState ? '' :

                    <button className="header-button" style={{ width: "20%" }} onClick={auth}>
                        Signup
                    </button>

                }

                {loginState && bookings?.length > 0 ? (
                    bookings.map((booking) => (
                        <div key={booking?._id} className="each-room-card">
                            <div className="room-info">
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #ddd", paddingBottom: "3px" }}>
                                    <h4 >Booking Id: {booking?._id}</h4>
                                    {
                                        booking.bookingStatus === "Booked" ? (
                                            <button className="room-view-details " style={{ backgroundColor: "tomato" }}
                                                onClick={() => onCancel(booking)}
                                            >Cancel</button>) : <p className='room-view-details' style={{ color: "#fff" }}> {booking.bookingStatus}</p>
                                    }
                                </div>
                                <p>Room Id: <b>{booking?.room?._id || "Not specified"} </b></p>
                                <p>Room Name: <b>{booking?.room?.name || "Not specified"} </b></p>
                                <p>Booking Status:<b> {booking?.bookingStatus || "Not specified"}</b></p>
                                <p>Total Days:<b>{booking?.totalDays}</b></p>
                                <p>Rent Per Day:<b> ₹{booking?.room?.rentPerDay}</b></p>
                                <p>Total Amount:<b> ₹{booking?.totalAmount}</b></p>
                                <p>Check In Date:<b> {booking?.checkInDate}</b></p>
                                <p>Check Out Date:<b> {booking?.checkOutDate}</b></p>

                            </div>
                            {showCancelBookingModal && selectedBooking && (
                                <CancelBookingModal
                                    showCancelBookingModal={showCancelBookingModal}
                                    setShowCancelBookingModal={setShowCancelBookingModal}
                                    booking={selectedBooking}
                                />
                            )}
                        </div>
                    ))
                ) : (
                    loginState ? (
                        <p>No booking details available at the moment</p>
                    ) : (
                        <p>Sign up to get booking details.</p>
                    )
                )}


            </main>
        </>
    )
}

export default UserBooking