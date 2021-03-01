import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAwO8YqSo0xDfUg9k4G5QI8x8HpYxnLe5A",
    authDomain: "linkedid-clone.firebaseapp.com",
    projectId: "linkedid-clone",
    storageBucket: "linkedid-clone.appspot.com",
    messagingSenderId: "126547981403",
    appId: "1:126547981403:web:1a638598245c0efc207b7e"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
