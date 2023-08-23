import React, { useEffect } from "react";
import { useContext } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CartContext } from "../context/ShoppingCartContext";

const CartWidget = () => {
  const { cart, setCart } = useContext(CartContext);

  return (
    <>
      <div className="navCart p-1 rounded-md text-3xl cursor-pointer flex text-center">
        <AiOutlineShoppingCart />
        <span className="bg-purple-600 rounded-2xl text-white grid text-sm font-semibold h-5 w-5 place-content-center absolute translate-x-5 -translate-y-2">
          {cart.length}
        </span>
      </div>
    </>
  );
};

export default CartWidget;
