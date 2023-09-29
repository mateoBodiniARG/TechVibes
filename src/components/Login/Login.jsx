import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Admin from "../Admin/Admin";
import { useAdmin } from "../../context/AdminContext";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensajeEmpty, setMensajeEmpty] = useState("");
  const [mensajeCorrecto, setMensajeCorrecto] = useState(""); 
  const [duplicado, setDuplicado] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const navigate = useNavigate()

  const { setAdminStatus } = useAdmin();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMensajeEmpty("Por favor, complete todos los campos.");
      return;
    }

    const formData = new URLSearchParams();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const res = await fetch("http://localhost/login.php", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
  
        if (data.messageAdmin) {
          setAdminStatus(true);
          setIsLoggedIn(true);
          navigate("/Admin");
          console.log('Usuario Admin');
        } else if (data.message) {
          navigate("/");
          console.log('Usuario normal');
        } else if (data.messageError) {
          setDuplicado(data.messageError);
        }
      } else {
        console.log("Respuesta no exitosa");
      }
    } catch (error) {
      console.error("Error:", error);
      setMensajeError(
        "Hubo un error al procesar el registro. Vuelve a intentarlo más tarde."
      );
      setMensajeCorrecto("");
      setMensajeEmpty("");
    }
  
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
              value={email}
              onChange={handleEmailChange} 
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
              value={password}
              onChange={handlePasswordChange} 
              placeholder="Tu contraseña"
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-500"
            />
          </div>

          {mensajeEmpty && (
            <p className="bg-red-200 text-red-800 font-semibold p-2 mb-5 rounded-md">
              {mensajeEmpty}
            </p>
          )}

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
          {mensajeError && (
            <p className="bg-red-200 text-red-800 font-semibold p-2 mb-5 rounded-md">
              {mensajeError}
            </p>
          )}
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