import React, { useContext, useEffect, useState } from "react";
import ItemCount from "./ItemCount";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { useFavorites } from "../../context/FavoritesContext";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const ItemDetail = ({ product }) => {
  // Verificar si el usuario esta autenticado, sino mostrar mensaje de que debe loguearse
  const { user } = useAuth();

  return (
    <div className="flex justify-center items-center lg:h-screen">
      <div className="max-w-7xl mx-auto px-4 py-5 lg:rounded-2xl shadow-2xl bg-gray-800 lg3:bg-transparent xl2:max-w-6xl lg2:max-w-5xl">
        <div className="grid lg3:grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:bg-gray-900 lg:bg-transparent p-4 rounded-2xl max-w-xl">
            <img className="rounded-2xl w-full" src={product.img} alt="" />
          </div>
          <div className="flex flex-col justify-center items-start">
            <span className="text-white font-medium text-base bg-indigo-700 uppercase rounded-md px-3 mb-4">
              {product.categoryId}
            </span>
            <h1 className="text-3xl font-bold text-white uppercase mb-6">
              {product.nombre}
            </h1>
            <p className="text-gray-400 font-normal text-lg mb-7">
              {product.description}
            </p>
            <div className="flex items-center mb-2">
              <span className="text-4xl text-green-400 font-bold mr-2">
                ${product.price}
              </span>
              <span className="text-base pt-2 font-medium text-gray-500">
                Stock:{" "}
                <span
                  className={
                    product.stock <= 10 ? "text-yellow-400" : "text-gray-300"
                  }
                >
                  {product.stock}
                </span>
              </span>
            </div>

            <div className="flex justify-center items-center mt-2">
              <ItemCount producto={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
