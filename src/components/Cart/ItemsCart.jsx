import React, { useContext, useState } from "react";
import { CartContext } from "../../context/ShoppingCartContext";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { IoAddSharp } from "react-icons/io5";
import { RiSubtractFill } from "react-icons/ri";
import { toast } from "react-toastify";

const ItemsCart = ({ id, nombre, price, img, cantComprar, stock }) => {
  const { cart, setCart } = useContext(CartContext);
  const [contador, setContador] = useState(cantComprar);

  const deleteProduct = () => {
    const cartActualizado = cart.filter((item) => item.id !== id);
    setCart(cartActualizado);
    toast.success("Item eliminado con éxito!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };

  const updateCart = (cantidad) => {
    const cartActualizado = [...cart];
    const itemIndex = cartActualizado.findIndex((item) => item.id === id);

    if (itemIndex !== -1) {
      cartActualizado[itemIndex].cantComprar = contador + cantidad;

      setCart(cartActualizado);
      setContador(contador + cantidad);
    }
  };

  return (
    <div className="flex mm3:flex-col flex-row justify-between items-center bg-gray-800 p-5 mm3:p-3 rounded-md shadow-md mb-4">
      <div className="flex items-center mm3:flex-col">
        <img
          src={img}
          alt={nombre}
          className="w-28 h-28 object-cover rounded-md mm3:w-60 mm3:h-60"
        />
        <div className="ml-4 mm3:mt-3 mm3:ml-0   mm3:items-center mm3:text-center">
          <h2 className="text-lg font-semibold text-white mm3:mb-2">
            {nombre}
          </h2>
          <p className="text-lg text-gray-200 font-medium ml-3">
            ${price}{" "}
            <span className="text-sm text-gray-500 ">x{cantComprar}</span>
          </p>
        </div>
      </div>
      <div className="flex items-center mt-4 sm:mt-0">
        <div className=" flex items-center justify-between bg-gray-700 border border-gray-950 px-2 py-2 w-32 rounded-md">
          <button
            className="text-white focus:outline-none disabled:cursor-not-allowed "
            onClick={() => updateCart(-1)}
            disabled={contador === 1}
          >
            <RiSubtractFill
              className={` ${
                contador === 1 ? "text-gray-500" : "text-white"
              } hover:text-gray-400 h-6 w-6 `}
            />
          </button>
          <span className="text-white">{contador}</span>
          <button
            className="text-white focus:outline-none disabled:cursor-not-allowed"
            onClick={() => updateCart(1)}
            disabled={contador === stock}
          >
            <IoAddSharp
              className={` ${
                contador === stock ? "text-gray-400" : "text-white"
              } hover:text-gray-400 h-6 w-6`}
            />
          </button>
        </div>
        <button
          className="text-white ml-6 focus:outline-none"
          onClick={deleteProduct}
        >
          <RxCross1 className="h-6 w-6 hover:text-red-500" />
        </button>
      </div>
    </div>
  );
};

export default ItemsCart;
