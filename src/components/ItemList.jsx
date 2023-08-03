import React from "react";
import Item from "./Item";

const ItemList = ({ productos }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 mx-auto max-w-screen-xl">
      {productos.map((producto) => {
        return (
          <div key={producto.id}>
            <Item
              id={producto.id}
              nombre={producto.nombre}
              desc={producto.description}
              stock={producto.stock}
              price={producto.price}
              discount={producto.discount}
              img={producto.img}
              category={producto.category}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;

