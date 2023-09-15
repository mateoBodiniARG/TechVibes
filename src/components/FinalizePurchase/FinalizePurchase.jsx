import React, { useState, useContext } from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { CartContext } from "../../context/ShoppingCartContext";
import { AiOutlineCheck } from "react-icons/ai";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const FinalizePurchase = () => {
  const { cart, setCart } = useContext(CartContext);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneValid, setPhoneValid] = useState("");
  const [orderId, setOrderId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const db = getFirestore();

  const handleEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const newEmail = email.target.value;
    const validEmail = emailRegex.test(newEmail);
    setIsValid(validEmail);
  };

  const stepVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const handlePurchaseFinalized = () => {
    setIsModalVisible(false);
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
          setOrderId(id);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === "" || phone === "" || email === "" || !isValid || !phoneValid) {
      setIsSubmitClicked(true);
      return;
    }
    sendOrder();
    setCart([]);
    setIsSubmitClicked(true);
    setIsModalVisible(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-6 flex flex-col justify-center sm:py-12 ">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-gray-800 mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center space-x-5">
                <div className="h-14 w-14 bg-green-400 rounded-full flex flex-shrink-0 justify-center items-center text-green-700 text-2xl font-mono">
                  <IoIosCheckmarkCircleOutline className="w-8 h-8" />
                </div>
                <div className="block pl-2 font-semibold text-xl self-start">
                  <h2 className="leading-relaxed">You are just one click away!</h2>
                  <p className="text-sm text-gray-500 font-normal leading-relaxed">
                    Complete the fields to finalize the purchase.
                  </p>
                </div>
              </div>
            </motion.div>

            <form onSubmit={handleSubmit}>
              <div className="divide-y divide-gray-700">
                <div className="py-9 space-y-4">
                  <motion.div
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="flex flex-col">
                      <label className="leading-loose">Full name</label>
                      <input
                        type="text"
                        className="text-black font-semibold rounded-md"
                        placeholder="Your full name"
                        onChange={(e) => {
                          setName(e.target.value);
                          handlePhone(e);
                        }}
                      />
                      {isSubmitClicked && name === "" && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-600 font-bold text-base"
                        >
                          The NAME can't be empty
                        </motion.p>
                      )}
                    </div>
                  </motion.div>

                  <motion.div
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                  >
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
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-600 font-bold text-base"
                        >
                          The PHONE can't be empty
                        </motion.p>
                      )}

                      {!phoneValid && isSubmitClicked && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-600 font-semibold text-base"
                        >
                          Please enter a valid phone number (ex, 1234567890)
                        </motion.p>
                      )}
                    </div>
                  </motion.div>

                  <motion.div
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                  >
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
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-600 font-bold text-base"
                        >
                          The EMAIL can't be empty
                        </motion.p>
                      )}

                      {!isValid && isSubmitClicked && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-600 font-semibold text-base"
                        >
                          You must enter a valid EMAIL address
                        </motion.p>
                      )}
                    </div>
                  </motion.div>
                </div>

                <div className="pt-4 flex items-center space-x-4">
                  <motion.button
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-blue-500 transition ease-in hover:bg-blue-700 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                    onClick={handlePurchaseFinalized}
                  >
                    Finalize purchase
                  </motion.button>

                  {orderId && isModalVisible && (
                    <div className="fixed inset-0 flex items-center justify-center ">
                      <div className="bg-black opacity-40 fixed inset-0 z-40"></div>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="bg-white py-7 px-20 rounded-md shadow-lg z-50 relative"
                      >
                        <div className="flex items-center justify-center text-2xl mb-3">
                          <AiOutlineCheck className="w-14 h-14 bg-green-100 rounded-full text p-4 text-green-500" />
                        </div>
                        <div className="text-base text-center">
                          <p className="text-black font-semibold text-lg">
                            Payment successful
                          </p>
                          <p className="text-black opacity-50 font-medium">
                            Thank you for shopping at TechVibes!
                          </p>
                          <p className="text-black mt-3 mb-8 font-semibold">
                            ORDER ID:{" "}
                            <span className="text-indigo-700 bg-gray-100 rounded-md py-1 px-2">
                              {orderId}
                            </span>
                          </p>
                        </div>
                        <div className="border-t border-gray-200 pt-5 flex justify-center space-x-5">
                          <Link to={"/"}>
                            <button className="bg-violet-50 px-4 py-2 rounded-md border-0 font-semibold text-violet-700 hover:bg-violet-100">
                              Continue Shopping
                            </button>
                          </Link>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalizePurchase;
