import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import LoadingV2 from "../Loading/LoadingV2";

const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [estadoFiltrado, setEstadoFiltrado] = useState([]);
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
        ventas.sort((a, b) => b.fechaPedidoUsuario - a.fechaPedidoUsuario);
        setVentas(ventas);
        setEstadoFiltrado(ventas);
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
      window.location.reload();
    } catch (error) {
      console.error("Error al cambiar el estado del pedido:", error.message);
    }
  };

  const filtradoPorEstado = (estado) => {
    const ventasFiltradas = ventas.filter((venta) => venta.estado === estado);
    if (estado === "completo") {
      ventasFiltradas.sort(
        (a, b) => b.fechaPedidoUsuario - a.fechaPedidoUsuario
      );
      setEstadoFiltrado(ventasFiltradas);
    } else if (estado === "pendiente") {
      ventasFiltradas.sort(
        (a, b) => b.fechaPedidoUsuario - a.fechaPedidoUsuario
      );
      setEstadoFiltrado(ventasFiltradas);
    } else if (estado === "todos") {
      setEstadoFiltrado(ventas);
    }
  };
  const regresar = () => {
    window.history.back();
  };
  return (
    <div>
      {ventas.length === 0 && !loading && (
        <p className="text-center text-2xl">No hay ventas</p>
      )}
      <div className="text-center gap-3 mt-6">
        {loading ? (
          <LoadingV2 />
        ) : (
          <div className="flex justify-center text-center gap-3">
            <div className="">
              <select
                className="mt-3 bg-slate-700 border border-slate-600 rounded py-3 px-4 leading-tight text-white cursor-pointer hover:bg-slate-600 ease-in-out transition-all duration-300"
                onChange={(e) => filtradoPorEstado(e.target.value)}
                defaultValue={"todos"}
              >
                <option value="todos">Todos</option>
                <option value="completo">Completos</option>
                <option value="pendiente">Pendientes</option>
              </select>
            </div>
            <button
              className="mt-3 bg-red-700 rounded py-3 px-4 leading-tight text-white cursor-pointer hover:bg-red-600 ease-in-out transition-all duration-300 "
              onClick={regresar}
            >
              Regresar
            </button>
          </div>
        )}
      </div>
      <div className="p-4 mx-auto lg:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <LoadingV2 />
        ) : (
          estadoFiltrado.map((venta) => (
            <div
              key={venta.id}
              className="bg-gray-800 p-4 rounded-md shadow-md"
            >
              <h2 className="text-white text-lg font-semibold mb-2">
                Venta #{venta.id}
              </h2>
              <p className="text-white">
                <strong>Usuario:</strong> {venta.buyer.name}
              </p>
              <p className="text-white">
                <strong>Email:</strong> {venta.buyer.email}
              </p>
              <p className="text-white">
                <strong>Fecha:</strong>{" "}
                {venta?.fechaPedidoUsuario?.toDate().toLocaleDateString()}
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
    </div>
  );
};

export default Ventas;
