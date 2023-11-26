import React, { useEffect, useState, useContext } from "react";
import { useAuth } from "../../context/AuthContext";
import { CartContext } from "../../context/ShoppingCartContext";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const UserOrders = () => {
  const auth = useAuth();
  const { cart, orders } = useContext(CartContext);
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        if (auth.user) {
          const db = getFirestore();
          const ordersCollection = collection(db, "userOrders");
          const userOrdersQuery = query(
            ordersCollection,
            where("userId", "==", auth.user.uid)
          );

          const ordersSnapshot = await getDocs(userOrdersQuery);
          const ordersList = ordersSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setUserOrders(ordersList);

          console.log("userOrders:", userOrders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    getOrders();
  }, [auth]);

  return (
    <div className="p-8 rounded-md w-3/4 mx-auto">
      <div className="flex items-center justify-between pb-6">
        <div>
          <h2 className="text-gray-300 font-semibold">Productos comprados</h2>
          <span className="text-xs text-gray-400">
            Se mostrarán todas las órdenes de compra que se han realizado.
          </span>
        </div>
        <div className="flex items-center"></div>
      </div>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal text-white">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-600 bg-gray-700 text-left text-xs font-semibold uppercase tracking-wider">
                  Email
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-600 bg-gray-700 text-left text-xs font-semibold uppercase tracking-wider">
                  Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-600 bg-gray-700 text-left text-xs font-semibold uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-600 bg-gray-700 text-left text-xs font-semibold uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {userOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-5 py-5 border-b border-gray-600 bg-gray-800 text-sm">
                    <p className="text-gray-300 whitespace-no-wrap">
                      {order.buyer.email}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-600 bg-gray-800 text-sm">
                    <p className="text-gray-300 whitespace-no-wrap">
                      {order.buyer.name}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-600 bg-gray-800 text-sm">
                    <p className="text-gray-300 whitespace-no-wrap">
                      {order.buyer.phone}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-600 bg-gray-800 text-sm">
                    <p className="text-gray-300 whitespace-no-wrap">
                      ${order.total.toFixed(2)}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
