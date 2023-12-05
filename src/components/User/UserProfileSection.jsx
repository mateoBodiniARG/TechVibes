import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AiOutlineShopping, AiOutlineLogout } from "react-icons/ai";
import { MdFavorite } from "react-icons/md";
import { Link } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { GrUserAdmin } from "react-icons/gr";
import Loading from "../Loading/Loading";
import { motion } from "framer-motion";

const UserProfileSection = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const db = getFirestore();
  const [loading, setLoading] = useState(true);

  const handleLogOut = async () => {
    try {
      await auth.logOut();
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    } finally {
      navigate("/");
    }
  };

  useEffect(() => {
    const handleAdmin = async () => {
      if (auth.user) {
        const docRef = doc(db, `users/${auth.user.uid}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // Revisa si el documento existe
          const isAdmin = docSnap.data().admin;
          console.log("Valor de admin:", isAdmin);

          if (isAdmin === true) {
            console.log("Usuario administrador");
            setIsAdmin(true);
            setLoading(false);
          } else {
            console.log("No es un usuario administrador");
            navigate("/userProfile");
            setLoading(false);
          }
        }
      }
    };
    handleAdmin();
  }, [auth.user]);
  return (
    <div className="p-6">
      {loading ? <Loading /> : null}
      <h1 className="text-2xl font-semibold text-white mb-4 text-center">
        ¡Hola, {auth.user ? auth.user.displayName : "Buscando ..."}!
      </h1>
      {auth.user ? (
        <motion.section
          className="flex justify-center "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <div className="grid grid-cols-1 w-custom-width gap-4">
            <Link to="/favorite">
              <motion.div className="bg-fuchsia-600  p-4 rounded-md shadow-md hover:bg-fuchsia-800 transition duration-300 ease-in-out cursor-pointer flex flex-col items-center justify-center">
                <MdFavorite className="text-white text-3xl mb-1" />
                <p className="text-white font-semibold text-lg text-center">
                  Productos Favoritos
                </p>
              </motion.div>
            </Link>
            <Link to={auth.user ? "/UserOrders" : "/login"}>
              <div className="bg-blue-500 p-4 rounded-md shadow-md hover:bg-blue-600 transition duration-300 ease-in-out cursor-pointer flex flex-col items-center justify-center">
                <AiOutlineShopping className="text-white text-3xl mb-1" />
                <p className="text-white font-semibold text-lg text-center">
                  Mis compras
                </p>
              </div>
            </Link>

            {isAdmin ? (
              <Link to="/admin">
                <div className="bg-green-500 p-4 rounded-md shadow-md hover:bg-green-600 transition duration-300 ease-in-out cursor-pointer flex flex-col items-center justify-center">
                  <GrUserAdmin className="text-white text-3xl mb-1" />
                  <p className="text-white font-semibold text-lg text-center">
                    Panel de admin
                  </p>
                </div>
              </Link>
            ) : null}

            <div
              onClick={handleLogOut}
              className="bg-red-500 p-4 rounded-md shadow-md hover:bg-red-600 transition duration-300 ease-in-out cursor-pointer flex flex-col items-center justify-center"
            >
              <AiOutlineLogout className="text-white text-3xl mb-1" />
              <p className="text-white font-semibold text-lg text-center">
                Cerrar Sesión
              </p>
            </div>
          </div>
        </motion.section>
      ) : null}
    </div>
  );
};

export default UserProfileSection;
