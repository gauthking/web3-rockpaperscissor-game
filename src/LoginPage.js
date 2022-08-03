import React, { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';


function LoginPage() {
    const [loading, setLoading] = useState(false)
    const { authenticate, isAuthenticated, isWeb3Enabled } = useMoralis();
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuthenticated || isWeb3Enabled) {
            navigate('/game')
            console.log("authenticated")
        }
    }, [isAuthenticated, isWeb3Enabled, navigate])

    const auth = () => {
        setLoading(true);
        authenticate();
        setLoading(false);
    }

    return (
        <div className='bg-orange-400 h-[100vh] w-full flex flex-col justify-center items-center gap-10'>
            <div>Please use Rinkeby Testnet to Sign In</div>
            <h1 className='relative bottom-10 text-3xl font-mono'>Rock-Paper-Scissor DAPP</h1>
            <img className='w-52 mb-4 rounded-lg' src="https://c.tenor.com/Aqvwi1BYCyAAAAAC/friends-rock-paper-scissors.gif" alt="friendsrps" />
            <button className='bg-blue-200 rounded-xl p-4 border-4 mb-16' onClick={auth}>Sign In With MetaMask🦊</button>
            {loading && <Loader />}
        </div>
    )
}

export default LoginPage