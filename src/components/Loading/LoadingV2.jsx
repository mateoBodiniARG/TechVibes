import React from "react";
import SyncLoader from "react-spinners/SyncLoader";

const Loading = () => {
  return (
    <div className="">
      <SyncLoader color="#ffff" size={8} />
    </div>
  );
};

export default Loading;
