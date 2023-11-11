import React from "react";
import { AiOutlineWarning } from "react-icons/ai";
const Admin = () => {
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <h1 className="text-3xl font-bold mb-4 text-white">
        Bienvenido a la seccion admin
      </h1>
      <div className="max-w-md w-96 mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Inicie sesion
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
              // value={emailLogin}
              // onChange={(e) => setEmailLogin(e.target.value)}
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
              // value={passwordLogin}
              // onChange={(e) => setPasswordLogin(e.target.value)}
              placeholder="Tu contraseña"
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
            // onClick={(e) => handleSubmit(e)}
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
      <div className="container mx-auto mt-8 p-4 bg-yellow-100 border border-yellow-300 rounded-md">
        <p className="text-yellow-800 text-center font-normal text-lg">
          <AiOutlineWarning className="inline-block mr-2" />
          <span className="font-bold">NOTA:</span> Solo los administradores
          podrán acceder a esta sección. Si eres un usuario normal, no podrás
          acceder.
        </p>
      </div>
    </div>
  );
};

export default Admin;
