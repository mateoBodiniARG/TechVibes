import ItemListContainer from "./components/ItemListContainer"
import NavBar from "./components/NavBar"

function App() {

  return (
    
      <section className="w-screen h-screen bg-gray-900">
      <NavBar/>
      <ItemListContainer
      greeting="Bienvenidos a mi tienda"
      />
      </section>
    
  )
}

export default App
