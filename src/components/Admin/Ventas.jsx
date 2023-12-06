import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

const Ventas = () => {
  const { user } = useAuth();
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore();

  useEffect(() => {
    const obtenerVentas = async () => {
      try {
        const ordersCollection = collection(db, "usersOrders");
        const querySnapshot = await getDocs(ordersCollection);
        const ventas = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setVentas(ventas);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener las ventas:", error.message);
      }
    };

    obtenerVentas();
  }, [db]);

  const cambiarEstadoPedido = async (id, estado) => {
    try {
      const orderDoc = doc(db, "usersOrders", id);
      await updateDoc(orderDoc, { estado: estado });
      const ordersCollection = collection(db, "usersOrders");
      const querySnapshot = await getDocs(ordersCollection);
      const ventas = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVentas(ventas);
    } catch (error) {
      console.error("Error al cambiar el estado del pedido:", error.message);
    }
  };

  return (
    <div className="p-4 mx-auto lg:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {loading ? (
        <p>Cargando...</p>
      ) : (
        ventas.map((venta) => (
          <div key={venta.id} className="bg-gray-800 p-4 rounded-md shadow-md">
            <h2 className="text-white text-lg font-semibold mb-2">
              Venta #{venta.id}
            </h2>
            <p className="text-white">
              <strong>Usuario:</strong> {venta.buyer.name}
            </p>
            <p className="text-white">
              <strong>Fecha:</strong>{" "}
              {venta.fechaPedidoUsuario.toDate().toLocaleDateString()}
            </p>
            <p className="text-white">
              <strong>Estado:</strong> {venta.estado}
            </p>
            <p className="text-white">
              <strong>Total:</strong> ${venta.total}
            </p>
            <div className="mt-4">
              {venta.estado === "pendiente" && (
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2 mm3:w-full"
                  onClick={() => cambiarEstadoPedido(venta.id, "completo")}
                >
                  Marcar como completo
                </button>
              )}
              {venta.estado === "completo" && (
                <button className="bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 rounded mr-2 mm3:w-full opacity-50 cursor-not-allowed">
                  Completado
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Ventas;
