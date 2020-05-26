import React, { useState } from 'react';
import firebase, { StopListening } from './firebase';
import {GenerateCode} from './Helpers.js'
import {Redirect} from 'react-router-dom';

function Join(props) {
const [name,setName] = useState('');
const [join,setJoin] = useState('');
const [alert,setAlert] = useState('');

    function onSubmit(event) {
        event.preventDefault();
        if(name === "" && join === ""){     setAlert("Enter Name and Join Code")    }
        else if (name === ""){              setAlert("Enter Name");                 }
        else if (join === ""){              setAlert("Enter Join Code");            }
        if(name !== "" && join !== ""){
            props.setToLobby(true)
            let playerId = GenerateCode(8)
            firebase
            .firestore()
            .collection('games')
            .doc(join)
            .update({
                players: firebase.firestore.FieldValue.arrayUnion({name: name, id: playerId})
            })
            .then(() =>{
                console.log(`Joined: \n Name: ${name} \n Join Code: ${join}`); 
                props.setToLobby(false)
                props.setPlayerName(name);
                props.setPlayerId(playerId)
            })
            .catch((error) => {
                console.error("Error Joining Game: ", error);
            })
        }
    }
    function onNameChange(event){
        setName(event.target.value);
    }
    function onCodeChange(event){
        setJoin(event.target.value);
        props.setCode(event.target.value)
    }

    if(props.toLobby){
        return(
            <Redirect to ='/lobby'/>
        )
    }

    return (
        <>
        <form onSubmit = {onSubmit}>
            <input onChange = {onNameChange} placeholder = "Enter Name" />
            <div>
                <input onChange = {onCodeChange} placeholder = "Enter Code"/>
            </div>
            <button>Join Game</button>
            <div>{alert}</div>
        </form>
        </>

    )
}

export default Join;