import React, { useState } from 'react';
import './Create.css';
import firebase from './firebase';
import {Redirect} from 'react-router-dom';
import {GenerateCode} from './Helpers.js'

const TIME_VALUE = ["Select Time",5,7,10,15];

function Create(props) {
const [host, setHost] = useState('');
const [time, setTime] = useState('');
const [alert, setAlert] = useState('');

const onSubmit = (event) => {
    event.preventDefault();
    if(time === "" && host === ""){     setAlert("Enter Time and Name")     }
    else if(time === ""){               setAlert("Enter Time")             }
    else if(host === ""){               setAlert("Enter Name")             }

    else if (time !== "" && host !== ""){
        props.setToLobby(true);
        let hostId = GenerateCode(8)
        firebase
        .firestore()
        .collection('games')
        .doc(props.code)          
        .set({
            host,
            time_min: parseInt(time),
            time_start: "",
            code: props.code,                 
            players: [{name: host,
                        id: hostId
            }]
        })
        .then(() => {
         console.log(`Created: \n Name = ${host} \n Time = ${time} \n Code = ${props.code}`);
         props.setToLobby(false)
         props.setPlayerId(hostId);
         props.setPlayerName(host)
        })
        .catch((error) => {
            console.log("Error: ", error)
            console.log("code: " + props.code)
        })
    } 
}

const onChange = (event) => {
    setHost(event.target.value);
}
const onSelect = (event) => {
    setTime(event.target.value);
    let gameCode = GenerateCode(5);
    props.setCode(gameCode);
}
if(props.toLobby){
    return(
        <Redirect to ='/lobby'/>
    )
}
    return(
        <>
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor = "time"> Select Time: </label>
                    <select id = "time" onChange = {onSelect}>
                        {TIME_VALUE.map(min => (
                        <option key= {min} value= {min}>
                            {min}
                        </option>
                        ))}
                    </select>
            </div>

            <input  htmlFor = "name" placeholder = "Enter name" onChange={onChange} />
            <button id = "name" > Submit</button>
            <div className = "error" >{alert}</div>
        </form>
        </>
    );
}



export default Create;
