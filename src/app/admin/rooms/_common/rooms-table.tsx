"use client";
import React, { useState } from 'react'
import ReactPaginate from 'react-paginate';
import '../style/style.css'
// import { Edit, PlusSquare, Trash2 } from 'lucide-react';
import { useRouter } from "next/navigation";
import { RoomType } from '@/interfaces';

const RoomsTable = ({ rooms }: { rooms: RoomType[] }) => {

    const router = useRouter();
    const [loading = false, setLoading] = React.useState<boolean>(false);
    const [pageCount, setPageCount] = useState(2)
    const [currentPage, setCurrentPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(5);

    const onDelete = async (hotelId: string) => {
        try {
            // setLoading(true);
            const response: any = "" // await DeleteHotel(hotelId);
            if (response?.success) {
                // message.success(response.message);
            }
            if (!response?.success) {
                // message.error(response.error);
            }
        } catch (error: any) {
            // message.error(error.message);
        } finally {
            // setLoading(false);
        }
    };


    const handlePageClick = async (data: any) => {

        console.log(data)

        // let params = JSON.stringify({
        //     search: state.search
        // })

        // setCurrentPage(data.selected + 1)

        // GeneralService.apiPostCallRequestWithQuery(RouteURL.employeeList, params, data.selected + 1, pageLimit, accessToken).then(res => {

        //     if (res.err === Constants.API_RESPONSE_STATUS_SUCCESS) {

        //         console.log(res);
        //         setFilteredData(res.data);
        //         setLoadingData(false)

        //     }
        //     else {

        //     }
        // }).catch(error => {

        // })
    }

    return (
        <div>
            <div className="table-responsive poppins-regular">
                <table>
                    <thead>
                        <tr>
                            <th>Room Id</th>
                            <th>Name</th>
                            {/* <th className='table-th'>Hotel Id</th> */}
                            {/* <th className='table-th'>Hotel Name</th> */}
                            <th className='table-th'>Rent Per Day</th>
                            <th className='table-th'>Type</th>
                            <th className='table-th'>Room No</th>
                            <th className='table-th'>Bedrooms</th>
                            <th className='table-th'>Amenities</th>
                            <th className='table-th'>CreatedAt</th>
                            <th className='table-th'>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {rooms.length > 0 ? rooms.map((record, index) => {
                            return (
                                <>
                                    <tr key={index}>
                                        <td className='poppins-regular'>{record?._id}</td>
                                        <td className='poppins-regular'>{record?.name}</td>
                                        {/* <td className='poppins-regular'>{record?.hotel?._id}</td> */}
                                        {/* <td className='poppins-regular'>{record?.hotel?.name}</td> */}
                                        <td className='poppins-regular'>{record?.rentPerDay}</td>
                                        <td className='poppins-regular'>{record?.type}</td>
                                        <td className='poppins-regular'>{record?.roomNumber}</td>
                                        <td className='poppins-regular'>{record?.bedrooms}</td>
                                        <td className='poppins-regular'>{record?.amenities}</td>
                                        <td className='poppins-regular'>{record?.createdAt}</td>
                                        <td className='poppins-regular'>


                                            {/* <Edit
                                                size={18}
                                                className="cursor-pointer edit-icon"
                                                onClick={() => router.push(`/admin/rooms/edit/${record._id}`)}
                                            />

                                            <Trash2
                                                size={18} style={{ color: "red" }}
                                                className="cursor-pointer"
                                                onClick={() => onDelete(record._id)}
                                            /> */}

                                            {/* <PlusSquare
                                            size={18}
                                            className="cursor-pointer text-green-700"
                                            onClick={() => router.push('/admin/hotels/add')}
                                        /> */}
                                        </td>
                                    </tr>

                                </>
                            );

                        }) :
                            <tr>
                                <td colSpan={30}>No Data Found</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>

            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={() => handlePageClick("datat")}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName={'pagination justify-content-end'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                activeClassName={'active'}

            />
        </div>
    )
}

export default RoomsTable