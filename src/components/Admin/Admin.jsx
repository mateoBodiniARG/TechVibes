import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  getFirestore,
  doc,
  getDocs,
  getDoc,
  collection,
  updateDoc,
} from "firebase/firestore";
import Loading from "../Loading/Loading";
import { IoMdAddCircle } from "react-icons/io";
import { toast } from "react-toastify";
import { FaChartLine } from "react-icons/fa";
import { IoTicket } from "react-icons/io5";

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
  const handleToggleProduct = async (productId, currentStatus) => {
    try {
      const productRef = doc(db, "Productos", productId);

      // Cambiar el estado del campo 'activo'
      await updateDoc(productRef, {
        activo: !currentStatus,
      });

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId
            ? { ...product, activo: !currentStatus }
            : product
        )
      );

      setEncontrado((prevEncontrado) =>
        prevEncontrado.map((product) =>
          product.id === productId
            ? { ...product, activo: !currentStatus }
            : product
        )
      );

      toast.success(
        `Producto ${currentStatus ? "desactivado" : "activado"} con éxito`,
        {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        }
      );
    } catch (error) {
      console.error("Error al cambiar el estado del producto:", error.message);
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
      <div className="flex justify-center mb-4 flex-col items-center text-center">
        <h2 className="text-white font-semibold text-3xl mb-2 mt-4">
          Hola! {displayName}
        </h2>
        <span className="text-sm text-gray-400 mm3:mx-2 mm3:text-base">
          Aquí se mostrarán <b>todos</b> los productos cargados en la base de
          datos
        </span>
      </div>
      <div className="flex justify-between mm3:flex-col mm3:justify-center mm3:items-center mm3:mx-3">
        <input
          className="border border-gray-300 rounded-md px-4 py-2 mt-4 mb-4 focus:ring-blue-600 font-semibold mm3:w-full mm3:mb-2 mm3:px-2 "
          onChange={(e) => filtradoPorNombre(e.target.value)}
          placeholder="Buscar producto"
        />

        <button
          className=" bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2 mt-4 mb-4 flex items-center gap-1 ease-in-out transition-all duration-300 mm3:w-full mm3:mb-2 mm3:px-2 mm3:py-2 mm3:ml-0 mm3:mt-2 mm3:mr-0"
          onClick={() => navigate("/agregar")}
        >
          <IoMdAddCircle className="h-6 w-6" /> Agregar producto
        </button>

        <button
          className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded ml-2 mt-4 mb-4 flex items-center gap-1 ease-in-out transition-all duration-300 mm3:w-full mm3:mb-2 mm3:px-2 mm3:py-2 mm3:ml-0 mm3:mt-2 mm3:mr-0"
          onClick={() => navigate("/estadisticas")}
        >
          <FaChartLine className="h-6 w-6 " /> Estadisticas
        </button>

        <button
          className="bg-black hover:bg-white hover:text-black text-white font-bold py-2 px-3 rounded ml-2 mt-4 mb-4 flex items-center gap-2 ease-in-out transition-all duration-300 mm3:w-full mm3:mb-2 mm3:px-2 mm3:py-2 mm3:ml-0 mm3:mt-2 mm3:mr-0"
          onClick={() => navigate("/ventas")}
        >
          <IoTicket className="h-6 w-6 text-yellow-300" /> Tickets de ventas
        </button>
      </div>
      <section className="mm3:mx-3 mm3:my-3 ">
        <table className="w-full text-md text-left text-white bg-slate-950 border border-gray-800 ">
          <thead>
            <tr className="bg-gray-950">
              <th className="py-2 px-4 border-b border-b-gray-700">Nombre</th>
              <th className="py-2 px-4 border-b border-b-gray-700 mm3:hidden ">
                Precio
              </th>
              <th className="py-2 px-4 border-b border-b-gray-700">Stock</th>
              <th className="py-2 px-4 border-b border-b-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {encontrado.map((product) => (
              <tr
                key={product.id}
                className={`${!product.activo && "opacity-50"}`}
              >
                <td className="py-2 px-4 border-b border-b-gray-700">
                  {product.nombre}
                </td>
                <td className="py-2 px-4 border-b border-b-gray-700 mm3:hidden  text-lg font-semibold">
                  ${product.price}
                </td>
                <td className="py-2 px-4 border-b border-b-gray-700  text-lg font-semibold">
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
                    onClick={() =>
                      handleToggleProduct(product.id, product.activo)
                    }
                  >
                    {product.activo ? "Desactivar" : "Activar"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Admin;
