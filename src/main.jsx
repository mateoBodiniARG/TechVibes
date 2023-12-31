import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { getAuth } from "firebase/auth";
import "./index.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCa7lXSzI9-td6C4ElDpfsJGror-aYCgsk",
  authDomain: "techvibes-d125a.firebaseapp.com",
  // authDomain: "https://tech-vibes.vercel.app",
  projectId: "techvibes-d125a",
  storageBucket: "techvibes-d125a.appspot.com",
  messagingSenderId: "429311452238",
  appId: "1:429311452238:web:df9441c6222cf0e4ee4f1f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
