import { collection, addDoc, getFirestore } from "firebase/firestore";

import { useState } from "react";

const SendOrder = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState(null);

  const db = getFirestore();

  const handleSubmit = (e) => {
    e.preventDefault();
    addDoc(ordersCollection, order).then(({id}) =>
    setOrderId(id)) 

    sendOrder()
  };

  const order = {
    name,
    email,
  };

  const ordersCollection = collection(db, "orden");

  const sendOrder = () => {
    const order = {
      buyer: { name: "Samuel", apellido: "Bile", email: "samu@coder.com" },
      items: [{ name: "Producto A", price: 1000 }],
      total: 1000,
    };
    const ordersCollection = collection(db, "orders");

    addDoc(ordersCollection, order).then(({ id }) => setOrderId(id));
  };
  return (
    <div className="text-white ">
      <h1>Enviando Ordenes</h1>
      <form onSubmit={handleSubmit} className="text-black">
        <input
          type="text"
          placeholder="Nombre y Apellido"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Enviar informacion</button>
      </form>
     
      <p>Numero de orden: {orderId}</p>
    </div>
  );
};

export default SendOrder;
