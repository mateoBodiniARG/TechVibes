import React from 'react';
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const FinalizePurchase = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-gray-800 mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <div className="h-14 w-14 bg-green-400 rounded-full flex flex-shrink-0 justify-center items-center text-green-700 text-2xl font-mono">
                <IoIosCheckmarkCircleOutline className='w-8 h-8'/>
              </div>
              <div className="block pl-2 font-semibold text-xl self-start">
                <h2 className="leading-relaxed">You are just one click away!</h2>
                <p className="text-sm text-gray-500 font-normal leading-relaxed">Complete the fields to finalize the purchase.</p>
              </div>
            </div>
            <div className="divide-y divide-gray-700">
              <div className="py-9 space-y-4">

                <div className="flex flex-col">
                  <label className="leading-loose">Full name</label>
                  <input
                    type="text"
                    className="text-black font-semibold rounded-md"
                    placeholder="Your full name"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="leading-loose">Phone</label>
                  <input
                    type="text"
                    className="text-black font-semibold rounded-md"
                    placeholder="123-456-789"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="leading-loose">Email</label>
                  <input
                    type="text"
                    className="text-black font-semibold rounded-md"
                    placeholder="example@gmail.com"
                  />
                </div>
              </div>
              <div className="pt-4 flex items-center space-x-4">
                <button className="bg-blue-500 transition ease-in hover:bg-blue-700 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">Finalize purchase</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalizePurchase;
