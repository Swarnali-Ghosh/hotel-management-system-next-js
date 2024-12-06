// import { headers } from 'next/headers'; // For server components, use params or headers to derive the path.
import Header from "@/components/Header";
import HotelModel from "@/models/hotel-model";
import HotelCardList from "./_common/hotel-card-list";
import { connect } from "@/dbConfig/dbConfig";
connect()

const HotelList = async () => {

    // const headersList = headers();
    // const fullUrl: any = headersList.get('referer');  // This will be the full URL (if the referer exists)
    // const url = new URL(fullUrl); // Parse the URL
    // const path = url.pathname;   // Extract the pathname
    // console.log("url ~~~~~~~~~~~~~", url)
    // console.log("path ~~~~~~~~~~~~~", path)

    const response = await HotelModel.find().sort({ createdAt: -1 });
    const hotels = JSON.parse(JSON.stringify(response));

    return (
        <>
            <Header />
            <HotelCardList hotels={hotels} />

        </>
    );
};

export default HotelList;
