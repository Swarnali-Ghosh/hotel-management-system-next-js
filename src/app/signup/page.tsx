"use client"
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import '../login/login.css'
import { toast } from "react-hot-toast";


const SignupPage = () => {

    const router = useRouter();

    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    })

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");

        } catch (error: any) {
            console.log("Signup failed");
            toast.error(error?.message)
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {

            setButtonDisabled(false)

        } else {
            setButtonDisabled(true)
        }
    }, [user])

    return (
        <div className="container">
            <div className="form-wrapper">
                <h1>Sign Up</h1>
                <hr />

                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    type="text"
                    placeholder="Enter your username"
                />

                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    type="email"
                    placeholder="Enter your email"
                />

                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    type="password"
                    placeholder="Enter your password"
                />

                <button className='login-button' onClick={onSignup} disabled={buttonDisabled ? true : false}>
                    {loading ? <div className="spinner"></div> : "Sign Up"}
                    {/* {buttonDisabled ? "Signup Disabled" : "Signup"} */}
                </button>
                <Link href="/login">Visit login page</Link>
            </div>
        </div>

    )
}

export default SignupPage