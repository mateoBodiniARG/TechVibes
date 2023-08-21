import React from "react";
import { MdOutlineDescription } from "react-icons/md";
import { Link } from "react-router-dom";

const Item = ({ id, nombre, desc, stock, price, discount, img, categoryId }) => {
  console.log(id)
  return (
    <section className="p-2 ">
      <div className="mt-1 flex flex-col border border-gray-600 bg-gray-800 rounded-xl">
        <Link to={`/item/${id}`}>
          <div className="relative overflow-hidden rounded-xl">
            <img className="object-cover" src={img} alt="product image" />
            {/* <span className="absolute top-2 left-2 rounded-full bg-black px-2 text-sm font-medium text-white">
              {categoryId}
            </span> */}
          </div>
        </Link>

        <div className="mt-4 px-5 pb-5">
          <h5 className="text-xl text-center tracking-wide text-slate-300 font-medium truncate">
            {nombre}
          </h5>
          <div className="mt-2 mb-5 flex items-center justify-center">
            <p>
              <span className="text-3xl font-bold text-slate-400">{price}</span>
              <span className="text-sm text-red-600 line-through ml-2">
                {discount}
              </span>
            </p>
          </div>
          <Link
            to={`/item/${id}`}
            className="gap-1 flex items-center justify-center rounded-md bg-indigo-600 py-2.5 text-center text-base font-medium text-white transition ease-in hover:bg-gray-200 hover:text-black focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <MdOutlineDescription className="h-4 w-4"/>
            <button>See description</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Item;
