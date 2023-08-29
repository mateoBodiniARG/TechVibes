import React, { useState } from "react";
import { getFirestore, getDocs, deleteDoc, collection } from "firebase/firestore";

const DeleteDocuments = () => {
  const [deleteStatus, setDeleteStatus] = useState(""); 
  const db = getFirestore();

  const handleDeleteAllDocuments = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "usersOrders"));
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
      setDeleteStatus("Todos los documentos eliminados correctamente");
    } catch (error) {
      console.error("Error al eliminar los documentos:", error);
      setDeleteStatus("Error al intentar eliminar los documentos");
    }
  };

  return (
    <div>
      <button onClick={handleDeleteAllDocuments}>Eliminar todos los documentos</button>
      <p>{deleteStatus}</p>
    </div>
  );
};

export default DeleteDocuments;
