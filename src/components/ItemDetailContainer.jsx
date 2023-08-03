import React, { useState, useEffect } from "react";
import ItemDetail from "./ItemDetail";
const ItemDetailContainer = () => {
  
  
  useEffect(() => {
    getProductos()
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div>
      <ItemDetail productos={productos} />
    </div>
  );
};

export default ItemDetailContainer;
