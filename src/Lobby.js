import React, { useState, useEffect } from 'react';
import firebase, {ViewFirebase, StopListening, DeleteFirebase, ViewDocs, FirebaseStartGame} from './firebase';
import {Link, Redirect} from 'react-router-dom'

function Lobby(props) {
    const viewPlayers = ViewFirebase('games',props.code)
    const viewSetTime = ViewDocs('games',props.code,"time_start")
    const [startGame, setStartGame] = useState(false)

    function Leaving(){
        console.log('DELETING:')
        console.log(`viewPlayers.id: ${props.playerId}`)
        console.log(`viewPlayers.name: ${props.playerName}`)
        DeleteFirebase('games',props.code,props.playerId,props.playerName,viewPlayers.length)
        //StopListening('games');
    }

    useEffect(() => {
        firebase
        .firestore()
        .collection('games')
        .doc(props.code)
        .onSnapshot((doc) => {
            console.log('game started')
            setStartGame(doc.data().start_game)
        })
    },[])

    function StartGame(){
        if(viewSetTime === ''){
            firebase 
            .firestore()
            .collection('games')
            .doc(props.code)
            .update({
                time_start: Date.now(),
                start_game: true

            })
            setStartGame(true)
        }
    }

    return(
        startGame ? <Redirect to= '/game' /> :
        <>
            <div> You are in the lobby!</div>
            <div> Game Code: {props.code} </div>
            <div>
                <ul>{viewPlayers.map(player => 
                    <li key={player.id}> 
                        {player.name} 
                    </li>)}
                </ul>
            </div>
            <div>
                <Link to = 'game'>
                    <button onClick = {StartGame}> Start Game </button>
                </Link>
                <Link to = '/'>
                    <button onClick = {Leaving}> Leave Game </button>
                </Link>
                
            </div>
            <div>
                Player Properties: 
                <div>
                    Player ID: {props.playerId}
                    <br></br>
                    Player Name: {props.playerName}
                </div>
            </div>
        </>
    )
}

export default Lobby;