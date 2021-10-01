import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
const config = {
  apiKey: "AIzaSyAvn-cDRKqrMIdWm6Bv_CA5QH5bDLUSpG4",
  authDomain: "kphim2.firebaseapp.com",
  databaseURL:
    "https://kphim2-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// const firebaseApp = 
firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();
// export const firebaseApp = firebaseApp;
