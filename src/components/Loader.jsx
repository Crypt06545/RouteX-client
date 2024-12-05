import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-96">
      <div className="border-t-4 border-emerald-600 border-solid w-16 h-16 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
