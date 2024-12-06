// import LinkButton from "@/components/link-button";
// import PageTitle from "@/components/page-title";
import HotelModel from "@/models/hotel-model";
import HotelsTable from "./_common/hotels-table";
import Header from "@/components/Header";
import { cookies } from "next/headers";
import LinkButton from "@/components/link-button";
import { connect } from "@/dbConfig/dbConfig";

async function HotelsPage() {
  await connect()
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || null;

  const response = await HotelModel.find().sort({ createdAt: -1 });
  const hotels = JSON.parse(JSON.stringify(response));


  return (
    <>
      <Header />
      <hr style={{ borderColor: "#6e8efb5e", borderWidth: "100%" }} />
      <LinkButton title="Add Hotel" path="/admin/hotels/add" heading='HOTELS' />
      <HotelsTable hotels={hotels} />
    </>
  );
}

export default HotelsPage;
