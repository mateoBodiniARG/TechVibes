import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import Loading from "../Loading/Loading";

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [loading, setLoading] = useState(false);
  const handleGoogle = async () => {
    await auth.loginWithGoogle().then(() => {
      navigate("/");
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await auth.login(emailLogin, passwordLogin);
      navigate("/");
    } catch (error) {
      setError(
        "Error al iniciar sesión. Verifica tu correo electrónico y contraseña."
      );
      console.error("Error al iniciar sesión:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="">
        {loading ? (
          <Loading />
        ) : (
          <div className="max-w-md w-96 mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-white mb-4 text-center">
              Iniciar sesion
            </h2>
            {error && (
              <div className="p-2 mb-2 text-base text-red-500 font-medium text-center">
                <p>{error}</p>
              </div>
            )}
            <form>
              <div className="mb-4">
                <label htmlFor="email" className="text-white block mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={emailLogin}
                  onChange={(e) => setEmailLogin(e.target.value)}
                  placeholder="Tu correo electrónico"
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="text-white block mb-1">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={passwordLogin}
                  onChange={(e) => setPasswordLogin(e.target.value)}
                  placeholder="Tu contraseña"
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
                onClick={(e) => handleSubmit(e)}
              >
                Iniciar Sesión
              </button>

              <button
                type="button"
                className="w-full mt-3 bg-white hover:bg-slate-300 text-black font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
                onClick={(e) => handleGoogle(e)}
              >
                <FcGoogle className="inline-block m-2" />
                Iniciar Sesión con Google
              </button>
            </form>

            <p className="mt-3 text-center text-white">
              ¿No tenés cuenta?
              <Link to={"/register"}>
                <span className="font-bold ml-1 text-blue-500 hover:underline">
                  Registrate
                </span>
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
