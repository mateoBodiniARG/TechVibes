import ItemDetailContainer from "./components/ItemDetailContainer";
import ItemListContainer from "./components/ItemListContainer";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./components/Cart";
import ShoppingCartContext from "./context/ShoppingCartContext";
import SendOrder from "./components/SendOrder";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from "./components/Profile";
import FinalizePurchase from "./components/FinalizePurchase";

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
            <Route path="/profile" element={<Profile/>} />
            <Route path="/category/:categoryId" element={<ItemListContainer />} />
            <Route path="/item/:id" element={<ItemDetailContainer />} />
            <Route path="/finalizePurchase" element={<FinalizePurchase/>} />
          </Routes>
          <ToastContainer/>
        </ShoppingCartContext>
      </BrowserRouter>

      {/* <SendOrder/> */}
    </>
  );
}

export default App;
