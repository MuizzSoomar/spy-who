import React from 'react';
import {browserHistory} from 'react-router';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './Home';
import Create from './Create';
import Join from './Join';
import Lobby from './Lobby';
import Game from './Game';
import NotFound from './NotFound';



const Routes = ({
  code,
  setCode,
  toLobby,
  setToLobby,
  playerId,
  setPlayerId,
  playerName,
  setPlayerName
}) => (

    <Router history = {browserHistory}>   
      <Switch>
          <Route path = "/" exact component= {Home} />
          <Route path = "/create" exact render ={(props) => 
            <Create {...props} 
              code = {code} 
              setCode = {(x) => setCode(x)} 
              toLobby ={toLobby} 
              setToLobby = {setToLobby} 
              playerId = {playerId} 
              setPlayerId = {setPlayerId} 
              playerName = {playerName} 
              setPlayerName = {setPlayerName}
              /> }  
            />
          <Route path = "/join" exact render = {(props) => 
            <Join {...props} 
              code = {code} 
              setCode = {(x) => setCode(x)} 
              toLobby = {toLobby} 
              setToLobby ={setToLobby} 
              playerId = {playerId} 
              setPlayerId = {setPlayerId} 
              playerName = {playerName} 
              setPlayerName = {setPlayerName}
              /> } 
            />
          <Route path = "/lobby" exact component = {(props) => 
            <Lobby {...props} 
              code = {code} 
              setCode = {(x) => setCode(x)} 
              toLobby = {toLobby} 
              setToLobby ={setToLobby} 
              playerId = {playerId} 
              setPlayerId = {setPlayerId} 
              playerName = {playerName} 
              setPlayerName = {setPlayerName}
              /> }
            />
          <Route path = "/game" exact component = {(props) => 
            <Game {...props}
              code = {code} 
              setCode = {(x) => setCode(x)} 
              toLobby = {toLobby} 
              setToLobby ={setToLobby} 
              playerId = {playerId} 
              setPlayerId = {setPlayerId} 
              playerName = {playerName} 
              setPlayerName = {setPlayerName} 
              /> }
            />

          {/* <Route path = "/game" exact component = {Game} /> */}
          <Route path = "*" exact component = {NotFound} />
        </Switch>
    </Router>


);

export default Routes;
