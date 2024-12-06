"use client";
import { UploadImageToFirebaseAndReturnUrls } from "@/helpers/image-upload";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HotelType } from "@/interfaces";
// import { Trash2 } from "lucide-react";
import Image from 'next/image';
import '../style/style.css'
import { AddRoom, EditRoom } from "@/app/api/common/rooms/rooms";

function RoomsForm({
    type = "add",
    initialData,
    hotels,
}: {
    type?: string;
    initialData?: any;
    hotels: HotelType[];
}) {
    const [uploadedFiles, setUploadedFiles] = useState([]) as any[];
    const [existingMedia = [], setExistingMedia] = useState(
        initialData?.media || []
    );
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onFinish = async (e: any) => {

        e.preventDefault();
        const formData = new FormData(e.target);

        const values: any = Object.fromEntries(formData.entries());


        try {
            setLoading(true);
            const newUrls = await UploadImageToFirebaseAndReturnUrls(uploadedFiles);

            // console.log("newUrls --->", newUrls);

            values.media = [...existingMedia, ...newUrls];
            let response: any = null;



            if (type === "add") {
                response = await AddRoom(values);
            } else {
                response = await EditRoom({
                    roomId: initialData._id,
                    payload: values,
                });
            }

            if (response.success) {
                // alert(response.message + '-' + 1);
                router.push("/admin/rooms");
            }

            if (!response.success) {
                // alert(response.error + '-' + 2);
            }
        } catch (error: any) {
            // alert(error.message + '-' + 3);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        console.log(uploadedFiles);
    }, [uploadedFiles]);

    return (
        <form className="form-grid"
            onSubmit={onFinish}
        >
            <div className="form-group half-width">
                <label>Hotel <span >*</span></label>
                <select name="hotel"
                    value={initialData?.hotel}
                    required>
                    <option value="">Select Hotel</option>
                    {hotels.map((hotel: any) => (
                        <option key={hotel._id} value={hotel._id}>
                            {hotel.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group half-width">
                <label>Name <span >*</span></label>
                <input
                    type="text"
                    name="name"
                    value={initialData?.name}
                    required
                />
            </div>




            <div className="form-group half-width">
                <label>Room Number <span >*</span></label>
                <input
                    type="text"
                    name="roomNumber"
                    value={initialData?.roomNumber}
                    required
                />
            </div>

            <div className="form-group half-width">
                <label>Type <span >*</span></label>
                <select name="type"
                    value={initialData?.type}
                    required>
                    <option value="">Select Type</option>
                    <option value="delux">Delux</option>
                    <option value="premium">Premium</option>
                    <option value="standard">Standard</option>
                </select>
            </div>

            <div className="form-group half-width">
                <label>Bedrooms <span >*</span></label>
                <input
                    type="number"
                    name="bedrooms"
                    value={initialData?.bedrooms}
                    required
                />
            </div>

            <div className="form-group half-width">
                <label>Rent Per Day <span >*</span></label>
                <input
                    type="number"
                    name="rentPerDay"
                    value={initialData?.rentPerDay}
                    required
                />
            </div>

            <div className="form-group full-width">
                <label>Amenities <span >*</span></label>
                <textarea
                    name="amenities"
                    value={initialData?.amenities}
                    required
                />
            </div>

            <div className="form-group full-width">
                <label>Upload Media  <span >*</span></label>
                <div className="media-container">
                    {existingMedia?.length > 0 && existingMedia.map((media: any, index: any) => (
                        <div
                            className="media-item"
                            key={index}
                        >
                            <img src={media} alt="media" />
                            <span
                                onClick={() => {
                                    setExistingMedia(
                                        existingMedia.filter(
                                            (item: string, i: number) => i !== index
                                        )
                                    );
                                }}
                            >
                                {/* <Trash2
                                    size={18}
                                    className="cursor-pointer delete-icon"
                                /> */}
                            </span>
                        </div>
                    ))}
                </div>

                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const files = e.target.files ? Array.from(e.target.files) : [];
                        setUploadedFiles([...uploadedFiles, ...files]);
                    }}
                />
            </div>

            <div className="form-group full-width form-actions">
                <button type="button" className="cancel-btn" onClick={() => router.push("/admin/rooms")} disabled={loading}>
                    Cancel
                </button>
                <button type="submit" className="submit-btn" disabled={loading}>
                    {type === "add" ? "Add" : "Update"}
                </button>
            </div>
        </form>
    );
}

export default RoomsForm;