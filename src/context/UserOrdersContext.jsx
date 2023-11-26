import React, { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export const UserOrdersContext = createContext(null);

export const UserOrdersProvider = ({ children }) => {
  const [userOrders, setUserOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserOrders = async () => {
      if (user) {
        const db = getFirestore();
        const ordersCollection = collection(db, "userOrders");
        const userOrdersQuery = query(
          ordersCollection,
          where("userId", "==", user.uid)
        );

        const ordersSnapshot = await getDocs(userOrdersQuery);
        const ordersList = ordersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUserOrders(ordersList);
      }
    };

    fetchUserOrders();
  }, [user]);

  return (
    <UserOrdersContext.Provider value={{ userOrders, setUserOrders }}>
      {children}
    </UserOrdersContext.Provider>
  );
};

export const useUserOrders = () => {
  const context = useContext(UserOrdersContext);
  if (!context) {
    throw new Error(
      "useUserOrders debe estar dentro del proveedor UserOrdersContext"
    );
  }
  return context;
};
