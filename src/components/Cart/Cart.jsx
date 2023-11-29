import { motion } from "framer-motion";
import ItemsCart from "./ItemsCart";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { BsCartX } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { useAuth } from "../../context/AuthContext";
import { CartContext } from "../../context/ShoppingCartContext";
import { useContext } from "react";
const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  const cartEmpty = cart.length === 0;
  const auth = useAuth();
  const displayName = auth.user ? auth.user.displayName : null;

  const clearCart = () => {
    setCart([]);
  };

  let cartTotal = 0;
  cart.forEach((item) => (cartTotal += item.price * item.cantComprar));

  return (
    <div>
      <div className="flex justify-around mb-3 mt-3 items-center">
        <div className="mm3:text-2xl text-3xl text-white font-semibold">
          <h1>Product cart</h1>
        </div>
        <motion.a
          whileHover="hover"
          className="relative inline-block mm3:text-base text-lg group cursor-pointer"
          onClick={clearCart}
        >
          <span className="relative z-10 block mm3:px-3 px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
            <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
            <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-950 group-hover:-rotate-180 ease"></span>
            <span className="flex relative items-center gap-2">
              <MdDeleteForever className="w-5 h-5" /> Delete cart
            </span>
          </span>
          <span
            className="absolute bottom-0 right-0 w-full h-12 mm3:-mb-0 mm3:-mr-1 -mb-1 -mr-2 transition-all duration-200 ease-linear bg-black rounded-lg group-hover:mb-0 group-hover:mr-0"
            data-rounded="rounded-lg"
          ></span>
        </motion.a>
      </div>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <section className="mt-5 text-center grid sm:grid-cols-1 lg:grid-cols-1 mm3:grid-cols-1 mm3:place-items-center mx-auto max-w-2xl px-3 ">
          {cartEmpty ? (
            <div className="items-center flex justify-center flex-col h-screen">
              <span className="text-indigo-900 text-5xl bg-indigo-300 p-3 rounded-xl">
                <BsCartX />
              </span>
              <p className="font-semibold text-4xl text-indigo-200 mt-4">
                Sorry {displayName}, your cart is empty{" "}
              </p>
              <Link to={"/"}>
                <p className="flex items-center gap-2 text-white text-xl mt-5 bg-indigo-600 cursor-pointer px-2 py-2 rounded-xl transition ease-in hover:bg-indigo-400 hover:text-black ">
                  <AiOutlineHome className="w-6 h-6" /> Back to home
                </p>
              </Link>
            </div>
          ) : (
            cart.map((producto) => (
              <div
                className="mm3:text-sm mm3:overflow-hidden mm3:max-w-xs"
                key={producto.nombre}
              >
                <ItemsCart {...producto} />
              </div>
            ))
          )}
          {cartEmpty ? null : (
            <section className="mb-3 flex justify-center mm3:text-sm mm3:overflow-hidden mm3:w-80 mm3:bottom-0 self-end">
              <div className="mt-8 p-5 bg-gray-100 rounded-lg w-full mm3:bottom-0">
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
          )}
        </section>{" "}
      </motion.section>
    </div>
  );
};

export default Cart;
