import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDkGHHB-CtGKz2R0CYnrcYl74G_4_RxyFs",
    authDomain: "instagram-clone-c29ae.firebaseapp.com",
    databaseURL: "https://instagram-clone-c29ae.firebaseio.com",
    projectId: "instagram-clone-c29ae",
    storageBucket: "instagram-clone-c29ae.appspot.com",
    messagingSenderId: "479389715883",
    appId: "1:479389715883:web:944a2c500dfb4b040ed6ee"
})

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage }
//export default db