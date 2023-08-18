import { useEffect, useState } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const Document = () => {
  const [product, setProduct] = useState([]);
  console.log(product);
  
  useEffect(() => {
    const db = getFirestore();

    const oneItem = doc(db, "Productos", "3grLhhB90SMsVMZCjvKW");
    getDoc(oneItem).then((snapshot) => {
      if (snapshot.exists()) {
        const docs = snapshot.data();
        setProduct(docs);
      }
    });
  }, []);

  return (
    <div className="text-white">
      <h1>Producto</h1>
      {
        <div>
            <h3>Producto: {product.nombre}</h3>
            <h4>Categoria: {product.categoryId}</h4>
        </div>
      }
    </div>
  );
};

export default Document;
