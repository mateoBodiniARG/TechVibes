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
  setDoc,
} from "firebase/firestore";
import Loading from "../Loading/Loading";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const EditProduct = () => {
  const { productId } = useParams();
  const db = getFirestore();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const productDoc = await getDoc(doc(db, "Productos", productId));
        if (productDoc.exists()) {
          console.log("Producto cargado:", productDoc.data());
          setProduct({ id: productDoc.id, ...productDoc.data() });
        } else {
          console.log("No existe el producto");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener el producto:", error.message);
      }
    };

    getProduct();
  }, [db, productId]);

  // Funciones de manejo de cambios
  const handleNameChange = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      nombre: e.target.value,
    }));
  };

  const handleDescriptionChange = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      description: e.target.value,
    }));
  };

  const handlePriceChange = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      price: e.target.value,
    }));
  };

  const handleCategoryIdChange = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      categoryId: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      img: e.target.value,
    }));
  };

  const handleStockChange = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      stock: e.target.value,
    }));
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  // Función para guardar los cambios y que se modifiquen en la base de datos de Firebase
  const handleSaveChanges = async () => {
    try {
      const productRef = doc(db, "Productos", productId);
      await setDoc(productRef, product);
      navigate("/admin");
    } catch (error) {
      console.error("Error al guardar los cambios:", error.message);
    }
  };

  return (
    <div>
      <section>
        <h1 className="text-2xl font-semibold text-white mb-4 text-center">
          ¡Hola, {auth.user ? auth.user.displayName : "Buscando ..."}!
        </h1>
        {auth.user ? (
          <section className="flex justify-center ">
            <div className="flex flex-col items-center justify-center bg-slate-950 shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h2 className="text-2xl font-semibold text-white mb-4 text-center">
                Editar Producto
              </h2>
              <form className="w-full max-w-lg">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                      htmlFor="grid-name"
                    ></label>
                    <input
                      className=" appearance-none block w-full bg-slate-900 text-white border border-slate-700 rounded py-3 px-4 mb-3 leading-tight"
                      id="grid-name"
                      type="text"
                      value={product.nombre}
                      onChange={handleNameChange}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3 mb-6 md:mb-3">
                    <label
                      className="block uppercase tracking-wide text-white text-xs font-bold mb-2 "
                      htmlFor="grid-description"
                    >
                      Descripción
                    </label>
                    <textarea
                      className=" w-full h-full block bg-slate-900 text-white border border-slate-700 rounded py-3 px-4 mb-5 leading-tight"
                      id="grid-description"
                      type="text"
                      value={product.description}
                      onChange={handleDescriptionChange}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                      htmlFor="grid-price"
                    >
                      Precio
                    </label>
                    <input
                      className=" block w-full bg-slate-900 text-white border border-slate-700 rounded py-3 px-4 leading-tight"
                      id="grid-price"
                      type="number"
                      value={product.price}
                      onChange={handlePriceChange}
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                      htmlFor="grid-category"
                    >
                      Categoría
                    </label>
                    <input
                      className="appearance-none block w-full bg-slate-900 text-white border border-slate-700 rounded py-3 px-4 leading-tight"
                      id="grid-category"
                      type="text"
                      value={product.categoryId}
                      onChange={handleCategoryIdChange}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                      htmlFor="grid-image"
                    >
                      Imagen
                    </label>
                    <input
                      className="appearance-none block w-full bg-slate-900 text-white border border-slate-700 rounded py-3 px-4 leading-tight"
                      id="grid-image"
                      type="text"
                      value={product.img}
                      onChange={handleImageChange}
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                      htmlFor="grid-stock"
                    >
                      Stock
                    </label>
                    <input
                      className="appearance-none block w-full bg-slate-900 text-white border border-slate-700 rounded py-3 px-4 leading-tight"
                      id="grid-stock"
                      type="number"
                      value={product.stock}
                      onChange={handleStockChange}
                    />
                  </div>
                </div>
                <div className="flex flex-col -mx-3 mb-6">
                  <button
                    onClick={handleSaveChanges}
                    className="mb-3 block text-center py-2 px-4 w-full rounded text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Guardar
                  </button>
                  <Link to="/admin">
                    <button className="block text-center py-2 px-4 w-full rounded text-white bg-red-600 hover:bg-red-700">
                      Cancelar
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </section>
        ) : (
          // enviar al usuario a la página de login o a la home
          <p>Usuario no autenticado</p>
        )}
      </section>
    </div>
  );
};

export default EditProduct;
