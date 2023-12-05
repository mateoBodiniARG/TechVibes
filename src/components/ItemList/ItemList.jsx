import React from "react";
import Item from "./Item";
import { useState } from "react";
import { useEffect } from "react";

const ItemList = ({ productos }) => {
  const [encontrado, setEncontrado] = useState([]);
  const [burgerOpen, setburgerOpen] = useState(false);

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
      <div className="flex justify-center">
        <input
          className="border border-gray-300 rounded-md px-4 py-2 mt-4 mb-4 focus:ring-blue-600 font-semibold"
          onChange={(e) => filtradoPorNombre(e.target.value)}
          placeholder="Buscar producto"
        />
      </div>

      {encontrado.length === 0 ? (
        <div className="container mx-auto mt-8 p-3 bg-yellow-100 border border-yellow-300 rounded max-w-xs">
          <p className="text-yellow-800 text-lg font-semibold text-center">
            No se han encontrado resultados
          </p>
        </div>
      ) : (
        <div>
          {productos.stock >= 0 ? () => filtradoPorNombre() : null}
          <div className="grid smMax:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mx-auto max-w-screen-2xl mm:flex flex-col mm3:flex">
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
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemList;
