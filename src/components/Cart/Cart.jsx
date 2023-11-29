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
          className="relative inline-block mm3:text-base text-lg group cursor-pointer text-white font-semibold"
          onClick={clearCart}
        >
          <motion.button
            variants={{
              hover: {
                scale: 1.1,
                transition: { duration: 0.3 },
              },
            }}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ease-in-out transition-all items-center gap-1 mb-4 flex"
          >
            <MdDeleteForever className="w-6 h-6" />
            Clear cart
          </motion.button>
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
