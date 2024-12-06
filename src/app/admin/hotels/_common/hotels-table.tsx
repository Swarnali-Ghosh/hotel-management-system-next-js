"use client";
import React, { useState } from 'react'
import { HotelType } from "@/interfaces";
import ReactPaginate from 'react-paginate';
import '../style/style.css'
// import { Edit, PlusSquare, Trash2 } from 'lucide-react';
import { useRouter } from "next/navigation";
import { DeleteHotel } from '@/app/api/admin/hotels/route';

const HotelsTable = ({ hotels }: { hotels: HotelType[] }) => {

    const router = useRouter();
    const [loading = false, setLoading] = React.useState<boolean>(false);
    const [pageCount, setPageCount] = useState(2)
    const [currentPage, setCurrentPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(5);

    const onDelete = async (hotelId: string) => {
        try {
            // setLoading(true);
            const response = await DeleteHotel(hotelId);
            if (response.success) {
                // message.success(response.message);
            }
            if (!response.success) {
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
                            <th>Id</th>
                            <th>Name</th>
                            <th className='table-th'>Owner</th>
                            <th className='table-th'>Email</th>
                            <th className='table-th'>Phone</th>
                            <th className='table-th'>Address</th>
                            <th className='table-th'>Created At</th>
                            <th className='table-th'>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {hotels.length > 0 ? hotels.map((record, index) => {
                            return (
                                <>
                                    <tr key={index}>
                                        <td className='poppins-regular'>{record?._id}</td>
                                        <td className='poppins-regular'>{record?.name}</td>
                                        <td className='poppins-regular'>{record?.owner}</td>
                                        <td className='poppins-regular'>{record?.email}</td>
                                        <td className='poppins-regular'>{record?.phone}</td>
                                        <td className='poppins-regular'>{record?.address}</td>
                                        <td className='poppins-regular'>{record?.createdAt}</td>
                                        <td className='poppins-regular'>
                                            {/* <Trash2
                                                size={18}
                                                className="cursor-pointer delete-icon"
                                                onClick={() => onDelete(record._id)}
                                            />
                                            <Edit
                                                size={18}
                                                className="cursor-pointer edit-icon"
                                                onClick={() => router.push(`/admin/hotels/edit/${record._id}`)}
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

export default HotelsTable