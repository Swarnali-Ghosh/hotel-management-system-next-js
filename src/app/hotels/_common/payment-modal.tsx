"use client"
// import { Button, Modal, message } from "antd";
import React, { useState } from "react";
import {
    useStripe,
    useElements,
    PaymentElement,
    AddressElement,
} from "@stripe/react-stripe-js";
import { toast } from "react-hot-toast";
import { RoomType } from "@/interfaces";
import { useRouter } from "next/navigation";
import { BookRoom } from "@/app/api/common/bookings/bookings";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import jwt from 'jsonwebtoken';
// import { getCookie, setCookie } from 'cookies-next'
// import { useCookies } from 'next-client-cookies';

function PaymentModal({
    room,
    totalDays,
    totalAmount,
    checkInDate,
    checkOutDate,
    showPaymentModal,
    setShowPaymentModal,
}: {
    room: RoomType;
    totalDays: number;
    totalAmount: number;
    checkInDate: string;
    checkOutDate: string;
    showPaymentModal: boolean;
    setShowPaymentModal: (value: boolean) => void;
}) {

    // const cookies = useCookies();

    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            setLoading(true);
            event.preventDefault();

            if (!stripe || !elements) {
                return;
            }

            const result = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: "https://example.com/order/123/complete",
                },
                redirect: "if_required",
            });

            if (result.error) {
                // toast.error(result?.error?.message);
            } else {
                toast.success("Payment successful");
                const bookingPayload = {
                    hotel: room.hotel._id,
                    room: room._id,
                    checkInDate,
                    checkOutDate,
                    totalAmount,
                    totalDays,
                    paymentId: result.paymentIntent.id,
                };

                await BookRoom(bookingPayload);
                toast.success("Room booked successfully");
                setShowPaymentModal(false);
                router.push("/user/bookings");
            }
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="payment-modal"
            // open={showPaymentModal}
            title="Complete Payment"
        // onCancel={() => setShowPaymentModal(false)}
        // footer={null}
        >
            <div className="flex flex-col">
                <form className="payment-form" style={{ height: "80vh", overflowY: "auto" }} onSubmit={handleSubmit}>
                    <PaymentElement />
                    <AddressElement
                        options={{
                            mode: "billing",
                            allowedCountries: ["IN", "US"],
                        }}
                    />

                    <div style={{ display: "flex", marginTop: "15px" }}>
                        <button style={{ backgroundColor: "#ff0000", marginRight: "10px" }}
                            disabled={loading} className="disable-check-ava"
                            onClick={() => setShowPaymentModal(false)}
                        >
                            Cancel
                        </button>
                        <button type="submit" className='header-button disable-check-ava' disabled={loading}

                        // loading={loading} 
                        >
                            Pay ₹{totalAmount}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PaymentModal;
