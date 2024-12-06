// SERVER SIDE COMPONENT
import Header from "@/components/Header";
import Filter from "@/components/Filter";
import ToasterClient from "@/components/ToasterClient";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import HotelModel from "@/models/hotel-model";
import HotelCardList from "./hotels/_common/hotel-card-list";
import { connect } from "@/dbConfig/dbConfig";
import RoomModel from "@/models/room-model";
connect()

export default async function Home() {
  const cookieStore = cookies();
  const token_data = cookieStore.get("token")?.value || null;

  const decoded: any = token_data ? jwtDecode(token_data) : null;

  // console.log("decoded", decoded);

  // console.log("token", token);
  // if (token && decoded) {
  //   localStorage.setItem("user_id", decoded?.id)
  // }

  const response = await HotelModel.find().sort({ createdAt: -1 });
  const hotels = JSON.parse(JSON.stringify(response));

  const room_response = await RoomModel.find().sort({ createdAt: -1 });
  const rooms = JSON.parse(JSON.stringify(room_response));

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 poppins-regular">
      <ToasterClient />
      <Header />
      <Filter rooms={rooms} />
      <HotelCardList hotels={hotels} />
      <footer className="footer">
        <p>&copy; 2024 HappyTrip. All rights reserved.</p>

      </footer>
      {/* <RoomsData searchParams={"searchParams"} /> */}
    </main>
  );
}
