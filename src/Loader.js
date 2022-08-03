import React from 'react'
import Load from "./loading.gif"

function Loader() {
    return (
        <div className='text-center w-20 m-auto'>
            <img src={Load} alt="loading" />
        </div>
    )
}

export default Loader