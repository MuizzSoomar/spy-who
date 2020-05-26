import React, {useState, useEffect} from 'react';
import * as firebase from "firebase";
import {ViewFirebase} from './firebase';
import {GenerateCode, Timer} from './Helpers.js'



function Game(props){
const [places,setPlaces] = useState([]);
const [startTime, setStartTime] = useState(null);
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
            const timer = timeLeft > 0 && setInterval(() => setTimeLeft(timeLeft - 1),1000);
            return () => clearInterval(timer)
        },[timeLeft])
        let minutes = Math.floor((timeLeft % (60 * 60)) / (60))
        let seconds = Math.floor((timeLeft % (60))) 

        return(
            <div> {minutes}:{seconds} </div>
        )
    }

    return(
        <>
        <div> 
            Timer: {Timer()}
        </div>
        <button onClick={() => setStartTime(Date.now())}/>             {/* This will be activated by "start game" button on Lobby */}
        <div>Players:
                <ul>{viewPlayers.map(player => 
                    <li key={player.id}> 
                        {player.name} 
                    </li>)}
                </ul>
            </div>
        <div> Places:
        <ul>{places.map(player => 
                    <li key = {GenerateCode(37)} > 
                        {player} 
                    </li>)}
                </ul>
        </div>
        </>
    )
}

export default Game;