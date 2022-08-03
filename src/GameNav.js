import React from 'react'
import { useMoralis } from 'react-moralis'
import { Link } from "react-router-dom";

function GameNav() {
    const { logout } = useMoralis();
    const logoutfunc = e => {
        e.preventDefault();
        logout()
    }
    return (
        <div className='flex justify-start space-x-6 gap-9 items-center bg-zinc-800 py-4 px-3'>
            <Link to="/about">
                <button className='bg-orange-500 rounded-xl p-2 font-bold font-mono cursor-pointer shadow-slate-600 shadow-sm  transition-all hover:scale-110 ease-in-out ml-2'>About dApp</button>
            </Link>

            <button className='bg-orange-500 rounded-xl p-2 font-bold font-mono cursor-pointer  shadow-slate-600 shadow-sm transition-all hover:scale-110 ease-in-out ' onClick={logoutfunc}>Logout</button>
        </div>
    )
}

export default GameNav