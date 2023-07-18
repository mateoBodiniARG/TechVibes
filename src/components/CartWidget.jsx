import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
const CartWidget = () => {
  return (
    <>
      <div className="navCart p-1 rounded-md text-lg cursor-pointer flex">
        <AiOutlineShoppingCart />
        <p className="text-sm ml-1">3</p>
      </div>
    </>
  );
};

export default CartWidget;
