import {useEffect, useState} from 'react'
import {collection, getDocs, getFirestore} from 'firebase/firestore'


const Collection = () => {
    const [products, setProducts] = useState([])
    console.log(products)

    useEffect(() => {
        const db = getFirestore()
        
        const itemsCollection = collection(db,'Productos')
        getDocs(itemsCollection).then((snapshot)=>{
            const docs = snapshot.docs.map((doc)=>doc.data())
            setProducts(docs)
        })
    }, [])
    



  return (
    <div className="text-white">
    <h1>Productos</h1>
    {
          products.map((product)=>(
            <div key={product.nombre}>
                <h3>producto: {product.nombre}</h3>
                <h4> Categoria: {product.categoryId}</h4>
                <p>precio: {product.price}</p>
            </div>
          ))
    }
  </div>
  )
}

export default Collection