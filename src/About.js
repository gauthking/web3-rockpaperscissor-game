import React from 'react'
import GameNav from './GameNav'

function About() {
    return (
        <div className='bg-orange-300 h-screen'>
            <GameNav />
            <div className='mt-52 max-w-xl mx-auto text-center leading-7 p-6 border-2 border-orange-600'>
                This is a web3 dApp "game" made using React and Tailwind(Frontend) and used Moralis Web3 Services for the backend part. For compiling the smart contract used in this dApp(ERC721 STANDARDS) I've used Remix Online IDE for acquiring the ABI and the deployed Contract Address. Hardhat can be also used for these processes but I've kept things simple in this version. Interacting with smart contract is done using Web3.js in this project.
            </div>
        </div>
    )
}

export default About