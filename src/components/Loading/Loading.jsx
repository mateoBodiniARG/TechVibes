import React from "react";
import HashLoader from "react-spinners/HashLoader";

const Loading = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <HashLoader color="#3e76e3" size={120}  />
    </div>
  );
};

export default Loading;
