import React from 'react'
import ItemList from './ItemList'

const ItemListContainer = () => {
  
  const productos = [
    { id: 1, nombre: "Producto A", description: "Desc prodcuto A", stock: 5 },
    { id: 2, nombre: "Producto B", description: "Desc prodcuto B", stock: 9 },
    { id: 3, nombre: "Producto C", description: "Desc prodcuto C", stock: 2 },
  ];

  const getProductos = () => {
    return new Promise((resolve, reject) => {
      if (productos.length === 0) {
        reject(new Error("No se hay productos"));
      }
      setTimeout(() => {
        resolve(productos);
      }, 3000);
    });
  };

  console.log(getProductos());

  async function fetchingProducts() {
    try {
      const productosFetched = await getProductos();
      console.log(productosFetched);
    } catch (error) {
      console.error(error);
    }
  }

  fetchingProducts();

    return (
      <div>
        <p className='text-white font-bold flex justify-center content-center mt-1 text-lg'></p>
        <ItemList
        productos = {productos}
        />
      </div>
  )
}

export default ItemListContainer
