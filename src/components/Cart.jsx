import React, { useContext } from "react";
import { CartContext } from "../context/ShoppingCartContext";
import ItemsCart from "./ItemsCart";
import { MdDeleteForever } from "react-icons/md";
import { productos } from "./data/AsyncMock";
const Cart = () => {
  const { cart, setCart } = useContext(CartContext);

  const clearCart = () => {
    setCart([]);
  };

  return (
    <section>
      <div className="flex justify-around mb-3 mt-3 items-center">
          <div className="text-3xl text-white font-semibold">
            <h1>Product cart</h1>
          </div>
          <a className="relative inline-block text-lg group cursor-pointer" onClick={clearCart}>
            <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
              <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
              <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-950 group-hover:-rotate-180 ease"></span>
              <span
                className="flex relative items-center gap-2"
              >
                <MdDeleteForever className="w-5 h-5" /> Delete cart
              </span>
            </span>
            <span
              className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-2 transition-all duration-200 ease-linear bg-black rounded-lg group-hover:mb-0 group-hover:mr-0"
              data-rounded="rounded-lg"
            ></span>
          </a>
        </div>
    <section className="mt-5 text-center grid sm:grid-cols-1 lg:grid-cols-1 mx-auto max-w-5xl px-3">
      <section>
        {cart.map((producto) => {
          return (
            <div key={producto.id}>
              <ItemsCart
                id={producto.id}
                nombre={producto.nombre}
                desc={producto.description}
                stock={producto.stock}
                price={producto.price}
                discount={producto.discount}
                img={producto.img}
                category={producto.category}
                cantComprar={producto.cantComprar}
                productos={productos}
              />
            </div>
          );
        })}
      </section>
    </section>
    </section>
        
  );
};

export default Cart;
