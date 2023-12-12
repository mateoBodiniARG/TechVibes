import React from "react";
import Item from "./Item";
import { useState } from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";
const ItemList = ({ productos }) => {
  const [encontrado, setEncontrado] = useState([]);

  const filtradoPorNombre = (nombre) => {
    if (nombre) {
      const encontrado = productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(nombre.toLowerCase())
      );
      setEncontrado(encontrado);
    } else {
      setEncontrado(productos);
    }
  };

  const filtradoPorStock = () => {
    const encontrado = productos.filter((producto) => producto.stock > 0);
    setEncontrado(encontrado);
  };

  useEffect(() => {
    setEncontrado(productos);
    filtradoPorStock();
  }, [productos]);

  return (
    <div>
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <input
          className="border border-gray-300 rounded-md px-4 py-2 mt-4 mb-4 focus:ring-blue-600 font-semibold"
          onChange={(e) => filtradoPorNombre(e.target.value)}
          placeholder="Buscar producto"
        />
      </motion.div>

      {encontrado.length === 0 ? (
        <motion.div
          className="container mx-auto mt-8 p-3 bg-yellow-100 border border-yellow-300 rounded max-w-xs"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-yellow-800 text-lg font-semibold text-center">
            No se han encontrado resultados
          </p>
        </motion.div>
      ) : (
        <div>
          {productos.stock >= 0 ? () => filtradoPorNombre() : null}
          <motion.div
            className="grid smMax:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mx-auto max-w-screen-2xl mm:flex flex-col mm3:flex"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {encontrado.map((producto) => (
              <div key={producto.nombre}>
                <Item
                  id={producto.id}
                  nombre={producto.nombre}
                  desc={producto.description}
                  stock={producto.stock}
                  price={producto.price}
                  img={producto.img}
                  categoryId={producto.categoryId}
                />
              </div>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ItemList;
