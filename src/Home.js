import React from 'react';
import {Link} from 'react-router-dom'

function Home() {
    return(
        <>
        <Link to = 'create'>
            <button> Create Game </button>
        </Link>
        <Link to = 'join'> 
            <button> Join Game </button>
        </Link>
        <Link to = 'lobby'> 
            <button> Lobby </button>
        </Link>
        <Link to = 'game'>
            <button> Game</button>
        </Link>

        </>
    )
}

export default Home;