import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Loading from "../Loading/Loading";

const Admin = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const db = getFirestore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const rolAdmin = async () => {
      if (auth.user) {
        const docRef = doc(db, `users/${auth.user.uid}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data().admin) {
          console.log("Usuario administrador");
          setLoading(false);
        } else {
          console.log("No es un usuario administrador");
          navigate("/");
        }
      }
      setLoading(false);
    };

    if (auth.user === null) {
      navigate("/");
      setLoading(false);
    } else {
      rolAdmin();
    }
  }, [auth.user, navigate, db]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <h1 className="text-3xl font-bold mb-4 text-white">
        Bienvenido a la sección admin
      </h1>
    </div>
  );
};

export default Admin;
