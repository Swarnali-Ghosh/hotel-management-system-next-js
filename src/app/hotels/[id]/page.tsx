import Header from '@/components/Header'
import HotelDetailCard from '../_common/hotel-details'
import '../style/style.css'
import RoomCardList from '../_common/room-card-list';
import RoomModel from '@/models/room-model';


const HotelDetails = async ({
    params,
}: {
    params: {
        id: string;
    };
}) => {

    const hotelId = params.id;

    const response = await RoomModel.find({ hotel: hotelId }).sort({ createdAt: -1 });
    const rooms = JSON.parse(JSON.stringify(response));

    // console.log("response -------------", response)

    return (
        <div>
            <Header />
            <div className="hotel-room-container">
                <HotelDetailCard hotelId={hotelId} />
                <RoomCardList rooms={rooms} />

            </div>


        </div>
    )
}

export default HotelDetails