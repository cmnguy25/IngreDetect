import HashLoader from "react-spinners/HashLoader";
import React from "react";

function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <HashLoader color="#36d7b7" />
    </div>
  );
}

export default Loading;
