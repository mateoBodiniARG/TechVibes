import React, { useState, useEffect } from "react";
import { auth } from "../main.jsx";
import { createContext, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
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
  const [user, setUser] = useState(null);
  useEffect(() => {
    const suscrito = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        console.log("no hay usuario suscrito");
        setUser(null);
      } else {
        setUser(currentUser);
      }
    });
    return suscrito;
  }, []);

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
    setUser(null);
  };
  // ----------------------------------------------------------------------------------------

  return (
    <authContext.Provider
      value={{
        registro,
        login,
        loginWithGoogle,
        logOut,
        user,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
