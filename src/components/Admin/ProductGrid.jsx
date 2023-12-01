import React from "react";
import ProductItem from "./ProductItem";

const ProductGrid = ({ products, onEdit, onDelete }) => {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onEdit={() => onEdit(product.id)}
          onDelete={() => onDelete(product.id)}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
