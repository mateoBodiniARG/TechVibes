import React, { useEffect, useContext } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CartContext } from "../../context/ShoppingCartContext";

const CartWidget = () => {
  const { cart } = useContext(CartContext);
  const totalItemsInCart = cart.reduce((total, item) => total + item.cantComprar, 0);

  useEffect(() => {
    localStorage.setItem("cartNumber", JSON.stringify(totalItemsInCart));
  }, [cart]);

  return (
    <div className="navCart p-1 rounded-md text-3xl cursor-pointer flex text-center">
      <AiOutlineShoppingCart />
      <span className="bg-purple-600 rounded-2xl text-white grid text-sm font-semibold h-5 w-5 place-content-center absolute translate-x-5 -translate-y-2">
        {totalItemsInCart}
      </span>
    </div>
  );
};

export default CartWidget;
