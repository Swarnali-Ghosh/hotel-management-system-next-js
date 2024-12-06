
"use client"

import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { RoomType } from "@/interfaces";
import { CheckRoomAvailability } from "@/app/api/common/bookings/bookings";
import moment from "moment";
import ToasterClient from "@/components/ToasterClient";
import { GetStripeClientSecretKey } from "@/app/api/admin/payments/payments";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentModal from "./payment-modal";

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const RoomCheckoutForm = ({ room }: { room: RoomType }) => {

    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [loading, setLoading] = useState(false);
    const [isAvailable, setIsAvailable] = useState(false);
    const [totalDays, setTotalDays] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [clientSecret, setClientSecret] = useState("");
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const [token, setToken] = useState<string | null>(null);
    const [loginState, setLoginState] = useState(false);

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
                console.log(data);
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

    const checkAvailability = async () => {
        try {

            if (token) {
                console.log("checkAvailability", checkAvailability);
                console.log("room._id", room._id);
                console.log("checkIn", checkIn);
                console.log("checkOut", checkOut);

                const response = await CheckRoomAvailability({
                    roomId: room._id,
                    reqCheckInDate: checkIn,
                    reqCheckOutDate: checkOut,
                });

                // console.log("response.success", response)
                if (response?.success) {
                    setIsAvailable(true);
                    toast.success("Room is available");

                    const totalDaysTemp = moment(checkOut).diff(moment(checkIn), "days")
                    setTotalDays(totalDaysTemp);
                    setTotalAmount(totalDaysTemp * room.rentPerDay);
                } else {
                    setIsAvailable(false);
                    toast.error("Room is not available");
                }
            } else {
                toast.error("Please log in and proceed further.");
            }

        } catch (error: any) {
            toast.error(error?.message)
        }
    };

    const onBookRoom = async () => {
        try {
            if (token) {
                setLoading(true);
                const response = await GetStripeClientSecretKey({ amount: totalAmount });
                if (response?.success) {

                    // console.log("response?.data", response?.data);

                    setClientSecret(response?.data);
                    setShowPaymentModal(true);
                } else {
                    toast.error(response?.message);
                }
            } else {
                toast.error("Please log in and proceed further.");
            }
        } catch (error: any) {
            toast.error(error?.message);
        } finally {
            setLoading(false);
        }
    };

    const onResetBookRoom = () => {
        setCheckIn("")
        setCheckOut("")
        setIsAvailable(false)
    }

    useEffect(() => {
        setIsAvailable(false);
    }, [checkIn, checkOut]);

    return (
        <>
            <ToasterClient />
            {/* Check-In Section */}
            <div className="check-availability">

                <div className="form-group">
                    <label htmlFor="name">Check In:
                        <span>*</span>
                    </label>
                    <input className="" id="checkIn" required type="date" name="checkIn"
                        onChange={(e) => setCheckIn(e.target.value)}
                        min={moment().format("YYYY-MM-DD")}
                        value={checkIn} />
                    <label >Without a check-in date, you cannot enter a check-out date.</label>
                </div>

                <div className="form-group">
                    <label htmlFor="name">Check Out:
                        <span>*</span>
                    </label>
                    <input type="date" className="" id="checkOut" required name="checkOut"
                        onChange={(e) =>
                            e.target.value ? setCheckOut(e.target.value) : setCheckOut(moment(checkIn).add(1, "day").format("YYYY-MM-DD"))

                        }
                        // Minimum date is 1 day after the check-in date
                        min={moment(checkIn).add(1, "day").format("YYYY-MM-DD")}
                        value={checkOut} disabled={!checkIn} />
                </div>
                <button className='header-button disable-check-ava'
                    style={{ padding: "10px" }}
                    disabled={!checkIn || !checkOut || isAvailable}
                    onClick={checkAvailability}
                >Check Availability</button>

                {isAvailable && (
                    <>
                        <div className="flex justify-between">

                            <label htmlFor="name">Total Days:
                            </label>
                            <label>{totalDays}</label>
                        </div>
                        <div className="flex justify-between">
                            <label htmlFor="name">Total Amount:
                            </label>
                            <label>₹{totalAmount}</label>
                        </div>
                        <button className='header-button'
                            style={{ padding: "10px" }}
                            type="submit"
                            onClick={onBookRoom}
                        >
                            Book Your Room
                        </button>

                        <br></br>

                        <button className='header-button'
                            style={{ padding: "10px", marginTop: "10px", backgroundColor: "greenyellow" }}
                            type="submit"
                            onClick={onResetBookRoom}
                        >
                            Reset
                        </button>
                    </>
                )}

                {showPaymentModal && clientSecret && (
                    <Elements
                        stripe={stripePromise}
                        options={{
                            clientSecret,
                        }}
                    >
                        <PaymentModal
                            room={room}
                            totalDays={totalDays}
                            totalAmount={totalAmount}
                            checkInDate={checkIn}
                            checkOutDate={checkOut}
                            showPaymentModal={showPaymentModal}
                            setShowPaymentModal={setShowPaymentModal}
                        />
                    </Elements>

                )}

            </div>
        </>
    )
}

export default RoomCheckoutForm