import ItemDetailContainer from "./components/ItemDetailContainer";
import ItemListContainer from "./components/ItemListContainer";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from './components/Cart'


function App() {
  return (
    <BrowserRouter>
      <nav>
        <NavBar />
      </nav>
      <Routes>   
          <Route  path="/" element={<ItemListContainer/>}/>
          <Route  path='/cart' element={<Cart/>}/>
          <Route  path='/category/:category' element={<ItemListContainer/>}/>
          <Route  path='/item/:id' element={<ItemDetailContainer/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;