import React from "react";
import Item from "./Item";
import { useState } from "react";
import { useEffect } from "react";

const ItemList = ({ productos }) => {
  const [copia, setCopia] = useState();

  const filtradoPorNombre = (nombre) => {
    if (nombre) {
       const copia = productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(nombre.toLowerCase())
    );
    setCopia(copia);
    } else {setCopia(productos)}
  };

  useEffect(() => {
    setCopia(productos);
  }, [productos]);


  return (
    <div>
      {copia ? (
        <div>
          {""}
          <div className="flex justify-center">
          <input
            className="border border-gray-300 rounded-md px-4 py-2 mt-4 mb-4 focus:ring-blue-600 font-semibold"
            onChange={(e) => filtradoPorNombre(e.target.value)}
            placeholder="Buscar producto"
          />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 mx-auto max-w-screen-xl">
            {copia.map((producto) => {
              return (
                <div key={producto.nombre}>
                  <Item
                    id={producto.id}
                    nombre={producto.nombre}
                    desc={producto.description}
                    stock={producto.stock}
                    price={producto.price}
                    discount={producto.discount}
                    img={producto.img}
                    categoryId={producto.categoryId}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ItemList;