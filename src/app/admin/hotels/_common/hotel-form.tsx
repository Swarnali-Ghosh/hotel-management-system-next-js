"use client";
import { UploadImageToFirebaseAndReturnUrls } from "@/helpers/image-upload";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AddHotel, EditHotel } from "@/app/api/admin/hotels/route";
// import { Trash2 } from "lucide-react";
import Image from 'next/image';
import '../style/style.css'

const HotelForm = ({
    type = "add",
    initialData,
}: {
    type: string;
    initialData?: any;
}) => {

    const [uploadedFiles, setUploadedFiles] = useState([]) as any[];

    // edit media
    const [existingMedia = [], setExistingMedia] = useState(
        initialData?.media || []
    );

    // console.log("uploadedFiles", uploadedFiles);


    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onFinish = async (e: any) => {

        // console.log("e.target", e.target);

        e.preventDefault();
        const formData = new FormData(e.target);

        // console.log("formData", formData);

        const values: any = Object.fromEntries(formData.entries());

        // console.log("values", values)

        try {
            setLoading(true);
            const newUrls = await UploadImageToFirebaseAndReturnUrls(uploadedFiles);

            // console.log("newUrls --->", newUrls);

            values.media = [...existingMedia, ...newUrls];
            let response: any = null;



            if (type === "add") {
                response = await AddHotel(values);
            } else {
                response = await EditHotel({
                    hotelId: initialData._id,
                    payload: values,
                });
            }

            if (response.success) {
                // alert(response.message + '-' + 1);
                router.push("/admin/hotels");
            }

            if (!response.success) {
                // alert(response.error + '-' + 2);
            }
        } catch (error: any) {
            // alert(error.message + '-' + 3);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={onFinish} className="form-grid">
            <div className="form-group half-width">
                <label htmlFor="name">Hotel Name <span >*</span></label>
                <input className="" type="text" id="name" name="name" placeholder="Hotel Name" required defaultValue={initialData?.name} />
            </div>

            <div className="form-group half-width">
                <label htmlFor="owner">Owner Name  <span >*</span></label>
                <input type="text" id="owner" name="owner" placeholder="Owner Name" required defaultValue={initialData?.owner} />
            </div>

            <div className="form-group half-width">
                <label htmlFor="email">Email  <span >*</span></label>
                <input type="email" id="email" name="email" placeholder="Email" required defaultValue={initialData?.email} />
            </div>

            <div className="form-group half-width">
                <label htmlFor="phone">Phone  <span >*</span></label>
                <input type="tel" id="phone" name="phone" placeholder="Phone" required defaultValue={initialData?.phone} />
            </div>

            <div className="form-group full-width">
                <label htmlFor="address">Address  <span >*</span></label>
                <textarea id="address" name="address" placeholder="Address" required defaultValue={initialData?.address}></textarea>
            </div>

            <div className="form-group full-width">
                <label>Upload Media  <span >*</span></label>
                <div className="media-container">
                    {existingMedia?.length > 0 && existingMedia.map((media: any, index: number) => (
                        <div key={index} className="media-item">
                            <Image src={media} alt="media" />
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

                    {/* <input
                        type="file"
                        accept="images/*"
                        multiple
                        onChange={(e) => {
                            const files = e.target.files ? Array.from(e.target.files) : [];
                            setUploadedFiles([...uploadedFiles, ...files]);
                        }}
                    /> */}

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
            </div>

            <div className="form-group full-width form-actions">
                <button type="button" className="cancel-btn" onClick={() => router.push("/admin/hotels")}>Cancel</button>
                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? "Processing..." : type === "add" ? "Add" : "Update"}
                </button>
            </div>
        </form>


    );
}

export default HotelForm;
