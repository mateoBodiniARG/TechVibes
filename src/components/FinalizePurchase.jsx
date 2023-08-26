import React, { useState, useContext } from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { CartContext } from "../context/ShoppingCartContext";
import DeleteDocuments from "../components/DeleteDocuments";
const FinalizePurchase = () => {
  const { cart, setCart } = useContext(CartContext);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneValid, setPhoneValid] = useState("");
  const [orderId, setOrderId] = useState(null);

  const db = getFirestore();

  const handleEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const newEmail = email.target.value;
    const validEmail = emailRegex.test(newEmail);
    setIsValid(validEmail);
  };

  const handlePhone = (e) => {
    const phoneNumberRegex = /^\d{10}$/;
    const newPhone = e.target.value;
    const validPhone = phoneNumberRegex.test(newPhone);
    setPhoneValid(validPhone);
  };

  const sendOrder = () => {
    return new Promise((resolve, reject) => {
      const orders = {
        buyer: {
          name: name,
          phone: phone,
          email: email,
        },

        items: cart.map((item) => ({
          name: item.nombre,
          price: item.price,
        })),
        total: cart.reduce(
          (total, item) => total + item.price * item.cantComprar,
          0
        ),
      };
      const ordersColUser = collection(db, "usersOrders");
      addDoc(ordersColUser, orders)
        .then(({ id }) => {
          resolve({ id }); 
          setOrderId(id)
        })
        .catch((error) => {
          reject(error); 
        });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      name === "" ||
      phone === "" ||
      email === "" ||
      !isValid ||
      !phoneValid
    ) {
      setIsSubmitClicked(true);
      return;
    }
    sendOrder();
    setIsSubmitClicked(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-6 flex flex-col justify-center sm:py-12 ">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-gray-800 mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <div className="h-14 w-14 bg-green-400 rounded-full flex flex-shrink-0 justify-center items-center text-green-700 text-2xl font-mono">
                <IoIosCheckmarkCircleOutline className="w-8 h-8" />
              </div>
              <div className="block pl-2 font-semibold text-xl self-start">
                <h2 className="leading-relaxed">
                  You are just one click away!
                </h2>
                <p className="text-sm text-gray-500 font-normal leading-relaxed">
                  Complete the fields to finalize the purchase.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="divide-y divide-gray-700">
                <div className="py-9 space-y-4">
                  <div className="flex flex-col">
                    <label className="leading-loose">Full name</label>
                    <input
                      type="text"
                      pattern="[A-Za-z]+"
                      className="text-black font-semibold rounded-md"
                      placeholder="Your full name"
                      onChange={(e) => {
                        setName(e.target.value);
                        handlePhone(e);
                      }}
                    />
                    {isSubmitClicked && name === "" && (
                      <p className="text-red-600 font-bold text-base">
                        The NAME can't be empty
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label className="leading-loose">Phone</label>
                    <input
                      type="number"
                      className="text-black font-semibold rounded-md"
                      placeholder="123-456-789"
                      onChange={(e) => {
                        setPhone(e.target.value);
                        handlePhone(e);
                      }}
                    />
                    {isSubmitClicked && phone === "" && (
                      <p className="text-red-600 font-bold text-base">
                        The PHONE can't be empty
                      </p>
                    )}

                    {!phoneValid && isSubmitClicked && (
                      <p className="text-red-600 font-semibold text-base">
                        Please enter a valid phone number (ex, 1234567890)
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label className="leading-loose">Email</label>
                    <input
                      type="text"
                      className="text-black font-semibold rounded-md"
                      placeholder="example@gmail.com"
                      onChange={(e) => {
                        setEmail(e.target.value);
                        handleEmail(e);
                      }}
                    />
                    {isSubmitClicked && email === "" && (
                      <p className="text-red-600 font-bold text-base">
                        The EMAIL can't be empty
                      </p>
                    )}

                    {!isValid && isSubmitClicked && (
                      <p className="text-red-600 font-semibold text-base">
                        You must enter a valid EMAIL address
                      </p>
                    )}
                  </div>
                </div>
                <div className="pt-4 flex items-center space-x-4">
                  <button className="bg-blue-500 transition ease-in hover:bg-blue-700 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">
                    Finalize purchase
                  </button>
                </div>
              </div>
            </form>
            <p>numero de order: {orderId}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalizePurchase;
