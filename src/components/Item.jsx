import React from "react";
import { MdOutlineDescription } from "react-icons/md";
import { Link } from "react-router-dom";

const Item = ({ id, nombre, desc, stock, price, discount, img, category }) => {
  return (
    <section className="p-2">
      <div className="mt-1 flex flex-col border border-gray-600 bg-gray-800 rounded-xl">
        <div className="relative overflow-hidden rounded-xl">
          <a href="#">
            <img className="object-cover" src={img} alt="product image" />
            <span className="absolute top-2 left-2 rounded-full bg-black px-2 text-sm font-medium text-white">
              {category}
            </span>
          </a>
        </div>
        <div className="mt-4 px-5 pb-5">
          <h5 className="text-xl text-center tracking-wide text-slate-300 font-medium">
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
          <div className="flex items-center justify-center rounded-md bg-slate-900 py-2.5 text-center text-sm font-medium text-white transition ease-in hover:bg-gray-200 hover:text-black focus:outline-none focus:ring-4 focus:ring-blue-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <Link to={`/cart`}>Add to cart</Link>
          </div>

          <Link
            to={`/item/${id}`}
            className="flex mt-2 items-center justify-center rounded-md bg-indigo-600 py-2.5 text-center text-sm font-medium text-white transition ease-in hover:bg-indigo-400 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <MdOutlineDescription />
            <button>See description</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Item;
