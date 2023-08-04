import React, { useState, useEffect } from "react";
import ItemDetail from "./ItemDetail";
import { getProductosById } from "./data/AsyncMock";
import { useParams } from "react-router-dom";
const ItemDetailContainer = () => {
  const [producto, setProducto]= useState({})
  const {id}= useParams()
  
  useEffect(() => {
    getProductosById(id)
      .then((res) => {
        setProducto(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div>
      <ItemDetail producto={producto} />
    </div>
  );
};

export default ItemDetailContainer;