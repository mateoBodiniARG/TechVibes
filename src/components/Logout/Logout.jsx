import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const cerrarSesion = async () => {
      try {
        const response = await fetch("http://localhost/logout.php", {
          method: "POST",
          // Puedes enviar cualquier información adicional si es necesario
        });

        if (response.ok) {
          // La sesión se ha cerrado correctamente, redirige al usuario
          navigate("/login");
        } else {
          // Handle error
          console.error("Error al cerrar sesión");
        }
      } catch (error) {
        console.error("Error al cerrar sesión", error);
      }
    };

    cerrarSesion();
  }, [navigate]);

  return <div>Cerrando sesión...</div>;
};

export default Logout;
