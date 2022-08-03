import React, { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import Moralis from 'moralis';
import { useNavigate } from 'react-router-dom';
import GameNav from './GameNav';
import { contractabi, contractAddress } from './contract';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import Loader from "./Loader";
// import { ethers } from 'ethers';
import Web3 from 'web3';
const web3 = new Web3(Web3.givenProvider);
function Game() {
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();
    // const contract = new ethers.Contract(contractAddress, abi, signer);
    // console.log(contract)
    const { isAuthenticated, user } = useMoralis();
    const [userSelection, setUserSelection] = useState("")
    const [computerSelection, setComputerSelection] = useState("");
    const [count, setCount] = useState(0);
    const [score, setScore] = useState(0);
    const [name, setName] = useState("");
    const { width, height } = useWindowSize();
    const [loading, setloading] = useState(false)

    // const [description, setDescription] = useState("")
    const navigate = useNavigate();
    // const metadata = "https://gateway.pinata.cloud/ipfs/QmNMDcsoD4ngz4jhaiG9pYjv8EUtUCHyhvfkjncmmd6kTs"

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
            console.log("loggedout")
        }
        else {
            console.log(user.get("ethAddress"))
        }
    }, [isAuthenticated, navigate, user])

    const mintNFT = async e => {
        e.preventDefault();
        try {
            // await contract.mint(metadata);
            // alert("NFT has been minted")
            // generating metadata and save to ipfs
            setloading(true);
            const metadata = {
                name, description: `${name} has won the Rock Paper Scissor NFT Game and this NFT has been minted as a reward`, image: "https://gateway.pinata.cloud/ipfs/QmaG8KSAahVtmVw9fFqSfLZxUQhk9CUsRTJbXr24xPkZJk"
            }
            const file = new Moralis.File("victorycardmetadata.json", {
                base64: Buffer.from(JSON.stringify(metadata)).toString('base64')
            });
            await file.saveIPFS();
            const metaURL = file.ipfs();

            // interacting with smart contract
            const contract = new web3.eth.Contract(contractabi, contractAddress);
            const response = await contract.methods.mint(metaURL).send({ from: user.get("ethAddress") });
            const tokenId = response.events.Transfer.returnValues.tokenId;
            setloading(false);
            alert(`NFT Minted, Contract Address : ${contractAddress} and tokenId : ${tokenId} `)

        } catch (error) {
            console.error(error);
        }
    }

    const computerPlay = () => {
        let outcomes = ["rock", "paper", "scissors"];
        let index = Math.floor((Math.random() * 3) + 1)
        setComputerSelection(outcomes[index - 1]);
        // setComputerSelection("rock")
    }
    const playGame = (e) => {
        e.persist();
        console.log("clicked")
        computerPlay();
        if (count <= 6) {
            console.log("triggered-", count)
            console.log(userSelection)
            playRound(userSelection.toLowerCase(), computerSelection);
        }
        else if (count === 7) {
            console.log("TOTAL SCORE IS:", score)
            document.getElementById("totalscore").innerHTML = `TOTAL SCORE IS: ${score}`;
            if (score >= 3) {
                document.getElementById("mintdesc").className = "flex flex-col mt-2 gap-3 item-center justify-center"
            }

        }
        if (count === 6) {
            document.getElementById("btn").innerHTML = "Score"
        }
        setCount(count + 1);


    }

    const playRound = (us, cs) => {

        if (cs === "rock") {
            if (us === "paper") {
                document.getElementById("roundscore").innerHTML = "Computer Selection : Rock<br>Player Selection : Paper<br> Paper Beats Rock. You get 1 point! ";
                document.getElementById("roundscore").style.display = "block";
                console.log("Paper beats rock, You get 1 point!");
                setScore(score + 1);
            }
            else if (us === cs) {
                document.getElementById("roundscore").innerHTML = "Computer Selection : Rock<br>Player Selection : Rock<br> Draw! No points ";
                document.getElementById("roundscore").style.display = "block";
            }
            else {
                document.getElementById("roundscore").innerHTML = "Computer Selection : Rock<br>Player Selection : Scissors<br> Rock Beats Scissors. You get 0 point! ";
                document.getElementById("roundscore").style.display = "block";
            }
        }
        else if (cs === "paper") {
            if (us === "scissors" || us === "scissor") {
                document.getElementById("roundscore").innerHTML = "Computer Selection : Paper<br>Player Selection : Scissors<br> Scissors Beats Paper. You get 1 point! ";
                document.getElementById("roundscore").style.display = "block";
                setScore(score + 1);
            }
            else if (us === cs) {
                document.getElementById("roundscore").innerHTML = "Computer Selection : Paper<br>Player Selection : Paper<br> Draw! No points ";
                document.getElementById("roundscore").style.display = "block";
            }
            else {
                document.getElementById("roundscore").innerHTML = "Computer Selection : Paper<br>Player Selection : Rock<br> Paper Beats Rock. You get 0 point! ";
                document.getElementById("roundscore").style.display = "block";
            }
        }
        else if (cs === "scissors") {
            if (us === "rock") {
                document.getElementById("roundscore").innerHTML = "Computer Selection : Scissors<br>Player Selection : Rock<br> Rock Beats Scissors. You get 1 point! ";
                document.getElementById("roundscore").style.display = "block";
                setScore(score + 1);
            }
            else if (us === cs) {
                document.getElementById("roundscore").innerHTML = "Computer Selection : Scissors<br>Player Selection : Scissors<br> Draw! No points ";
                document.getElementById("roundscore").style.display = "block";
            }
            else {
                document.getElementById("roundscore").innerHTML = "Computer Selection : Scissors<br>Player Selection : Paper<br> Scissors Beats Paper. You get 0 point! ";
                document.getElementById("roundscore").style.display = "block";
            }
        }
    }
    return (
        <div className='bg-orange-300'>
            <GameNav />

            {count === 8 && score > 3 &&
                <Confetti
                    width={width - 90}
                    height={height - 100}
                    tweenDuration={1000}
                />
            }
            <h3 className='text-center mt-10 font-mono font-semibold'>ROCK-PAPER-SCISSORS</h3>
            <div className='text-center'>Get a score more than 3/6 and get your NFT Minted!</div>
            <section className='bg-orange-300 flex h-[100vh] flex-col justify-center items-center -mt-12'>
                <div class="textbox">
                    <input type="text" placeholder='rock/paper/scissors' className='w-52 p-2 rounded-2xl m-4  border-orange-500 border-x-2 border-y-2' onChange={e => setUserSelection(e.target.value)} value={userSelection} />

                </div>
                <button disabled={count === 8 || !userSelection} id="btn" className='bg-blue-100 p-2 mt-2 rounded-xl px-4' onClick={playGame}>Play</button>
                <div className={count > 1 && `flex flex-col text-center bg-orange-200 my-4 rounded-2xl p-2  shadow-blue-300 shadow-sm`} id="roundscore"></div>
                <div id='totalscore'></div>


                <div id='mintdesc' className='hidden'>
                    <div className='bg-blue-200 p-3 rounded-xl mt-3 animate-pulse'>You are eligible to the MINT the NFT !</div>
                    <input type="text" className='w-52 p-2 rounded-2xl m-auto border-orange-500 border-x-2 border-y-2' placeholder='Enter your name' onChange={e => setName(e.target.value)} value={name} />
                    {/* <input type="file" onChange={e => setFile(e.target.files[0])} /> */}
                    {loading && <Loader />}
                    <button className='bg-blue-300 w-fit m-auto px-3 rounded-xl' onClick={mintNFT} type="submit">MINT</button>
                </div>

            </section>
        </div>

    )
}

export default Game