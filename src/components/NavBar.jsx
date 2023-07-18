import React from "react";
import CartWidget from "./CartWidget";

const NavBar = () => {
  return (
    <nav className="bg-gray-900 shadow-lg border-b-2 border-gray-900">
      <div className="navContent text-white font-semibold flex justify-around p-3 items-center content-center">
        <div className="navLogo">
          <a href="">TechVibes</a>
        </div>
        <ul className="navCategories flex gap-5 cursor-pointer text-gray-400 text-base ">
          <li className="px-2 rounded-md hover:text-gray-300">Monitors</li>
          <li className="px-2 rounded-md hover:text-gray-300">Graphics Cards</li>
          <li className="px-2 rounded-md hover:text-gray-300">Keyboards</li>
        </ul>
      <CartWidget/>
      </div>
    </nav>
  );
};

export default NavBar;
