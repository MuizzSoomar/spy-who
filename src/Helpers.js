import React from 'react';



export function GenerateCode(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i <= length; i++){
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result
}

export function Timer(){
    const startTime = 5;
    const setTime = startTime * 60000;

    let endTime = 1590395384980 + setTime - Date.now()

    let minutes = Math.floor((endTime % (1000 * 60 * 60)) / (1000 * 60))
    let seconds = Math.floor((endTime % (1000 * 60)) / 1000)



    if(endTime < 0){
        clearInterval(setInterval(Timer,1000))
    }

    setInterval(Timer,1000);

    return (
        <div>
            {minutes}:{seconds}
        </div>
    )
}