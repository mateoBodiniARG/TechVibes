import React, { useContext, useState } from "react";
import { CartContext } from "../../context/ShoppingCartContext";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { IoAddSharp } from "react-icons/io5";
import { RiSubtractFill } from "react-icons/ri";
import { toast } from "react-toastify";

const ItemsCart = ({
  id,
  nombre,
  desc,
  stock,
  price,
  discount,
  img,
  category,
  cantComprar,
  productos,
}) => {
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

  const updateCartSum = () => {
    const cartActualizado = [...cart];
    const itemIndex = cartActualizado.findIndex((item) => item.id === id);

    if (itemIndex !== -1) {
      cartActualizado[itemIndex].cantComprar = contador + 1;

      setCart(cartActualizado);
      setContador(contador + 1);
    }
  };

  const updateCartRest = () => {
    const cartActualizado = [...cart];
    const itemIndex = cartActualizado.findIndex((item) => item.id === id);

    if (itemIndex !== -1) {
      cartActualizado[itemIndex].cantComprar = contador - 1;
      setCart(cartActualizado);
      setContador(contador - 1);
    }
  };

  return (
    <section className="my-4">
      <div className="flex bg-gray-800 text-white p-6 rounded-lg m8Max:">
        <Link to={`/item/${id}`} className="flex-shrink-0">
          <div className="w-32 h-32 overflow-hidden rounded-lg">
            <img
              className="object-cover w-full h-full rounded-lg"
              src={img}
              alt="product image"
            />
          </div>
        </Link>

        <div className="ml-4 flex-1 truncate overflow-hidden whitespace-nowrap">
          <h5 className="text-xl font-semibold mb-2">{nombre}</h5>
          <div className="flex items-center mb-2">
            <span className="text-2xl font-bold">${price}</span>
            <p className="text-lg text-gray-400 ml-2">x {cantComprar} u.</p>
          </div>

          <div className="flex items-center gap-2 bg-indigo-600 w-32 justify-between  rounded-lg">
            <button
              className={`${
                contador === 1
                  ? "cursor-not-allowed text-gray-400"
                  : "text-white hover:text-gray-400"
              } bg-indigo-600 rounded-md h-8 w-8 flex justify-center items-center`}
              onClick={() => {
                updateCartRest();
              }}
              disabled={contador === 1}
            >
              <RiSubtractFill className="h-5 w-5" />
            </button>

            <span className="text-lg font-semibold text-gray-100">
              {contador}
            </span>

            <button
              className="text-white bg-indigo-600 rounded-md h-8 w-8 flex justify-center items-center hover:text-gray-400"
              onClick={() => {
                updateCartSum();
              }}
            >
              <IoAddSharp className="h-5 w-5" />
            </button>
          </div>
        </div>

        <button className="ml-auto text-white">
          <RxCross1
            className="h-7 w-7 hover:text-red-500"
            onClick={deleteProduct}
          />
        </button>
      </div>
    </section>
  );
};

export default ItemsCart;
