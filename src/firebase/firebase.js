import * as firebase from "firebase/app";
import "firebase/database";
import config from "./firebaseconfig";
import scoreModel from "../models/score";
import playerModel from "../models/player";
let database;

export const init = () => {
  firebase.initializeApp(config);
  database = firebase.database();
};

// retrieve from firebase
// return promise object
export const getScoresDB = () => {
  return database.ref("/scores").once("value");
};

export const getscores = machine => {
  return database
    .ref("/scores/" + machine)
    .orderByChild("score")
    .limitToLast(5)
    .once("value");
};

// get specified section
export const getplayersDB = sectionId => {
  return database.ref(`/${sectionId}`).once("value");
};

export const getPlayers = () => {
  return database.ref("/players/").once("value");
};
// add new player
export const addPlayer = name => {
  let key = database.ref("/players/").push().key;
  let model = playerModel(key, name);
  return database.ref("/players/" + key).set(model);
};

export const getNewestGoldenEye = () => {
  return database
    .ref("scores")
    .child("goldeneye")
    .orderByChild("dateAdded")
    .limitToLast(5)
    .once("value");
};

export const getNewestHook = () => {
  return database
    .ref("scores")
    .child("hook")
    .orderByChild("dateAdded")
    .limitToLast(5)
    .once("value");
};

export const addScore = scoreObject => {
  let key = database.ref("scores/" + scoreObject.machine).push().key;
  let model = scoreModel(
    key,
    scoreObject.player,
    scoreObject.machine,
    scoreObject.score,
    new Date().getTime()
  );
  return database.ref("/scores/" + model.machine + "/" + key).set(model);
};
//   // add new todo item into specified section
//   export const addTodoItem = (id, name) => {
//     return new Promise((resolve, reject) => {
//       database.ref(`/${id}`).once('value').then((todo) => {
//         let todos = todo.val().todos
//         []
//         let key = database.ref(`/${id}`).push().key
//         todos.push(todoModel(key, name, firebase.database.ServerValue.TIMESTAMP))
//         database.ref(`/${id}/todos`).set(todos)
//           .then( res => {resolve(res)})
//           .catch( error => {reject(error)})
//       })
//     })
//   }
