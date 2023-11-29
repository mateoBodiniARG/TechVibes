import { useState, useContext, useEffect } from "react";
import { IoAddSharp } from "react-icons/io5";
import { RiSubtractFill } from "react-icons/ri";
import { CartContext } from "../../context/ShoppingCartContext";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { useFavorites } from "../../context/FavoritesContext";
import { IoMdHeart } from "react-icons/io";
import { IoIosHeartEmpty } from "react-icons/io";
import { motion } from "framer-motion";
const ItemCount = ({ producto }) => {
  const { cart, setCart } = useContext(CartContext);
  const { user } = useAuth();
  const [contador, setContador] = useState(1);
  const [favorito, setFavorito] = useState(false);
  const { addToFavorites, removeFromFavorites, favorites } = useFavorites();

  const sumar = () => {
    setContador((prevContador) => prevContador + 1);
  };

  const restar = () => {
    setContador((prevContador) => prevContador - 1);
  };

  const addToCart = () => {
    if (!user) {
      toast.error("Debe ingresar para poder añadir productos al carrito", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      return;
    }

    const cartAux = [...cart];
    const yaExiste = cartAux.findIndex((item) => item.id === producto.id);

    if (yaExiste !== -1) {
      cartAux[yaExiste].cantComprar += contador;

      if (cartAux[yaExiste].cantComprar > producto.stock) {
        cartAux[yaExiste].cantComprar = producto.stock;

        setCart(cartAux);

        try {
          localStorage.setItem("cart", JSON.stringify(cartAux));
        } catch (error) {
          console.error("Error al guardar en el almacenamiento local:", error);
        }

        toast.error("Haz llegado al máximo de stock!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        return;
      }
    } else {
      const nuevoItem = { ...producto, cantComprar: contador };
      cartAux.push(nuevoItem);
    }

    setCart(cartAux);

    try {
      localStorage.setItem("cart", JSON.stringify(cartAux));
    } catch (error) {
      console.error("Error al guardar en el almacenamiento local:", error);
    }

    toast.success("Producto agregado con éxito!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };

  const handleToggleFavorito = () => {
    if (!user) {
      toast.error("Debe ingresar para poder añadir productos a favorito", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      return;
    }

    if (favorito) {
      removeFromFavorites(producto.id);
    } else {
      addToFavorites(producto);
    }
    setFavorito(!favorito);
  };

  useEffect(() => {
    setFavorito(favorites.some((item) => item.id === producto.id));
  }, [favorites, producto]);

  return (
    <section>
      <section className="gap-3 items-center mm:justify-center flex flex-col mm3:gap-0">
        <section className="flex gap-3">
          <div className="bg-indigo-700 border rounded-md grid grid-cols-3 place-items-center h-12 overflow-hidden w-40 border-indigo-600 ">
            <button
              className={"disabled:cursor-not-allowed text-white "}
              onClick={restar}
              disabled={contador === 1}
            >
              <RiSubtractFill
                className={` ${
                  contador === 1 ? "text-gray-400" : "text-white"
                } hover:text-gray-400 h-6 w-6`}
              />
            </button>

            <span className="col-span-1 text-xl text-white font-semibold">
              {contador}
            </span>

            <button
              className="border-none text-white cursor-pointer grid place-content-center h-full outline-none text-base hover:text-gray-400 disabled:cursor-not-allowed"
              onClick={sumar}
              disabled={contador === producto.stock}
            >
              <IoAddSharp className="h-6 w-6" />
            </button>
          </div>
          <div className="flex justify-center items-center gap-7">
            <button
              className="bg-blue-500 transition ease-in hover:bg-gray-200 hover:text-black text-white font-semibold h-12 w-40 rounded-lg disabled:cursor-not-allowed disabled:hover:bg-slate-500"
              onClick={addToCart}
            >
              Add to cart
            </button>
          </div>
        </section>

        <section className="bg-slate-950 py-1 w-full rounded-md px-3 mm3:rounded-md mm3:py-2 mm3:mt-3 mm3:bg-slate-950">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleToggleFavorito}
            className="flex items-center justify-center text-center w-full h-full"
          >
            {favorito ? (
              <IoMdHeart className="text-4xl text-red-500" />
            ) : (
              <IoIosHeartEmpty className="text-4xl text-red-500" />
            )}
          </motion.button>
        </section>
      </section>
    </section>
  );
};

export default ItemCount;
