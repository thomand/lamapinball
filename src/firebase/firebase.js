import * as firebase from "firebase";
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
// get specified section
export const getplayersDB = sectionId => {
  return database.ref(`/${sectionId}`).once("value");
};
// add new player
export const addPlayer = name => {
  let key = database.ref("/players/").push().key;
  let model = playerModel(key, name);
  return database.ref("/players/" + key).set(model);
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
