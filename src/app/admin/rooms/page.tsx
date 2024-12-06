import React from 'react'
import './style/style.css'
import Header from '@/components/Header'
import { connect } from '@/dbConfig/dbConfig'
import { cookies } from "next/headers";
import RoomModel from '@/models/room-model';
import LinkButton from '@/components/link-button';
import RoomsTable from './_common/rooms-table';

const RoomsPage = async () => {
    await connect()
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value || null;

    const response = await RoomModel.find().sort({ createdAt: -1 });
    const rooms = JSON.parse(JSON.stringify(response));

    return (
        <>
            <Header />
            <hr style={{ borderColor: "#6e8efb5e", borderWidth: "100%" }} />
            <LinkButton title="Add Rooms" path="/admin/rooms/add" heading='ROOMS' />
            <RoomsTable rooms={rooms} />
        </>
    )
}

export default RoomsPage