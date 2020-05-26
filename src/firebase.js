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

export function ViewTimeStart(coll,game) {
  const [time, setTime] = useState('')
  useEffect(() => {
    firebase
    .firestore()
    .collection(coll)
    .doc(game)
    .onSnapshot((doc) => {
        setTime(doc.data().time_start)
    })
  },[coll,game])
  return time
}

export function DeleteFirebase(coll,game,id,name,length){
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