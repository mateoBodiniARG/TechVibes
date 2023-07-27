import React from "react";
import Item from "./Item";

const ItemList = ({productos}) => {
  console.log(productos)
  return (
    <div>
      <Item 
      price="$449" 
      name="Nike Air MX Super 2500 - Red" 
      stars="http://www.w3.org/2000/svg"
      discount="699"
      />

      
    </div>
  );
};

export default ItemList;
