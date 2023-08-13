import React, { useContext } from 'react'
import { CartContext } from '../context/ShoppingCartContext'

const ItemsCart = ({id, nombre, desc, stock, price, discount, img, category, cantComprar}) => {
  
  return (
    <section className="p-2">
      <div className="mt-1 flex border border-gray-600 bg-slate-950 rounded-xl">
          <div className="relative overflow-hidden rounded-xl">
            <img className="object-cover w-60 p-2 rounded-2xl" src={img} alt="product image" />
          </div>

        <div className="mt-4 px-5 pb-5">
          <h5 className="text-3xl text-center tracking-wide text-slate-300 font-medium">
            {nombre}
          </h5>
          <div className="mt-4 mb-5 flex items-center justify-center gap-2">
              <span className="text-2xl font-bold text-slate-50">${price}</span>
              <p className="text-lg font-normal text-slate-400">x {cantComprar}u.</p>
          </div>
                   
        </div>
      </div>
    </section>
  )
}

export default ItemsCart