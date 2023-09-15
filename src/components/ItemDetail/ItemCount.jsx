import { useState, useContext } from "react";
import { IoAddSharp } from "react-icons/io5";
import { RiSubtractFill } from "react-icons/ri";
import { CartContext } from "../../context/ShoppingCartContext";
import { toast } from "react-toastify";
const ItemCount = ({ producto }) => {
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
    const cartAux = [...cart];
    const yaExiste = cartAux.findIndex((item) => item.id === producto.id);

    if (yaExiste !== -1) {
      cartAux[yaExiste].cantComprar += contador;
    } else {
      const nuevoItem = { ...producto, cantComprar: contador };
      cartAux.push(nuevoItem);
    }

    setCart(cartAux);
    localStorage.setItem("cart", JSON.stringify(cartAux));
    toast.success("Product successfully added!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };

  return (
    <section className="flex gap-7">
      <div className="bg-indigo-700 border rounded-md grid grid-cols-3 place-items-center h-12 overflow-hidden w-40 border-indigo-600 ">
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
          className="bg-blue-500 transition ease-in hover:bg-gray-200 hover:text-black text-white font-semibold h-12 w-40 rounded-lg disabled:cursor-not-allowed disabled:hover:bg-slate-500"
          onClick={addToCart}
          disabled={contador === 0}
        >
          Add to cart
        </button>
      </div>
    </section>
  );
};

export default ItemCount;
