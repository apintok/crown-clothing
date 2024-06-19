import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCh-iQwSj-IYZnEE4_cNSo5JIao7B1nbQA',
  authDomain: 'crwn-clothing-db-ae78a.firebaseapp.com',
  projectId: 'crwn-clothing-db-ae78a',
  storageBucket: 'crwn-clothing-db-ae78a.appspot.com',
  messagingSenderId: '168315850559',
  appId: '1:168315850559:web:e24c14d481f12517330d8a'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  // ! If User Data doesn't Exist
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    } catch (error) {
      console.error('Error Creating the User,', error);
    }
  }

  return userDocRef;

  // ! If User Data Exists

  
};
