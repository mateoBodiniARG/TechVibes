import React from "react";
import { auth } from "../main.jsx";
import { createContext, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("error creating auth context");
  }
  return context;
};

export function AuthProvider({ children }) {
  // -----------------------------Registro----------------------------------------------------
  const registro = async (email, password) => {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(response);
  };
  // ----------------------------------------------------------------------------------------

  // -----------------------------Login con email y contraseña--------------------------------
  const login = async (email, password) => {
    const response = await signInWithEmailAndPassword(auth, email, password);
    console.log(response);
  };
  // ----------------------------------------------------------------------------------------

  // ----------------------Login con google--------------------------------------------------
  const loginWithGoogle = async () => {
    const responseGoogle = new GoogleAuthProvider();
    const response = await signInWithPopup(auth, responseGoogle);
    console.log(response);
  };
  // ----------------------------------------------------------------------------------------

  // --------------------------LogOut--------------------------------------------------------
  const logOut = async () => {
    const response = await signOut(auth);
    console.log(response);
  };
  // ----------------------------------------------------------------------------------------

  return (
    <authContext.Provider
      value={{
        registro,
        login,
        loginWithGoogle,
        logOut,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
