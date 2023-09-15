import React, { useState, useEffect } from "react";
import ItemDetail from "./ItemDetail";
import { useParams } from "react-router-dom";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Loading from "../Loading/Loading";


const ItemDetailContainer = () => {
  const {id}= useParams()
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const db = getFirestore();

    const oneItem = doc(db, "Productos", `${id}`);
    getDoc(oneItem).then((snapshot) => {
      if (snapshot.exists()) {
        const docs = snapshot.data();
        setProduct({id:snapshot.id, ...docs});
        setLoading(false)
      }
    });
  }, []);
  
  if(loading){
    return <Loading/>
  }
 

  return (
    <div>
      <ItemDetail producto={product} />
    </div>
  );
};

export default ItemDetailContainer;