// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVrZrKUL_uZoND9uBT0Edsufzgc0eXrpw",
  authDomain: "e-commerce-website-e3bb2.firebaseapp.com",
  projectId: "e-commerce-website-e3bb2",
  storageBucket: "e-commerce-website-e3bb2.appspot.com",
  messagingSenderId: "1086756608079",
  appId: "1:1086756608079:web:cf7c6c322ecf49fea8b23a",
  measurementId: "G-1DQGR8H6WL",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

//google provider instance
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

//very important, auth is the Database memory in firestore
//that user authentication
export const auth = getAuth();

export const db = getFirestore();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

//async because we're interacting with an external service.
//taking SHOP_DATA and adding to firestore
// export const addCollectionAndDocuments = async (
//   collectionKey,
//   objectsToAdd
// ) => {
//   const collectionRef = collection(db, collectionKey);
//   const batch = writeBatch(db);

//   objectsToAdd.forEach((object) => {
//     const docRef = doc(collectionRef, object.title.toLowerCase());
//     batch.set(docRef, object);
//   });
//   await batch.commit();
//   console.log("done");
// };

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");

  //query to grab a snapshot of a collection object(empty or not)
  const q = query(collectionRef);

  //retrieve array of documents from collection
  const querySnapshot = await getDocs(q);

  //returns array of internal documents
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapShot) => {
    //.data() returns data object
    const { title, items } = docSnapShot.data();
    acc[title.toLowerCase()] = items;

    return acc;
  }, {});
  return categoryMap;
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInfo = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapShot = await getDoc(userDocRef);
  console.log(userSnapShot);
  console.log(userSnapShot.exists());

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log("Error creating the user", error.message);
    }

    return userDocRef;
  }
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    return;
  }

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  await signOut(auth);
};

//the callback function is what is called anytime auth changes
export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};
