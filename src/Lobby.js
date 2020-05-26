import React, { useState } from 'react';
import firebase, {ViewFirebase, StopListening, DeleteFirebase} from './firebase';
import {Link} from 'react-router-dom'



function Lobby(props) {
    const viewPlayers = ViewFirebase('games',props.code)

    function Leaving(){
        console.log('DELETING:')
        console.log(`viewPlayers.id: ${props.playerId}`)
        console.log(`viewPlayers.name: ${props.playerName}`)
        DeleteFirebase('games',props.code,props.playerId,props.playerName,viewPlayers.length)
        //StopListening('games');
    }

    function StartGame(props){
        // if(props.timeFlag == false){
            firebase
            .firestore()
            .collection('games')
            .doc(props.code)
            .update({
                time_start: Date.now()
            })
        // }
    }

    return(
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
                    <button> Start Game </button>
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