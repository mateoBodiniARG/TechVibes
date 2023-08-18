import React, { useState, useEffect } from "react";
import ItemDetail from "./ItemDetail";
import { useParams } from "react-router-dom";
import { doc, getDoc, getFirestore } from "firebase/firestore";

//Arreglar id,
const ItemDetailContainer = () => {
  const {id}= useParams()
  console.log(id)
  const [product, setProduct] = useState([]);
  console.log(product);
  
  useEffect(() => {
    const db = getFirestore();

    const oneItem = doc(db, "Productos", `${id}`);
    getDoc(oneItem).then((snapshot) => {
      if (snapshot.exists()) {
        const docs = snapshot.data();
        setProduct(docs);
      }
    });
  }, []);
  

 

  return (
    <div>
      <ItemDetail producto={product} />
    </div>
  );
};

export default ItemDetailContainer;