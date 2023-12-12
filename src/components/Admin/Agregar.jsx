import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  getFirestore,
  doc,
  getDocs,
  collection,
  setDoc,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Agregar = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const db = getFirestore();
  const [product, setProduct] = useState({
    nombre: "",
    description: "",
    price: "",
    img: "",
    stock: "",
  });

  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  // Obtener todas las categorías
  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const productsCollection = collection(db, "Productos");
        const productsSnapshot = await getDocs(productsCollection);

        // Obtener categorías únicas
        const categoriaUnica = new Set();
        productsSnapshot.forEach((doc) => {
          const productData = doc.data();
          if (productData.categoryId) {
            categoriaUnica.add(productData.categoryId);
          }
        });

        setCategories(Array.from(categoriaUnica));
      } catch (error) {
        console.error("Error al obtener las categorías:", error.message);
      }
    };

    obtenerCategorias();
  }, [db]);

  // Cargar nuevo producto a la base de datos de firebase
  const manejoSubmit = async (e) => {
    e.preventDefault();
    // Desestructurar el objeto producto para obtener sus propiedades y valores para poder enviarlos a la base de datos de firebase con setDoc
    const { nombre, description, price, img, stock } = product;
    try {
      const priceToNumber = Number(price);
      const stockToNumber = Number(stock);
      await setDoc(doc(db, "Productos", nombre), {
        nombre,
        description,
        price: priceToNumber,
        categoryId: selectedCategory,
        img,
        stock: stockToNumber,
      });
      toast.success("Producto agregado con éxito", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      console.log("Producto agregado");
      navigate("/admin");
    } catch (error) {
      console.error("Error al agregar el producto:", error.message);
    }
  };

  // Funciones de manejo de cambios
  const handleName = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      nombre: e.target.value,
    }));
  };

  const handleDescription = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      description: e.target.value,
    }));
  };

  const handlePrice = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      price: e.target.value,
    }));
  };

  const handleImage = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      img: e.target.value,
    }));
  };

  const handleStock = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      stock: e.target.value,
    }));
  };

  return (
    <div>
      <section className="flex justify-center items-center md:h-screen mm3:my-2 mm3:mx-3">
        {auth.user ? (
          <section className="flex justify-center ">
            <div className="flex flex-col items-center justify-center bg-slate-950 shadow-md rounded px-8 pt-6 pb-8 mb-4 xl2:mt-56">
              <h2 className="text-2xl font-semibold text-white mb-4 text-center">
                AGREGAR PRODUCTO
              </h2>
              <form className="w-full max-w-lg">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3 md:mb-0">
                    <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
                      {" "}
                      Nombre del producto{" "}
                    </label>
                    <input
                      className=" appearance-none block w-full bg-slate-900 text-white border border-slate-700 rounded py-3 px-4 mb-3 leading-tight"
                      type="text"
                      placeholder="Nombre del producto"
                      onChange={handleName}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3 mb-6 md:mb-3">
                    <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2 ">
                      Descripción
                    </label>
                    <textarea
                      className=" w-full h-full block bg-slate-900 text-white border border-slate-700 rounded py-3 px-4 mb-5 leading-tight"
                      type="text"
                      placeholder="Descripción"
                      onChange={handleDescription}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
                      Precio
                    </label>
                    <input
                      className=" block w-full bg-slate-900 text-white border border-slate-700 rounded py-3 px-4 leading-tight"
                      type="number"
                      placeholder="Precio"
                      onChange={handlePrice}
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
                      Categoría
                    </label>
                    <select
                      className="appearance-none block w-full bg-slate-900 text-white border border-slate-700 rounded py-3 px-4 leading-tight"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="" disabled>
                        Selecciona una categoría
                      </option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
                      Imagen
                    </label>
                    <input
                      className="appearance-none block w-full bg-slate-900 text-white border border-slate-700 rounded py-3 px-4 leading-tight"
                      type="text"
                      placeholder="URL de la imagen"
                      onChange={handleImage}
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
                      Stock
                    </label>
                    <input
                      className="appearance-none block w-full bg-slate-900 text-white border border-slate-700 rounded py-3 px-4 leading-tight"
                      type="number"
                      placeholder="Stock"
                      onChange={handleStock}
                    />
                  </div>
                </div>
                <div className="flex flex-col -mx-3 mb-6">
                  <button
                    className="mb-3 block text-center py-2 px-4 w-full rounded text-white bg-blue-600 hover:bg-blue-700"
                    onClick={manejoSubmit}
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
          navigate("/")
        )}
      </section>
    </div>
  );
};

export default Agregar;
