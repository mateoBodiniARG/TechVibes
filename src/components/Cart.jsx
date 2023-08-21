import React, { useContext } from "react";
import { CartContext } from "../context/ShoppingCartContext";
import ItemsCart from "./ItemsCart";
import { MdDeleteForever } from "react-icons/md";
import { useParams } from "react-router-dom";
import { BsCartX } from "react-icons/bs";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);

  const cartEmpty = cart.length === 0;

  const clearCart = () => {
    setCart([]);
  };

  return (
    <section className="h-screen">
      <div className="flex justify-around mb-3 mt-3 items-center">
        <div className="text-3xl text-white font-semibold">
          <h1>Product cart</h1>
        </div>
        <a
          className="relative inline-block text-lg group cursor-pointer"
          onClick={clearCart}
        >
          <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
            <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
            <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-950 group-hover:-rotate-180 ease"></span>
            <span className="flex relative items-center gap-2">
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
          {cartEmpty ? (
            <div className="items-center flex justify-center flex-col h-screen">
              <span className="text-indigo-900 text-5xl bg-indigo-300 p-3 rounded-xl"> <BsCartX/> </span>
              <p className="font-semibold text-4xl text-indigo-200 mt-4">Your cart is empty</p>
              <Link to={"/"}>
              <p className="text-white text-xl mt-5 bg-indigo-600 cursor-pointer px-2 py-2 rounded-xl transition ease-in hover:bg-indigo-400 hover:text-black ">Back to home</p>
              </Link>
            </div>
          ) : (
            cart.map((producto) => (
              <div key={producto.nombre}>
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
            ))
          )}
        </section>
      </section>
    </section>
  );
};

export default Cart;
