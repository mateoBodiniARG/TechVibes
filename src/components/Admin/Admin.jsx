import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  getFirestore,
  doc,
  getDocs,
  getDoc,
  collection,
  deleteDoc,
} from "firebase/firestore";
import Loading from "../Loading/Loading";
import { IoIosAddCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";

const Admin = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const db = getFirestore();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState([]);
  const [encontrado, setEncontrado] = useState([]);
  const displayName = auth.user ? auth.user.displayName : null;

  // Búsqueda de productos
  const filtradoPorNombre = (nombre) => {
    if (nombre) {
      const encontrados = products.filter((producto) =>
        producto.nombre.toLowerCase().includes(nombre.toLowerCase())
      );
      encontrados.sort((a, b) => a.stock - b.stock);
      setEncontrado(encontrados);
    } else if (!nombre) {
      setEncontrado(products);
    }
  };

  // Fin de búsqueda de productos
  // ------------------------------------------------------------------------------------------------------------------------------------------------------//

  // Obtener todos los productos
  useEffect(() => {
    const verificarRol = async () => {
      if (auth.user) {
        const docRef = doc(db, `users/${auth.user.uid}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // Revisa si el documento existe
          const isAdmin = docSnap.data().admin;
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

    const getProducts = async () => {
      try {
        const ordersCollection = collection(db, "Productos");
        const querySnapshot = await getDocs(ordersCollection);
        const allProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(allProducts.sort((a, b) => a.stock - b.stock));
        setEncontrado(allProducts);
        setLoading(false);
        console.log(allProducts);
      } catch (error) {
        console.error("Error al obtener productos:", error.message);
      }
    };

    getProducts();
  }, [auth.user, navigate, db]);
  // Fin de obtener todos los productos
  // ------------------------------------------------------------------------------------------------------------------------------------------------------//

  // Eliminar producto
  const handleDeleteProduct = async (productId) => {
    try {
      const confirmacion = window.confirm(
        "¿Estás seguro que deseas eliminar el producto?"
      );
      //mensaje de confirmación
      if (confirmacion) {
        const productRef = doc(db, "Productos", productId);
        await deleteDoc(productRef);
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
        setEncontrado((prevEncontrado) =>
          prevEncontrado.filter((product) => product.id !== productId)
        );
        toast.success("Producto eliminado con éxito", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      } else {
        toast.error("Se ha cancelado la eliminacion", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });

        console.log("No se eliminó el producto");
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error.message);
    }
  };
  // Fin de eliminar producto
  // ------------------------------------------------------------------------------------------------------------------------------------------------------//
  if (loading) {
    return <Loading />;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="container mx-auto my-2 mm3:m-0 ">
      <div className="flex justify-center mb-6 flex-col items-center">
        <h2 className="text-white font-semibold text-xl">
          Hola! {displayName}
        </h2>
        <span className="text-xs text-gray-400">
          Aquí se mostrarán <b>todos</b> los productos cargados en la base de
          datos
        </span>
      </div>
      <div className="flex justify-between">
        <input
          className="border border-gray-300 rounded-md px-4 py-2 mt-4 mb-4 focus:ring-blue-600 font-semibold"
          onChange={(e) => filtradoPorNombre(e.target.value)}
          placeholder="Buscar producto"
        />
        {/* agregar un nuevo producto */}
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2 mt-4 mb-4 flex items-center gap-1 ease-in-out transition-all duration-300"
          onClick={() => navigate("/agregar")}
        >
          <IoIosAddCircleOutline className="h-6 w-6" /> Agregar producto
        </button>
      </div>
      <table className="w-full text-md text-left text-white bg-slate-950 border border-gray-800 ">
        <thead>
          <tr className="bg-gray-950">
            <th className="py-2 px-4 border-b border-b-gray-700">Nombre</th>
            <th className="py-2 px-4 border-b border-b-gray-700 hidden md:table-cell">
              Precio
            </th>

            <th className="py-2 px-4 border-b border-b-gray-700">Stock</th>
            <th className="py-2 px-4 border-b border-b-gray-700">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {encontrado.map((product) => (
            <tr key={product.id}>
              <td className="py-2 px-4 border-b border-b-gray-700">
                {product.nombre}
              </td>
              <td className="py-2 px-4 border-b border-b-gray-700 hidden md:table-cell text-lg font-semibold">
                ${product.price}
              </td>
              <td className="py-2 px-4 border-b border-b-gray-700 hidden md:table-cell text-lg font-semibold">
                {product.stock > 0 ? (
                  <span className="bg-green-500 text-white py-1 px-3 rounded-full text-xs">
                    {product.stock}
                  </span>
                ) : (
                  <span className="bg-red-500 text-white py-1 px-3 rounded-full text-xs">
                    {product.stock}
                  </span>
                )}
              </td>
              <td className="py-2 px-4 border-b border-b-gray-700">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 mm3:px-2 mm3:py-1 mm3:mb-2"
                  onClick={() => navigate(`/editar/${product.id}`)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mm3:px-2 mm3:py-1"
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
  );
};

export default Admin;
