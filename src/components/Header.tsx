
// CLIENT SIDE COMPONENT
"use client"
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
// import { BedDouble, GitGraph, Home, Hotel, List, User, User2 } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { jwtDecode } from "jwt-decode";
import Happy_Trip from '../../public/HappyTrip.png';

const Header = () => {
    const router = useRouter();
    const pathname = usePathname();
    const iconSize = 18;
    let decoded: any = null;
    const [token, setToken] = useState<string | null>(null);

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


    const [loginState, setLoginState] = useState(false);

    // console.log("loginState", loginState);

    // console.log("token", token);

    // if (token) {
    //     try {
    //         decoded = jwtDecode(token);
    //         console.log("decoded", decoded);

    //     } catch (error: any) {
    //         console.error("Invalid token:", error.message);
    //     }
    // }


    useEffect(() => {
        if (token) {
            setLoginState(true);
        } else {
            setLoginState(false)
        }
    }, [token]);

    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success('Logged out successfully');
            setLoginState(false);
            router.push('/');
        } catch (error: any) {
            toast.error(error?.message);
        }
    };

    // const publicMenuItems: any[] = [
    //     { name: 'Home', icon: <Home size={iconSize} />, onClick: () => router.push('/'), isActive: pathname === '/' },
    //     { name: 'Hotels', icon: <Hotel size={iconSize} />, onClick: () => router.push('/hotels'), isActive: pathname.includes('/hotels') }
    // ];

    const userMenuItems: any[] = [
        { name: 'Home', onClick: () => router.push('/'), isActive: pathname === '/' },
        { name: 'Bookings', onClick: () => router.push('/user/bookings'), isActive: pathname === '/user/bookings' },
        { name: 'Hotels', onClick: () => router.push('/hotels'), isActive: pathname.includes('/hotels') }
    ];

    // const adminMenuItems: any[] = [
    //     { name: ' Home', icon: <Home size={iconSize} />, onClick: () => router.push('/'), isActive: pathname === '/' },
    //     { name: 'Bookings', icon: <List size={iconSize} />, onClick: () => router.push('/admin/bookings'), isActive: pathname === '/admin/bookings' },
    //     { name: 'Hotels', icon: <Hotel size={iconSize} />, onClick: () => router.push('/admin/hotels'), isActive: pathname.includes('/admin/hotels') },
    //     { name: 'Rooms', icon: <BedDouble size={iconSize} />, onClick: () => router.push('/admin/rooms'), isActive: pathname.includes('/admin/rooms') },
    //     { name: 'Users', icon: <User2 size={iconSize} />, onClick: () => router.push('/admin/users'), isActive: pathname.includes('/admin/users') },
    //     { name: 'Reports', icon: <GitGraph size={iconSize} />, onClick: () => router.push('/admin/reports'), isActive: pathname === '/admin/reports' },
    // ];

    // const menuItemsToShow: any[] = (token && decoded?.isAdmin === true) ? adminMenuItems : ((token && decoded?.isAdmin === false) ? userMenuItems : publicMenuItems);

    const auth = () => {
        if (loginState) {
            logout();
        } else {
            router.push('/signup');
        }
    };

    return (
        <nav>
            <div className="nav__logo"> {decoded?.isAdmin ? "Admin Panel" : "HappyTrip "}</div>
            <div className="mobile_nav__logo"> {decoded?.isAdmin ? "Admin Panel" : "HappyTrip  "}</div>
            {/* <Image className="mobile_nav__logo" src={Happy_Trip} alt="Happy Trip" style={{ width: "75px", height: "40px" }} /> */}
            <ul className="nav__links">
                {userMenuItems.map((item, index) => (
                    <li style={{ cursor: 'pointer' }} key={index} className={item?.isActive ? 'nav_link active_link' : 'nav_link'}>
                        <p onClick={item.onClick}> {item.name}</p>
                    </li>
                ))}
                <button className="header-button" onClick={auth}>
                    {loginState ? 'Logout' : 'Signup'}
                </button>
            </ul>

            {/* mobile drop down */}
        </nav>
    );
};

export default Header;
