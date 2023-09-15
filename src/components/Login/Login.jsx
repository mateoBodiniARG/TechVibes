import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Agrega aquí la lógica para enviar los datos del formulario al servidor, autenticar al usuario, etc.
    console.log("Datos del formulario:", formData);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-96 mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Ingresar al sistema
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="text-white block mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Tu correo electrónico"
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-500"
              required
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
              value={formData.password}
              onChange={handleChange}
              placeholder="Tu contraseña"
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
          >
            Iniciar Sesión
          </button>
        </form>
        <p className="mt-3 text-center text-white">
          ¿No tenés cuenta?
          <Link to={"/register"}>
            <span className="font-bold ml-1 text-blue-500 hover:underline">Registrate</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
