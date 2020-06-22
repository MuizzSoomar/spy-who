import React, {useState, useEffect} from 'react';
import firebase, {ViewFirebase, DeleteFirebase, FirebaseStartGame, ViewDocs} from './firebase';
import {GenerateCode, Timer, getRandomInt} from './Helpers.js'
import {Redirect, Link} from 'react-router-dom'


function Game(props){
const [places,setPlaces] = useState([]);
// const [countDown, setCountDown] = useState()
// const [timeLeft, setTimeLeft] = useState(300)
const [date,setDate] = useState()
const [endGame, setEndGame] = useState(false)
const thousand = 1000

const viewSpy = ViewDocs('games',props.code,"spy")
const gameTime = ViewDocs('games',props.code,"start_game")


const startTime = ViewDocs('games',props.code,"time_start")
const timeMin = ((ViewDocs('games',props.code,"time_min")) * 60)
const difference = (startTime + timeMin) - startTime
const [timeLeft, setTimeLeft] = useState(300)

const viewPlayers = ViewFirebase('games',props.code)
    firebase
    .firestore()
    .collection('locations')
    .doc('guesstiles')
    .onSnapshot(function(doc) {
        setPlaces(doc.data().places)
    }) 

    function Timer(){
        useEffect(() => {
            // const timer = timeLeft > 0 && setInterval(() => setTimeLeft(timeLeft - 1),1000);
            const interval = setInterval(() => {
                if (timeLeft > 0){
                    setTimeLeft(timeLeft - 1);
                }
            }, thousand)
            return () => clearInterval(interval)
        },[timeLeft])    // [timeLeft]

        let minutes = Math.floor((timeLeft % (60 * 60)) / (60))
        let seconds = Math.floor((timeLeft % (60))) 

        return(
            <div> {minutes}:{seconds} </div>
        )
    }

    function setSpy(){
        if(viewSpy == ""){
            let random = getRandomInt(viewPlayers.length)
            try {
                let randomPlayer = viewPlayers[random]
                console.log('picked : ',(randomPlayer))

                if(randomPlayer !== undefined){
                    let randomID = randomPlayer.id
                    let randomName = randomPlayer.name

                    firebase 
                    .firestore()
                    .collection('games')
                    .doc(props.code)
                    .update({
                        spy: {name: randomName, id: randomID}
                    })
                    .then(() => {
                        console.log(`Spy: \n Name = ${randomName}  \n ID = ${randomID}`);
                    })
                }}
            catch(e){
                console.log(e)
            }
        }
        
        if(viewSpy !== ""){
            return(
                viewSpy.name
            )
        }
    }

    // useEffect(() => {
    //     firebase
    //     .firestore()
    //     .collection('games')
    //     .doc(props.code)
    //     .onSnapshot((doc) => {
    //         setEndGame(doc.data().start_game)
    //     })
    // },[])

    function EndGame() {        //redirect everyone to lobby screen
        console.log("Ending game, routing to lobby")
        firebase 
        .firestore()
        .collection('games')
        .doc(props.code)
        .update({
            time_start: "",
            start_game: false,
            spy: ""
        })
        setEndGame(true)
    }


    function isGameInLobby(){
        const gameTime = ViewDocs('games',props.code,"start_game")
        if(gameTime == true){
            return false;
        }
        else return true
    }

    function Leaving(){
        console.log('DELETING:')
        console.log(`viewPlayers.id: ${props.playerId}`)
        console.log(`viewPlayers.name: ${props.playerName}`)
        DeleteFirebase('games',props.code,props.playerId,props.playerName,viewPlayers.length)
    }

    return(
        endGame ? <Redirect to= '/lobby' /> : 
        <>
        <div> 
            Timer: {Timer()}
        </div>
        <div>
            <Link to = 'lobby'>
                <button onClick = {EndGame}> End Game </button>
            </Link>
            <Link to = '/'>
                <button onClick = {Leaving}> Leave Game </button>
            </Link>
        </div>
        <div>
            Spy: {setSpy()}
        </div>
        <div>Players: {viewPlayers.length}
                <ul>{viewPlayers.map(player => 
                    <li key={player.id}> 
                        {player.name} 
                    </li>)}
                </ul>
            </div>
        <div> Places:
        <ul>{places.map(places => 
                    <li key = {GenerateCode(37)} > 
                        {places} 
                    </li>)}
                </ul>
        </div>
        </>
    )
}


export default Game;