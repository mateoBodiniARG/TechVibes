import { useState, useContext } from "react";
import { IoAddSharp } from "react-icons/io5";
import { RiSubtractFill } from "react-icons/ri";
import { CartContext } from "../context/ShoppingCartContext";
import { useEffect } from "react";
const ItemCount = ({producto}) => {

  
  const { cart, setCart } = useContext(CartContext);

  const [contador, setContador] = useState(0);

  const sumar = () => {
    setContador(contador + 1);
  };
  const restar = () => {
    if (contador <= 0) {
      alert("Ha llegado al numero minimo de productos");
    } else setContador(contador - 1);
  };

  const addToCart = () => {
    const cartAux = cart
    for (let index = 0; index < contador; index++) {
        cartAux.push(producto)
    }
    setCart(cartAux)
  };

  

  return (
    <section className="flex gap-7">
      <div className="bg-indigo-700 border rounded-md grid grid-cols-3 place-items-center h-10 overflow-hidden w-40 border-indigo-600 ">
        <button
          className={"disabled:cursor-not-allowed text-white "}
          onClick={restar}
          disabled={contador === 0}
        >
          <RiSubtractFill
            className={` ${
              contador === 0 ? "text-gray-400" : "text-white"
            } hover:text-gray-400 h-6 w-6`}
          />
        </button>

        <span className="col-span-1 text-xl text-white font-semibold">
          {contador}
        </span>

        <button
          className="border-none text-white cursor-pointer grid place-content-center h-full outline-none text-base hover:text-gray-400"
          onClick={sumar}
        >
          <IoAddSharp className="h-6 w-6" />
        </button>
      </div>

      <div className="flex justify-center items-center gap-7">
        <button
          className="bg-blue-500 transition ease-in hover:bg-gray-200 hover:text-black text-white font-semibold h-10 w-40 rounded-lg"
          onClick={addToCart}
        >
          Add to cart
        </button>
      </div>
    </section>
  );
};

export default ItemCount;
