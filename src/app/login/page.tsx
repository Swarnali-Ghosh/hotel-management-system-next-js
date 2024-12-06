"use client"
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from "react-hot-toast";
import './login.css'

const LoginPage = () => {

    const router = useRouter();

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response);
            // localStorage.setItem("token", response?.data?.token)
            router.push("/");

        } catch (error: any) {
            console.log("Signup failed");
            toast.error(error?.message)
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {

            setButtonDisabled(false)

        } else {
            setButtonDisabled(true)
        }
    }, [user])

    return (
        <div className="container">
            <div className="form-wrapper">
                <h1>Sign In</h1>
                <hr />

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

                <button className='login-button' onClick={onLogin} disabled={buttonDisabled ? true : false}>
                    {loading ? <div className="spinner"></div> : "Sign In"}
                </button>
                <Link href={"/signup"}>Go to Signup page</Link>
            </div>
        </div>

    )
}

export default LoginPage