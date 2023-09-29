import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const [mensajeCorrecto, setMensajeCorrecto] = useState("");
  const [mensajeEmpty, setMensajeEmpty] = useState("");
  const [duplicado, setDuplicado] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !email || !password) {
      setMensajeEmpty("Por favor, complete todos los campos.");
      return;
    }

    const formData = new URLSearchParams();
    formData.append("nombre", nombre);
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await fetch("http://localhost/registro.php", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setMensajeCorrecto(data.message);
        setMensajeError("");
        setMensajeEmpty("");
        
        if(response.ok && data.messageError){
        setDuplicado(data.messageError);
      }
      }
    } catch (error) {
      console.error("Error:", error);
      setMensajeError(
        "Hubo un error al procesar el registro vuelve a intentarlo mas tarde."
      );
      setMensajeCorrecto("");
    }
    setEmail('')
    setPassword('')
    setNombre('')
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-96 mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Regístrate en el sistema
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="input-nombre" className="text-white block mb-1">
              Nombre
            </label>
            <input
              onChange={(e) => setNombre(e.target.value)}
              type="text"
              id="input-nombre"
              name="nombre"
              value={nombre}
              placeholder="Tu nombre"
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="input-email" className="text-white block mb-1">
              Correo Electrónico
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="input-email"
              name="email"
              value={email}
              placeholder="Tu correo electrónico"
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="input-password" className="text-white block mb-1">
              Contraseña
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="input-password"
              name="password"
              value={password}
              placeholder="Tu contraseña"
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-500"
            />
          </div>

          {mensajeCorrecto && (
            <p className="bg-green-200 text-green-800 font-semibold p-2 mb-5 rounded-md">
              {mensajeCorrecto}
            </p>
          )}

          {duplicado && !mensajeCorrecto && (
            <p className="bg-red-200 text-red-800 font-semibold p-2 mb-5 rounded-md">
              {duplicado}
            </p>
          )}

          {mensajeEmpty && (
            <p className="bg-red-200 text-red-800 font-semibold p-2 mb-5 rounded-md">
              {mensajeEmpty}
            </p>
          )}

          {mensajeError && (
            <p className="bg-red-200 text-red-800 font-semibold p-2 mb-5 rounded-md">
              {mensajeError}
            </p>
          )}

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
              Inicia sesión
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
