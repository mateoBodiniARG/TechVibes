import React from 'react'
import ItemList from './ItemList'
import ItemDetailContainer from './ItemDetailContainer'
import { useParams } from 'react-router-dom'

const ItemListContainer = () => {
  
  const {category} = useParams()
 
  
  getProductos()
  .then((res)=>{
    console.log(res)
  })
  .catch((error)=>{
    console.log(error)
  })
  
  
    return (
      <>
        <h1 className="text-center text-white font-semibold text-4xl my-3">Products available</h1>
        <ItemList
        productos = {productos}
        />
        <ItemDetailContainer
        productos = {productos}
        />
      </>
  )
}

export default ItemListContainer
