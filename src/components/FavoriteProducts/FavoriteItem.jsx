import React, { useEffect, useState } from "react";
import { useFavorites } from "../../context/FavoritesContext";
import Item from "../ItemList/Item";
import Loading from "../Loading/Loading";

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
      }, 1500);
    };

    simulateFetchAsync();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <h2 className="text-center text-3xl font-bold mb-4 text-white">
        PRODUCTOS FAVORITOS
      </h2>
      {favorites.length > 0 && (
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ease-in-out transition-all duration-300 mb-4"
          onClick={clearFavorites}
        >
          Clear Favorites
        </button>
      )}
      {loading ? (
        <Loading />
      ) : favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {favorites.map((item) => (
            <div key={item.id}>
              <Item
                id={item.id}
                nombre={item.nombre}
                stock={item.stock}
                price={item.price}
                img={item.img}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-white flex justify-center ">
          No hay productos agregados a favoritos.
        </p>
      )}
    </div>
  );
};

export default FavoriteItem;
