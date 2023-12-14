import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

const Estadisticas = () => {
  const [productosMasVendidos, setProductosMasVendidos] = useState([]);
  const [categoriaMasVendida, setCategoriaMasVendida] = useState(null);
  const [totalVentas, setTotalVentas] = useState(0);
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [totalVentasSeleccionadas, setTotalVentasSeleccionadas] = useState(0);
  const [error, setError] = useState(null);

  const handleFechaDesdeChange = (event) => {
    setFechaDesde(event.target.value);
  };

  const handleFechaHastaChange = (event) => {
    setFechaHasta(event.target.value);
  };

  const handleCalcularClick = async () => {
    try {
      const db = getFirestore();
      const ventasCollection = collection(db, "usersOrders");

      const fechaDesdeObj = new Date(fechaDesde);
      const fechaHastaObj = new Date(fechaHasta);

      const q = query(
        ventasCollection,
        where("fechaPedidoUsuario", ">=", fechaDesdeObj),
        where("fechaPedidoUsuario", "<=", fechaHastaObj)
      );

      const querySnapshot = await getDocs(q);
      const ventasEnRango = querySnapshot.docs.map((doc) => doc.data());

      if (ventasEnRango.length === 0) {
        setError(
          "No hay ventas en el rango de fechas seleccionado. Por favor, elige otra fecha."
        );
        setTotalVentasSeleccionadas(0);
      } else {
        let totalVentasEnRango = 0;

        for (let i = 0; i < ventasEnRango.length; i++) {
          totalVentasEnRango += ventasEnRango[i].total;
        }

        setTotalVentasSeleccionadas(totalVentasEnRango);
        setError(null);
      }
    } catch (error) {
      console.error("Error al calcular el total de ventas:", error.message);
      setError(error.message);
    }
  };

  useEffect(() => {
    const obtenerProductosMasVendidos = async () => {
      try {
        const db = getFirestore();
        const productosCollection = collection(db, "Productos");
        const q = query(
          productosCollection,
          orderBy("ventas", "desc"),
          limit(3)
        );
        const querySnapshot = await getDocs(q);
        const productos = querySnapshot.docs.map((doc) => doc.data().nombre);

        setProductosMasVendidos(productos);
      } catch (error) {
        console.error(
          "Error al obtener los productos más vendidos:",
          error.message
        );
      }
    };

    // ------------------------------------------------------------------------------------------------------------------------
    const obtenerCategoriaMasVendida = async () => {
      try {
        const db = getFirestore();
        const categorias = ["keyboard", "gaming chairs", "headsets"];
        const consultas = categorias.map(async (categoryId) => {
          const productosCollection = collection(db, "Productos");
          const q = query(
            productosCollection,
            where("categoryId", "==", categoryId)
          );
          const querySnapshot = await getDocs(q);
          // se obtiene el total de ventas de cada categoría y lo sumo a un total general de ventas de todas las categorías (totalVentas)
          const totalVentas = querySnapshot.docs.reduce((total, doc) => {
            return total + (doc.data().ventas || 0);
          }, 0);
          // devolver un objeto con la categoría y el total de ventas de esa categoría
          return { categoria: categoryId, totalVentas };
        });
        // se ejecutan todas las consultas en paralelo y se espera a que todas terminen para obtener los resultados
        const resultados = await Promise.all(consultas);
        // se obtiene la categoría con más ventas de todas las categorías (categoriaMasVendida)
        const categoriaMasVendida = resultados.reduce((prev, current) =>
          prev.totalVentas > current.totalVentas ? prev : current
        );

        setCategoriaMasVendida(categoriaMasVendida);
      } catch (error) {
        console.error(
          "Error al obtener la categoría más vendida:",
          error.message
        );
      }
    };

    // ------------------------------------------------------------------------------------------------------------------------

    const obtenerTotalVentas = async () => {
      try {
        const db = getFirestore();
        const ventasCollection = collection(db, "usersOrders");
        const querySnapshot = await getDocs(ventasCollection);
        const ventas = querySnapshot.docs.map((doc) => doc.data().total);
        const totalVentas = ventas.reduce((total, venta) => total + venta, 0);
        setTotalVentas(totalVentas);
      } catch (error) {
        console.error("Error al obtener el total de ventas:", error.message);
      }
    };

    obtenerProductosMasVendidos();
    obtenerTotalVentas();
    obtenerCategoriaMasVendida();
  }, []);

  return (
    <div className="m-4 text-white">
      <h2 className="text-2xl font-bold mb-4">Resumen de Estadísticas</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-800 p-4 rounded-md shadow-md font-bold">
          <h3 className="text-lg font-semibold mb-2">
            Total de ventas acumulado
          </h3>
          <p className="text-white text-2xl">${totalVentas}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-md shadow-md">
          <h3 className="text-lg font-semibold mb-2">
            Top 3 productos más Vendidos
          </h3>
          <ol className="text-white text-">
            {productosMasVendidos.map((producto) => (
              <li key={producto}>{producto}</li>
            ))}
          </ol>
        </div>
        <div className="bg-gray-800 p-4 rounded-md shadow-md">
          <h3 className="text-lg font-semibold mb-2">Categoría más Vendida</h3>
          <p className="text-white text-2xl">
            {categoriaMasVendida?.categoria || "N/A"}
          </p>
        </div>
      </div>
      <div className="m-4 text-white">
        <h2 className="text-2xl font-bold mb-4">Ventas por fecha</h2>

        <div className="flex items-center space-x-4 mb-4 text-black">
          <input
            type="date"
            value={fechaDesde}
            onChange={handleFechaDesdeChange}
            className="p-2 rounded-md"
          />
          <input
            type="date"
            value={fechaHasta}
            onChange={handleFechaHastaChange}
            className="p-2 rounded-md"
          />
          <button
            onClick={handleCalcularClick}
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Calcular
          </button>
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-md shadow-md">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <p className="text-white text-xl">
            {totalVentasSeleccionadas
              ? `El total de ventas en el rango de la fecha seleccionada es de: $${totalVentasSeleccionadas}`
              : "Seleccione una fecha"}
          </p>
        )}
      </div>
    </div>
  );
};

export default Estadisticas;
