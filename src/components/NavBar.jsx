import React from "react";
import { useState } from "react";
import CartWidget from "./CartWidget";
import { Link } from "react-router-dom";
import ProfileWidget from "./ProfileWidget";
const NavBar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen((prevState) => !prevState);
  };

  return (
    <nav className="bg-gray-900 border-b-2 border-gray-800 max-w-full">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 mm:justify-center ">
        <div className="flex items-center mm:hidden">
          <Link to={"/"}>
            <img
              src="https://static.vecteezy.com/system/resources/previews/013/643/507/large_2x/colorfull-modern-letter-in-3d-style-text-effect-free-png.png"
              className="h-9 mr-3 mdMAX:hidden"
              alt="TechVibes logo"
            />
          </Link>

          <button
            type="button"
            onClick={toggleSearch}
            data-collapse-toggle="navbar-search"
            className="mr-4 bg-slate-800 inline-flex items-center p-2 w-9 h-9 justify-center text-sm text-gray-200 rounded-md md:hidden"
            aria-controls="navbar-search"
            aria-expanded={isSearchOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          <Link to={"/"}>
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              TechVibes
            </span>
          </Link>
        </div>
        <div className="items-center flex md:order-2 gap-2 mm:gap-11">
          {/* <button
            type="button"
            onClick={toggleSearch}
            data-collapse-toggle="navbar-search"
            aria-controls="navbar-search"
            aria-expanded={isSearchOpen}
            className="md:hidden text-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button> */}
          {/* <div
            className={`relative ${
              isSearchOpen ? "block" : "hidden"
            } md:block sm:hidden`}
          >
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search icon</span>
            </div>
            <input
              type="text"
              id="search-navbar"
              className=" block w-full p-2 pl-10 text-sm  border rounded-lg  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search..."
            />
          </div> */}

          <Link to={"/profile"}>
            <div className="cartWidget ml-1 text-white">
              <ProfileWidget />
            </div>
          </Link>

          <Link to={"/cart"}>
            <div className="cartWidget ml-1 text-white">
              <CartWidget />
            </div>
          </Link>
         
        </div>
        <div
          className={`items-center justify-between ${
            isSearchOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
          id="navbar-search"
        >
          {/* <div className="relative mt-3 md:hidden">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block w-full p-2 pl-10 text-sm  border rounded-lg  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search..."
            />
          </div> */}
          <ul className="mdMAX:border-2 flex flex-col md:flex-row md:space-x-4 md:mt-0 mt-4 font-medium text-white bg-gray-800 md:bg-gray-900 border-gray-700 rounded-lg">
            <li className="mdMAX:border-2 border-gray-700 bg-slate-900 rounded-md m-2 hover:text-white md:py-2 md:px-4 py-3 px-6">
              <Link to={"/category/Headsets"}>Headsets</Link>
            </li>
            <li className="mdMAX:border-2 border-gray-700 bg-slate-900 rounded-md m-2 hover:text-white md:py-2 md:px-4 py-3 px-6">
              <Link to={"/category/Keyboards"}>Keyboards</Link>
            </li>
            <li className="mdMAX:border-2 border-gray-700 bg-slate-900 rounded-md m-2 hover:text-white md:py-2 md:px-4 py-3 px-6">
              <Link to={"/category/Gaming Chairs"}>Gaming Chairs</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
