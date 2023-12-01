import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  getFirestore,
  doc,
  getDocs,
  collection,
  deleteDoc,
} from "firebase/firestore";
import Loading from "../Loading/Loading";

const Admin = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const db = getFirestore();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const verificarRol = async () => {
      if (auth.user) {
        const docRef = doc(db, `users/${auth.user.uid}`);
        const docSnap = await getDocs(docRef);

        if (docSnap.size > 0) {
          const isAdmin = docSnap.docs[0].data().admin;
          console.log("Valor de admin:", isAdmin);

          if (isAdmin === true) {
            console.log("Usuario administrador");
            setIsAdmin(true);
          } else {
            console.log("No es un usuario administrador");
            navigate("/");
          }
        }
      }
    };

    if (auth.user !== null) {
      verificarRol();
    }
  }, [auth.user, navigate, db]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const ordersCollection = collection(db, "Productos");
        const querySnapshot = await getDocs(ordersCollection);
        const allProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(allProducts);
        console.log(allProducts);
      } catch (error) {
        console.error("Error al obtener productos:", error.message);
      }
    };

    getProducts();
  }, [auth.user, db]);

  useEffect(() => {
    setLoading(false);
  }, [loading]);

  const handleDeleteProduct = async (productId) => {
    try {
      const productRef = doc(db, "Productos", productId);
      await deleteDoc(productRef);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
    } catch (error) {
      console.error("Error al eliminar el producto:", error.message);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="container mx-auto my-8">
      <div className="flex justify-center mb-6">
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Nombre</th>
              <th className="py-2 px-4 border-b">Precio</th>
              <th className="py-2 px-4 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="py-2 px-4 border-b">{product.nombre}</td>
                <td className="py-2 px-4 border-b">{product.price}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => navigate(`/editar/${product.id}`)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
