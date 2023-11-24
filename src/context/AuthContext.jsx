import React, { useState, useEffect } from "react";
import { auth } from "../main.jsx";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  getAuth,
  getRedirectResult,
  signInWithRedirect,
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
  const db = getFirestore();
  const navigate = useNavigate();

  // Controlador de cambios de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [db, navigate]);

  const registro = async (email, password) => {
    try {
      const infoUsuario = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const nuevoUsuario = infoUsuario.user;
      setUser(nuevoUsuario);
      console.log(infoUsuario.user.uid);

      const docRef = doc(db, `users/${infoUsuario.user.uid}`);
      setDoc(docRef, { correo: email, admin: false });
      return nuevoUsuario;
    } catch (error) {
      console.error("Error al registrar el usuario:", error.message);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const infoUsuario = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const currentUser = infoUsuario.user;
      // Verificar el rol del usuario antes de actualizar el estado 'user'
      const docRef = doc(db, `users/${currentUser.uid}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists() && docSnap.data().admin) {
        // Si el usuario es administrador, redirige a la ruta de administrador
        setUser(currentUser);
        navigate("/admin");
      } else {
        // Si no es administrador, redirige a otra ruta
        setUser(currentUser);
        navigate("/");
      }

      return currentUser;
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();

      // Inicia el proceso de inicio de sesión con Google redirigiendo al usuario a la página de inicio de sesión de Google
      await signInWithRedirect(auth, provider);

      // Obtiene el resultado del inicio de sesión con Google después de la redirección
      const result = await getRedirectResult(auth);

      // El usuario está ahora autenticado
      // accedemos a los datos del usuario usando result.user
      const currentUser = result.user;
      setUser(currentUser);

      // Redirige a la página principal después de obtener el resultado
      navigate("/");

      return currentUser;
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error.message);
      throw error;
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
      throw error;
    }
  };

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
