import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";

const CartWidget = () => {
  return (
    <>
      <div className="navCart p-1 rounded-md text-xl cursor-pointer flex text-center">
        <AiOutlineShoppingCart />
        <span className="bg-purple-700 rounded-2xl text-white grid text-xs font- h-4 place-content-center absolute w-4 translate-x-4 -translate-y-2">3</span>
      </div>
    </>
  );
};

export default CartWidget;
