import firebase from 'firebase/app';
import 'firebase/auth';

const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyDj1v6Uy8GiYC-Ht4PEAgCURvmsPSYd30w",
    authDomain: "documents-50184.firebaseapp.com",
    databaseURL: "https://documents-50184.firebaseio.com",
    projectId: "documents-50184",
    storageBucket: "",
    messagingSenderId: "611516691345",
    appId: "1:611516691345:web:7e2e8e44d4c98cebbc6030"
};
firebase.initializeApp(config);

export default firebase;