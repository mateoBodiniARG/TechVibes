import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineShopping,
  AiOutlineLogout,
  AiOutlineUser,
} from "react-icons/ai";
import { MdFavorite } from "react-icons/md";
import { Link } from "react-router-dom";
const UserProfileSection = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await auth.logOut();
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    } finally {
      navigate("/");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-white mb-4 text-center">
        ¡Hola, {auth.user ? auth.user.displayName : "Buscando ..."}!
      </h1>
      {auth.user ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to="/favorite">
            <div className="bg-fuchsia-600  p-4 rounded-md shadow-md hover:bg-fuchsia-800 transition duration-300 ease-in-out cursor-pointer flex flex-col items-center justify-center">
              <MdFavorite className="text-white text-3xl mb-1" />
              <p className="text-white font-semibold text-lg text-center">
                Productos Favoritos
              </p>
            </div>
          </Link>
          <Link to={auth.user ? "/UserOrders" : "/login"}>
            <div className="bg-blue-500 p-4 rounded-md shadow-md hover:bg-blue-600 transition duration-300 ease-in-out cursor-pointer flex flex-col items-center justify-center">
              <AiOutlineShopping className="text-white text-3xl mb-1" />
              <p className="text-white font-semibold text-lg text-center">
                Mis compras
              </p>
            </div>
          </Link>
          {/* <div className="bg-green-500 p-4 rounded-md shadow-md hover:bg-green-600 transition duration-300 ease-in-out cursor-pointer flex flex-col items-center justify-center">
            <AiOutlineUser className="text-white text-3xl mb-1" />
            <p className="text-white font-semibold text-lg text-center">
              Información del Usuario
            </p>
          </div> */}
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
      ) : null}
    </div>
  );
};

export default UserProfileSection;
