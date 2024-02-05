// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
    getFirestore,
    collection,
    getDocs,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    getDoc,
    updateDoc,
    arrayUnion,
    arrayRemove,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAB7hghI15zorz0yQlHL3xnhSsHHKfga0o",
    authDomain: "proyecto-2daw-firebase.firebaseapp.com",
    projectId: "proyecto-2daw-firebase",
    storageBucket: "proyecto-2daw-firebase.appspot.com",
    messagingSenderId: "574328986931",
    appId: "1:574328986931:web:99155f7ddf6e5b08fef246",
    measurementId: "G-12NXT46K0Q",
};

//Conectamos con la base de datos
const app = initializeApp(firebaseConfig);
const db = getFirestore();
//CRUD

export const saveData = (ref, objeto) => addDoc(collection(db, ref), objeto);
export const getDataCollection = (ref) => getDocs(collection(db, ref));
export const getDataChanged_collection = (ref, callBack) => onSnapshot(collection(db, ref), callBack);
export const getDataChanged_document = (ref, document, callBack) => onSnapshot(doc(db, ref, document), callBack);
export const deleteData = (id, ref) => deleteDoc(doc(db, ref, id));
export const getData = (id, ref) => getDoc(doc(db, ref, id));
export const updateData = (id, ref, objeto) => updateDoc(doc(db, ref, id), objeto);


//Subir a arrays
export const saveData2 = (id, ref, campo, objeto) => {
    updateDoc(doc(db, ref, id), { [campo]: arrayUnion(objeto) });
};
//Borrar datos arrays
export const deleteData2 = (id, ref, campo, objeto) => {
    updateDoc(doc(db, ref, id), { [campo]: arrayRemove(objeto) });
};
//Modificar datos array
export const modifyData = (id, ref, campo, objetoActual, objetoModificado) => {
    const documentRef = doc(db, ref, id);
    updateDoc(documentRef, { [campo]: arrayRemove(objetoActual) });
    updateDoc(documentRef, { [campo]: arrayUnion(objetoModificado) });
};
