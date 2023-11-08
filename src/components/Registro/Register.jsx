import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const auth = useAuth();
  const [emailRegistro, setEmailReggistro] = useState("");
  const [passwordRegistro, setPasswordRegistro] = useState("");

  const handleSubmit = () => {
    auth.registro(emailRegistro, passwordRegistro);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-96 mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Regístrate en el sistema
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="input-email" className="text-white block mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="input-email"
              name="email"
              value={emailRegistro}
              onChange={(e) => setEmailReggistro(e.target.value)}
              placeholder="Tu correo electrónico"
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="input-password" className="text-white block mb-1">
              Contraseña
            </label>
            <input
              type="password"
              id="input-password"
              name="password"
              onChange={(e) => setPasswordRegistro(e.target.value)}
              value={passwordRegistro}
              placeholder="Tu contraseña"
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
            onClick={() => handleSubmit()}
          >
            Registrarse
          </button>
        </form>
        <p className="mt-3 text-center text-white">
          ¿Ya tienes una cuenta?
          <Link to={"/Login"}>
            <span className="font-bold ml-1 text-blue-500 hover:underline">
              Inicia sesión
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
