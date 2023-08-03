import ItemDetailContainer from "./components/ItemDetailContainer";
import ItemListContainer from "./components/ItemListContainer";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from './components/Cart'
import ItemDetail from './components/ItemDetail'
// import UseEffect from "./components/UseEffect";
// import UseRef from "./components/UseRef"

function App() {
  return (
    <BrowserRouter>
      <nav>
        <NavBar />
      </nav>


      <Routes>
          {/* <ItemListContainer /> */}
          <Route exact path="/" element={<ItemListContainer/>}/>
          <Route exact path='/cart' element={<Cart/>}/>
          <Route exact path='/item/:id' element={<ItemDetail/>}/>
          <Route exact path='/category/:category' element={<ItemListContainer/>}/>
          <Route exact path='/item/:id' element={<ItemDetailContainer/>}/>
          {/* <ItemDetailContainer /> */}
      </Routes>


    </BrowserRouter>
  );
}

export default App;
