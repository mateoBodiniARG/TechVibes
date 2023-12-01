import React, { useState } from "react";

const AddProductModal = ({ isOpen, onClose, onAdd }) => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");

  const handleAdd = () => {
    onAdd({
      name: productName,
      description: productDescription,
      price: productPrice,
      category: productCategory,
    });

    setProductName("");
    setProductDescription("");
    setProductPrice("");
    setProductCategory("");
    onClose();
  };

  return (
    <div className={isOpen ? "modal-overlay" : "hidden"}>
      <div className="modal">
        <h2>Agregar Producto</h2>
        <label>Nombre:</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <label>Descripción:</label>
        <textarea
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
        />
        <label>Precio:</label>
        <input
          type="text"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
        <label>Categoría:</label>
        <input
          type="text"
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
        />
        <button onClick={handleAdd}>Agregar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default AddProductModal;
