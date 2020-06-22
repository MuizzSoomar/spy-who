import * as firebase from "firebase";
import "firebase/analytics";
import 'firebase/firestore';
import { useState, useEffect } from 'react';
import {firebaseConfig} from './FirebaseConfig'

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


//get document from firebase
  export function ViewFirebase(coll,game) {
    const [views, setViews] = useState([])
    useEffect(() => {
        firebase
        .firestore()
        .collection(coll)
        .doc(game)               
        .onSnapshot((doc)=> {
            setViews(doc.data().players)
        })
    },[coll,game])      //[coll,game]
    return views
}

export function ViewDocs(coll,game,field) {
  const [fields, setFields] = useState('')
  useEffect(() => {
    firebase
    .firestore()
    .collection(coll)
    .doc(game)
    .onSnapshot((doc) => {
        setFields(doc.data()[field])
    })
  },[coll,game])
  return fields
}

export function FirebaseStartGame(coll,game) {
  const [startGame, setStartGame] = useState(false)
  useEffect(() => {
    firebase
    .firestore()
    .collection(coll)
    .doc(game)
    .onSnapshot((doc) => {
      setStartGame(doc.data().start_game)
  })
  },[coll,game])
  return startGame
}

export function DeleteFirebase(coll,game,id,name,length){     //Delete's player from game
  console.log("Number of Players before delete", length);
  if(length > 1){
    firebase
    .firestore()
    .collection(coll)
    .doc(game)
    .update({
      players: firebase.firestore.FieldValue.arrayRemove({"id": id, "name": name})
    })
    .then(() => {
      console.log(`Deleted ${name} with ID: ${id} from game: ${game}`)
      console.log(`Number of players left in the game: ${length}`)
    })
  }
  else if(length === 1){
    firebase.firestore().collection(coll).doc(game).delete()
    // .then(() =>{
    //   console.log("Deleted Game: ", game)
    // })
  }
}
// Need to add validation if last person in player array, then do a document delete of the game





export function StopListening(coll){
  const unsubscribe = 
    firebase
    .firestore()
    .collection(coll)
    .onSnapshot(() => {})
    unsubscribe();
}




  export default firebase;