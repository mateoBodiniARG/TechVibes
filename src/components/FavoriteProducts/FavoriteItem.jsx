import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFavorites } from "../../context/FavoritesContext";
import Item from "../ItemList/Item";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
const FavoriteItem = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const [loading, setLoading] = useState(true);

  const clearFavorites = () => {
    favorites.forEach((item) => removeFromFavorites(item.id));
  };

  useEffect(() => {
    const simulateFetchAsync = () => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    simulateFetchAsync();
  }, []);

  const deleteFavorite = (id) => {
    removeFromFavorites(id);
  };

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <h2 className="text-center text-3xl font-bold mb-4 text-white">
        PRODUCTOS FAVORITOS
      </h2>
      {favorites.length > 0 && (
        <motion.button
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ease-in-out transition-all duration-300 mb-4"
          onClick={clearFavorites}
        >
          Clear Favorites
        </motion.button>
      )}
      <AnimatePresence>
        {loading ? (
          <Loading />
        ) : favorites.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {favorites.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="relative">
                  <Item
                    id={item.id}
                    nombre={item.nombre}
                    stock={item.stock}
                    price={item.price}
                    img={item.img}
                  />
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full transition-all duration-300"
                    onClick={() => deleteFavorite(item.id)}
                  >
                    Eliminar
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center"
          >
            <p className="text-gray-300 text-xl font-semibold mb-4">
              No hay productos favoritos.
            </p>
            <Link to={"/"}>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md ">
                Ir a la tienda
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FavoriteItem;
