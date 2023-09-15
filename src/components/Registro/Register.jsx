import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append("nombre", nombre);
    formData.append("email", email);
    formData.append("password", password);
    
    try {
      const response = await fetch("http://localhost/registro.php", {
        method: "POST",
        body: formData,
      });
      
      if (response.ok) {
        const data = await response.json(); 
        setMensaje(data.message); 
      } else {
        const errorData = await response.json(); 
        setMensaje("Hubo un error al procesar el registro: " + errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setMensaje("Hubo un error al procesar el registro.");
    }
  };

 
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-96 mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Registrese en el sistema
        </h2>
        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label htmlFor="nombre" className="text-white block mb-1">
              Nombre
            </label>
            <input
              onChange={(e) => setNombre(e.target.value)}
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Tu correo electrónico"
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="text-white block mb-1">
              Correo Electrónico
            </label>
            <input
            onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
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
            onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              placeholder="Tu contraseña"
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
          >
            Registrarse
          </button>
        </form>
        <p className="mt-3 text-center text-white">
          ¿Ya tienes una cuenta?
          <Link to={"/Login"}>
            <span className="font-bold ml-1 text-blue-500 hover:underline">
              Inicia sesion
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
