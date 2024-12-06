"use client"
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { BookingType, RoomType } from "@/interfaces";
import moment from "moment";
import { CancelBooking } from "@/app/api/common/bookings/bookings";
import ToasterClient from "@/components/ToasterClient";

function CancelBookingModal({
    booking,
    showCancelBookingModal,
    setShowCancelBookingModal,
}: {
    booking: BookingType;
    showCancelBookingModal: boolean;
    setShowCancelBookingModal: (show: boolean) => void;
}) {

    const [loading, setLoading] = React.useState(false);

    const onCancelBooking = async () => {
        try {
            setLoading(true);
            const response = await CancelBooking({
                bookingId: booking._id,
                paymentId: booking.paymentId,
            });

            if (response.success) {
                setShowCancelBookingModal(false);
                toast.success(response.message);
                setShowCancelBookingModal(false)
            } else {
                toast.error(response.message);
            }
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <ToasterClient />
            <div className="payment-modal"
                title="Cancel Booking Modal"
            >
                <div className="" style={{ width: "40%", height: "35vh", backgroundColor: "#fff", borderRadius: "5px" }}>
                    <form className="payment-form" style={{ height: "80vh", overflowY: "auto" }}>

                        <br></br>

                        <div className="text-sm text-gray-600 mb-7">
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <p>Check In Date</p>
                                <p>{moment(booking.checkInDate).format("MMM DD, YYYY")}</p>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <p>Check Out Date: </p>
                                <p> {moment(booking.checkOutDate).format("MMM DD, YYYY")}</p>
                            </div>
                        </div>

                        <br></br>
                        <br></br>

                        <span className="text-gray-600 text-sm">
                            Are you sure you want to cancel the booking? This action cannot be
                            undone.
                        </span>

                        <div style={{ display: "flex", marginTop: "15px" }}>
                            <button
                                disabled={loading} className="disable-check-ava cancel-button"
                                style={{ backgroundColor: "#ff0000", marginRight: "10px" }}
                                onClick={() => setShowCancelBookingModal(false)}
                            >
                                Cancel
                            </button>
                            <button type="submit" className='header-button disable-check-ava' disabled={loading}

                                onClick={onCancelBooking}
                            >
                                Yes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CancelBookingModal;
