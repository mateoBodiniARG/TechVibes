import React,{useState, useEffect} from 'react'
import ItemList from './ItemList'
import { useParams } from 'react-router-dom'
import { getProductos, getProductosByCategory } from './data/AsyncMock'

const ItemListContainer = () => {
  const [productos, setProductos]=useState([])
  const {category} = useParams()
 
  
 useEffect(()=>{
 const asyncFunction = category ? getProductosByCategory : getProductos
  asyncFunction(category)
  .then((res)=>{
    setProductos(res)
  })
  .catch((error)=>{
    console.log(error)
  })
 },[category])
  
  
    return (
      <>
        <h1 className="text-center text-white font-semibold text-4xl my-3">Products available</h1>
        <ItemList
        productos = {productos}
        />
      </>
  )
}

export default ItemListContainer