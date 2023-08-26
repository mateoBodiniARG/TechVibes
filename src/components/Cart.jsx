import React, { useContext } from "react";
import { CartContext } from "../context/ShoppingCartContext";
import ItemsCart from "./ItemsCart";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { BsCartX } from "react-icons/bs";
import Fade from "react-reveal/Fade";
import { AiOutlineHome } from "react-icons/ai";

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  const cartEmpty = cart.length === 0;

  const clearCart = () => {
    setCart([]);
  };

  let cartTotal = 0;
  cart.forEach((item) => (cartTotal += item.price * item.cantComprar));

  return (
    <div>
      <div className="flex justify-around mb-3 mt-3 items-center">
        <div className="mm:text-2xl text-3xl text-white font-semibold">
          <h1>Product cart</h1>
        </div>
        <a
          className="relative inline-block mm:text-base text-lg group cursor-pointer"
          onClick={clearCart}
        >
          <span className="relative z-10 block mm:px-3 px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
            <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
            <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-950 group-hover:-rotate-180 ease"></span>
            <span className="flex relative items-center gap-2">
              <MdDeleteForever className="w-5 h-5" /> Delete cart
            </span>
          </span>
          <span
            className="absolute bottom-0 right-0 w-full h-12 mm:-mb-0 mm:-mr-1 -mb-1 -mr-2 transition-all duration-200 ease-linear bg-black rounded-lg group-hover:mb-0 group-hover:mr-0"
            data-rounded="rounded-lg"
          ></span>
        </a>
      </div>
      <section className="mt-5 text-center mm:flex mm:justify-center grid sm:grid-cols-1 lg:grid-cols-1 mm:grid-cols-1 mx-auto max-w-5xl px-3">
        <section>
          {cartEmpty ? (
            <div className="items-center flex justify-center flex-col h-screen">
              <Fade top>
                <span className="text-indigo-900 text-5xl bg-indigo-300 p-3 rounded-xl">
                  <BsCartX />
                </span>
                <p className="font-semibold text-4xl text-indigo-200 mt-4">
                  Your cart is empty
                </p>
                <Link to={"/"}>
                  <p className="flex items-center gap-2 text-white text-xl mt-5 bg-indigo-600 cursor-pointer px-2 py-2 rounded-xl transition ease-in hover:bg-indigo-400 hover:text-black ">
                    <AiOutlineHome className="w-6 h-6" /> Back to home
                  </p>
                </Link>
              </Fade>
            </div>
          ) : (
            cart.map((producto) => (
              <div
                className="mm:text-sm mm:overflow-hidden mm:max-w-xs"
                key={producto.nombre}
              >
                <ItemsCart {...producto} />
              </div>
            ))
          )}
          <section className="flex justify-center mm:text-sm mm:overflow-hidden mm:max-w-xs">
            <div className="mt-8 p-5 bg-gray-100 rounded-lg w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-semibold">Total:</h2>
                <span className="text-3xl font-bold">${cartTotal}</span>
              </div>
              <Link to={"/finalizePurchase"}>
                <button className="w-full py-2 bg-indigo-800 text-white rounded-lg hover:bg-indigo-600 transition ease-in">
                  Finalize Purchase
                </button>
              </Link>
            </div>
          </section>
        </section>{" "}
      </section>
    </div>
  );
};

export default Cart;
