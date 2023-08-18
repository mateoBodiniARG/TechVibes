import React, { useContext, useState } from "react";
import { CartContext } from "../context/ShoppingCartContext";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { IoAddSharp } from "react-icons/io5";
import { RiSubtractFill } from "react-icons/ri";

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

  const deleteProduct = () => {
    const cartAux = [...cart];
    const cartActualizado = cartAux.filter((item) => item.id !== id);
    setCart(cartActualizado);
  };

  const [contador, setContador] = useState(0);

  const sumar = () => {
    setContador(contador + 1);
  };
  const restar = () => {
    if (contador <= 0) {
      alert("Ha llegado al numero minimo de productos");
    } else setContador(contador - 1);
  };

  return (
    <section>
      <div className="mt-1 flex border border-gray-600 rounded-xl bg-slate-950">
        <Link to={`/item/${id}`}>
          <div className="relative overflow-hidden rounded-xl w-64">
            <img
              className="object-cover w-full  rounded-2xl"
              src={img}
              alt="product image"
            />
          </div>
        </Link>

        <div className="mt-4 px-5 pb-5">
          <h5 className="text-3xl text-center tracking-wide text-slate-300 font-medium">
            {nombre}
          </h5>

            
          <div className="mt-4 mb-5 flex items-center justify-center gap-2">       
            <span className="text-2xl font-bold text-slate-50">${price}</span>
            <p className="text-lg font-normal text-slate-400">
              x {cantComprar}u.
            </p>

            {/* -------------------------------------- SUMAR RESTAR BUTTON SECTION -------------------------------------- */}
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
      
            
            <button onClick={deleteProduct}>
              <RxCross1 className="h-7 w-7 text-white" />
            </button>
          
          
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItemsCart;
