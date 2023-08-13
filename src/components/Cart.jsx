import React, { useContext } from "react";
import { CartContext } from "../context/ShoppingCartContext";
import ItemsCart from "./ItemsCart";
import { MdDeleteForever } from "react-icons/md";
const Cart = () => {
  const { cart, setCart } = useContext(CartContext);

  const clearCart = () => {
    setCart([]);
  };
  return (
    <section className="text-2xl mt-3 font-semibold text-white text-center grid sm:grid-cols-2 lg:grid-cols-1 mx-auto max-w-screen-lg">
      <section>
        <div className="flex justify-between mb-5">
          <div className="flex justify-between mb-6">
            <h1>Lista de productos agregados</h1>
          </div>
          <a href="#_" class="relative inline-block text-lg group">
            <span class="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
              <span class="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
              <span class="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-950 group-hover:-rotate-180 ease"></span>
              <span
                class="flex relative items-center gap-2"
                onClick={clearCart}
              >
                {" "}
                <MdDeleteForever className="w-5 h-5" /> Clear cart
              </span>
            </span>
            <span
              class="absolute bottom-0 right-0 w-full h-12 -mb-2 -mr-2 transition-all duration-200 ease-linear bg-gray-950 rounded-lg group-hover:mb-0 group-hover:mr-0"
              data-rounded="rounded-lg"
            ></span>
          </a>
        </div>
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
              />
            </div>
          );
        })}
      </section>
    </section>
  );
};

export default Cart;
