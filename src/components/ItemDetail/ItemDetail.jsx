import React from "react";
import ItemCount from "./ItemCount";
import { motion } from "framer-motion";

const ItemDetail = ({ product }) => {
  return (
    <motion.div
      className="flex justify-center items-center lg:h-screen"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="max-w-6xl px-4 py-5 lg:rounded-2xl shadow-2xl bg-gray-800 mdMAX:shadow-none lg3:bg-transparent xl2:max-w-6xl xl2:mx-7 lg2:max-w-5xl">
        <div className="grid lg3:grid-cols-1 md:grid-cols-2 gap-6 mdMAX:gap-3">
          <div className="flex justify-center">
            <div className="md:bg-gray-900 lg:bg-transparent p-4 rounded-2xl max-w-xl ">
              <img
                className="rounded-2xl w-full mdMAX:w-96"
                src={product.img}
                alt=""
              />
            </div>
          </div>

          <div className="flex flex-col justify-center items-start mdMAX:items-center">
            <span className="text-white font-medium text-base bg-indigo-700 uppercase rounded-md px-3 mb-4">
              {product.categoryId}
            </span>
            <h1 className="text-3xl font-bold text-white uppercase mb-4 mdMAX:text-xl">
              {product.nombre}
            </h1>
            <p className="text-gray-400 font-normal text-lg mb-5 mdMAX:text-center mdMAX:text-base ">
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
    </motion.div>
  );
};

export default ItemDetail;
