import React from 'react'

const Spinner = ({ fullHeight = false }: { fullHeight?: boolean }) => {
    return (
        // <div className='flex items-center justify-center' style={{ height: fullHeight ? "80vh" : "auto" }}>
        //     <div className='border-solid h-10 w-10 border-8 border-t-blue-200 animate-spin rounded-full'
        //     ></div>
        // </div>
        <>
            LOADING...
        </>
    )
}

export default Spinner