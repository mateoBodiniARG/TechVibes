// ProductItem.js
import React from "react";

const ProductItem = ({ product, onEdit, onDelete }) => {
  return (
    <div className="product-item">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Precio: {product.price}</p>
      <p>Categoría: {product.category}</p>
      <button onClick={onEdit}>Editar</button>
      <button onClick={onDelete}>Eliminar</button>
    </div>
  );
};

export default ProductItem;
