import Item from "./components/Item";
import ItemList from "./components/ItemList";
import ItemListContainer from "./components/ItemListContainer";
import NavBar from "./components/NavBar";
import UseEffect from "./components/UseEffect";
// import UseRef from "./components/UseRef"


function App() {
 

  // const getDatos = () => {
  //   return new Promise((resolve,reject)=>{
  //     if (datos.length === 0){
  //       reject(new Error('No hay datos'))
  //     }
  //     setTimeout(()=>{
  //       resolve(datos)
  //     },3000)
  //   })
  // }

  // id string ,name string, description string, stock number
  // getDatos().then((datos)=>{
  //   console.log(datos)
  // })

  // async function fetchingData(){
  //   try{
  //     const datosFetch = await getDatos()
  //     console.log(datosFetch)
  //   }catch(error){
  //     console.error(error)
  //   }
  // }

  // fetchingData()

  return (
    <section className="w-screen h-screen bg-gray-900">
      <NavBar />
      <ItemListContainer />
    </section>
  );
}

export default App;
