import {useEffect, useState} from 'react'

const UseEffect = () => {
  
  const [mensaje, setMensaje] = useState("Mensaje inicial")
  const [contador, setContador] = useState(0)

  useEffect(() => { 
    console.log("Efecto secundario")
  },[mensaje])
  
  const sumar = () =>{
    setContador(contador + 1)
  }
  const restar = () =>{
   if(contador <= 0){
    alert('Ha llegado al numero minimo de productos')
   }else setContador(contador - 1)  
  }

  const reset = () =>{
    setContador(0)
  }

  return (
    <div className='text-white flex justify-center mt-6 gap-4'>
      <p className=''>{mensaje}</p>
      <button className='text-white bg-green-600 px-3 rounded-sm hover:bg-green-500' onClick={()=>setMensaje("Mensaje modificado")}> Cambiar </button>
      <button className='text-white bg-green-600 px-3 rounded-sm hover:bg-green-500' onClick={()=>setMensaje("Mensaje inicial")}> Volver al anterior </button>
      <p> {contador} </p>
      <div className="buttons flex gap-3">  
      <button className='bg-violet-700 px-3 rounded-sm hover:bg-violet-600' onClick={sumar}> + </button>
      <button className='bg-violet-800 px-3 rounded-sm hover:bg-violet-700' onClick={restar}> - </button>
      <button className='bg-violet-900 px-3 rounded-sm hover:bg-violet-800' onClick={reset}> Reset </button>
      </div>
    </div>
  )
}

export default UseEffect