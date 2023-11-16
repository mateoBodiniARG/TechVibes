import React, { useState, useEffect } from "react";
import CartWidget from "../Cart/CartWidget";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoadingV2 from "../Loading/LoadingV2";

const NavBar = () => {
  const [burgerOpen, setburgerOpen] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const handleLogOut = async () => {
    setLoading(true);
    try {
      await auth.logOut();
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    } finally {
      navigate("/login");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1300);
  }, [auth.user]);

  const toggleSearch = () => {
    setburgerOpen((prevState) => !prevState);
  };

  return (
    <nav className="bg-gray-900 border-b-2 border-gray-800 max-w-full">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 mm:justify-center ">
        <div className="flex items-center">
          <button
            type="button"
            onClick={toggleSearch}
            data-collapse-toggle="navbar-search"
            className="mr-4 bg-slate-800 inline-flex items-center p-2 w-9 h-9 justify-center text-sm text-gray-200 rounded-md m8:hidden"
            aria-controls="navbar-search"
            aria-expanded={burgerOpen}
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          <Link to={"/"}>
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white m8Max:text-center uppercase">
              TechVibes
            </span>
          </Link>
        </div>
        <div className="items-center flex md:order-2 gap-2 mm:gap-11">
          <div>
            {loading ? (
              <LoadingV2 />
            ) : (
              <>
                {auth.user ? (
                  <button
                    onClick={(e) => handleLogOut(e)}
                    className="m8Max:hidden bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
                  >
                    Cerrar Sesión
                  </button>
                ) : (
                  <Link to={"/login"}>
                    <button className="m8Max:hidden bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out">
                      Ingrese al sistema
                    </button>
                  </Link>
                )}
              </>
            )}
          </div>
          <div className="items-center md:flex md:order-2 gap-2 mm:gap-11">
            <Link to={"/cart"}>
              <div className="cartWidget ml-1 text-white">
                <CartWidget />
              </div>
            </Link>
          </div>
        </div>
        <div
          className={`items-center justify-between ${
            burgerOpen ? "block" : "hidden"
          } w-full m8:flex m8:w-auto m8:order-1`}
          id="navbar-search"
        >
          <ul className="mdMAX:border-2 flex flex-col md:flex-row md:space-x-4 md:mt-0 font-medium text-white bg-gray-800 md:bg-gray-900 border-gray-700 rounded-lg items-center">
            <li className="mdMAX:border-2 border-gray-700 bg-slate-900 rounded-md m-2 hover:text-white md:py-2 md:px-4 py-3 px-6">
              <Link to={"/category/Headsets"}>Headsets</Link>
            </li>
            <li className="mdMAX:border-2 border-gray-700 bg-slate-900 rounded-md m-2 hover:text-white md:py-2 md:px-4 py-3 px-6">
              <Link to={"/category/Keyboards"}>Keyboards</Link>
            </li>
            <li className="mdMAX:border-2 border-gray-700 bg-slate-900 rounded-md m-2 hover:text-white md:py-2 md:px-4 py-3 px-6">
              <Link to={"/category/Gaming Chairs"}>Gaming Chairs</Link>
            </li>

            {auth.user ? (
              <li className="md:hidden mdMAX:border-2 border-gray-700 bg-red-500 rounded-md m-2 hover:text-white md:py-2 md:px-4 py-3 px-6">
                <button onClick={() => handleLogOut()}>Cerrar Sesión</button>
              </li>
            ) : (
              <li className="md:hidden bg-green-500 rounded-md m-2 hover:text-white md:py-2 md:px-4 py-3 px-6">
                <Link to={"/login"}>Ingresar al sistema</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
