import React from "react";
import CatSpinner from "../assets/CatLoading.gif";

function Spinner() {
  return (
    <div className="flex flex-row items-center justify-center mt-50">
      <img src={CatSpinner} alt="Loading" className="h-96 " />
    </div>
  );
}

export default Spinner;
