import React from "react";
import ItemCount from "./ItemCount";
const ItemDetail = ({ producto }) => {  
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="container mx-auto px-4 py-8 rounded-2xl shadow-2xl bg-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="xl:bg-gray-900 bg-transparent p-4 rounded-2xl max-w-xl">
            <img className="rounded-2xl w-full" src={producto.img} alt="" />
          </div>
          <div className="flex justify-around flex-col">
            <span className="text-white font-medium text-base bg-indigo-700 uppercase rounded-md px-2 text-center w-28">
              {producto.categoryId}
            </span>
            <h1 className="text-3xl font-bold text-white uppercase">
              {producto.nombre}
            </h1>
            <p className="text-gray-300 font-semibold text-lg">{producto.description}</p>

            {/*---------------------------------- En un futuro hacer uso de este codigo para el manejo del stock ----------------------------------*/}
            {/* <div className="flex gap-1 mt-11 items-center mb-4">
              <span className="text-gray-400 font-semibold text-base flex">
                Stock disponible:
              </span>
              <span className="text-gray-200 font-bold text-xl">
                {producto.stock}
              </span>
            </div> */}

            <div className="flex">
              <span className="text-4xl text-green-400 font-bold">
                ${producto.price}
              </span>
              <span className="text-lg text-red-400 font-semibold ml-2 line-through">
                ${producto.discount}
              </span>
            </div>
            <div className="flex justify-center items-center mt-4 gap-7">
                <ItemCount producto={producto}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
