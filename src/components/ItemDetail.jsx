import React from "react";
import { useParams } from "react-router-dom";
const ItemDetail = ({ productos }) => {
  const { id } = useParams();
  console.log(id);

  
  return <div>
    {productDetailFilter.map((product)=>{
      return(
        <div key={product.id}>
        
        </div>
      )
    })}
  </div>;
};

export default ItemDetail;
