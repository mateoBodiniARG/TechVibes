import React, { useEffect } from "react";
import { useContext } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CartContext } from "../context/ShoppingCartContext";

const CartWidget = () => {
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  return (
    <>
      <div className="navCart p-1 rounded-md text-3xl cursor-pointer flex text-center">
        <AiOutlineShoppingCart />
        <span className="bg-purple-700 rounded-2xl text-white grid text-sm h-5 place-content-center absolute w-4 translate-x-5 -translate-y-2">
          {cart.length}
        </span>
      </div>
    </>
  );
};

export default CartWidget;
