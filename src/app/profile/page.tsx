"use client"
import axios from 'axios';
import { error } from 'console'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const ProfilePage = () => {

    const router = useRouter();
    const [data, setData] = useState("nothing");

    const getUserDetails = async () => {
        const res = await axios.post("/api/users/me");
        console.log(res?.data);
        setData(res.data?.data?._id);
    }

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("logout success");
            router.push("/login")
        } catch (error: any) {
            console.log(error?.message);
            toast.error(error?.message)
        }

    }
    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1>Profile Page</h1>
            <hr />
            <h2 >
                {data === "nothing" ? "Nothing" :
                    <Link href={`/profile/${data}`}>{data}</Link>
                }
            </h2>

            <hr />
            <button onClick={getUserDetails}>Get User Details</button>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default ProfilePage