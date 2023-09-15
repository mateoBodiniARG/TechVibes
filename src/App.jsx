import ItemDetailContainer from "./components/ItemDetail/ItemDetailContainer";
import ItemListContainer from "./components/ItemList/ItemListContainer";
import NavBar from "./components/Navbar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import ShoppingCartContext from "./context/ShoppingCartContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FinalizePurchase from "./components/FinalizePurchase/FinalizePurchase";
import Login from "./components/Login/Login";
import Register from "./components/Registro/Register";

function App() {
  return (
    <>
      <BrowserRouter>
        <ShoppingCartContext>

          <nav>
            <NavBar />
          </nav>
          <Routes>
            <Route path="/" element={<ItemListContainer />} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/Login" element={<Login/>} />
            <Route path="/Register" element={<Register/>} />
            <Route path="/category/:categoryId" element={<ItemListContainer />} />
            <Route path="/item/:id" element={<ItemDetailContainer />} />
            <Route path="/finalizePurchase" element={<FinalizePurchase/>} />
          </Routes>
          <ToastContainer/>
        </ShoppingCartContext>
      </BrowserRouter>

    </>
  );
}

export default App;
