import React, { useState } from 'react';
import './App.css';
import Routes from './Routes.js';

function App() {
  const [code, setCode] = useState('');
  const [toLobby, setToLobby] = useState(false);
  const [playerId, setPlayerId] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [timeFlag, setTimeFlag] = useState(false)

   
  React.useEffect(() => {
    console.log("New code was set: " + code)
  }, [code]);
  React.useEffect(() => {
    console.log("New playerId was set: " + playerId)
  }, [playerId]);
  React.useEffect(() => {
    console.log("New playerName was set: " + playerName)
  }, [playerName]);

  return (
    <>
      <Routes 
        code = {code} 
        setCode = {setCode} 
        toLobby = {toLobby} 
        setToLobby = {setToLobby}
        playerId = {playerId} 
        setPlayerId = {setPlayerId} 
        playerName = {playerName} 
        setPlayerName = {setPlayerName} 
        // timeFlag = {timeFlag}
        // setTimeFlag = {setTimeFlag}

      />
    </>
  );
}

export default App;
