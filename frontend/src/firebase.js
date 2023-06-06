import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyDcR80xLitQGY9osSjU4nkSSBlh3TwgutQ",
  authDomain: "cwebb-7f86e.firebaseapp.com",
  projectId: "cwebb-7f86e",
  storageBucket: "cwebb-7f86e.appspot.com",
  messagingSenderId: "78595077057",
  appId: "1:78595077057:web:5fd62cf35bdf20f3d03540",
  measurementId: "G-W5WDHMB4RP",
});

export const auth = app.auth();
export default app;
