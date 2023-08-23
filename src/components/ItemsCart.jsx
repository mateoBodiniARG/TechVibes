import React, { useContext, useState } from "react";
import { CartContext } from "../context/ShoppingCartContext";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { IoAddSharp } from "react-icons/io5";
import { RiSubtractFill } from "react-icons/ri";
import { toast } from 'react-toastify';


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
    const cartAux = [...cart];
    const cartActualizado = cartAux.filter((item) => item.id !== id);
    setCart(cartActualizado);
    toast.success('Item deleted to cart successfully!', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };


  // const sumar = () => {
  //   setContador(contador + 1);
  // };

  // const restar = () => {
  //   if (contador <= 1) {
  //     alert("No puedes tener menos de 1 producto");
  //   } else setContador(contador - 1);
  // };

  const updateCartSum = () => {
    const cartAuxActualizado = [...cart];
    const itemIndex = cartAuxActualizado.findIndex((item) => item.id === id);

    if (itemIndex !== -1) {
      cartAuxActualizado[itemIndex].cantComprar = contador + 1

      setCart(cartAuxActualizado);
      setContador(contador + 1);
    }
  };

  const updateCartRest = () =>{
    const cartAuxActualizado = [...cart];
    const itemIndex = cartAuxActualizado.findIndex((item) => item.id === id);

    if(itemIndex !== -1){
      cartAuxActualizado[itemIndex].cantComprar = contador - 1
      setCart(cartAuxActualizado)
      setContador(contador - 1);
    }
  }
  return (
    <section className="my-4">
      <div className="flex border rounded-xl bg-gray-900 p-6 container text-white">
        <Link to={`/item/${id}`}>
          <div className="w-32 h-32 overflow-hidden rounded-xl">
            <img
              className="object-cover w-full h-full rounded-2xl"
              src={img}
              alt="product image"
            />
          </div>
        </Link>

        <div className="ml-4">
          <h5 className="text-xl font-semibold mb-2">{nombre}</h5>

          <div className="flex items-center mb-2">
            <span className="text-2xl font-bold text-indigo-100">${price}</span>
            <p className="text-lg text-gray-400 ml-2">
              x {cantComprar} u.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-indigo-600 w-32 justify-between  rounded-lg">
            <button
              className={`${
                contador === 1
                  ? "cursor-not-allowed text-gray-400"
                  : "text-white hover:text-gray-400"
              } bg-indigo-600 rounded-md h-8 w-8 flex justify-center items-center`}
              onClick={()=>{
                updateCartRest(); 
                
              }}
              disabled={contador === 1}
            >
              <RiSubtractFill className="h-4 w-4" />
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
              <IoAddSharp className="h-4 w-4" />
            </button>
          </div>
        </div>

        <button className="ml-auto text-gray-700" onClick={deleteProduct}>
          <RxCross1 className="h-9 w-9 hover:text-red-500 text-gray-300" />
        </button>
      </div>
    </section>
  );
};

export default ItemsCart;
