import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const Login = () => {
  const auth = useAuth();
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.login(emailLogin, passwordLogin);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-96 mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Ingresar al sistema
        </h2>
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
    </div>
  );
};

export default Login;
