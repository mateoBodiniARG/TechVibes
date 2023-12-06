import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";

const Register = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [emailRegistro, setEmailRegistro] = useState("");
  const [passwordRegistro, setPasswordRegistro] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRegistro.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    try {
      setLoading(true);
      await auth.registro(userName, emailRegistro, passwordRegistro);
      navigate("/");
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("El correo electrónico ya está en uso.");
          break;
        case "auth/invalid-email":
          setError("El correo electrónico no es válido.");
          break;
        default:
          setError("Error al crear usuario");
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div className="max-w-md w-96 mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-white mb-4">Registro</h2>
            {error && (
              <div className="text-base text-red-500 font-medium text-center">
                <p>{error}</p>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="text-white block mb-1">Nombre</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Tu nombre"
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-500"
                />
              </div>
              <div className="mb-4">
                <label className="text-white block mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  value={emailRegistro}
                  onChange={(e) => setEmailRegistro(e.target.value)}
                  placeholder="Tu correo electrónico"
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-500"
                />
              </div>
              <div className="mb-4">
                <label className="text-white block mb-1">Contraseña</label>
                <input
                  type="password"
                  onChange={(e) => setPasswordRegistro(e.target.value)}
                  value={passwordRegistro}
                  placeholder="Tu contraseña"
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-500"
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
                  Inicia sesión
                </span>
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
