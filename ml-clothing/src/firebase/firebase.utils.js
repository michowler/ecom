import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAOKxhCTzKyh8THFZ4tPIRKMgxCUr6rscw",
  authDomain: "crwn-db-5950d.firebaseapp.com",
  databaseURL: "https://crwn-db-5950d.firebaseio.com",
  projectId: "crwn-db-5950d",
  storageBucket: "crwn-db-5950d.appspot.com",
  messagingSenderId: "202503198250",
  appId: "1:202503198250:web:1a76a6e259ff9b8e3b9553",
  measurementId: "G-LKYZK0E9DF"
};

export const createUserProfileDocument = async (userAuth, addData) => {
  if (!userAuth) return;
  
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists){
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({ //create method
        displayName,
        email,
        createdAt,
        ...addData
      })      
      
    } catch(error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;