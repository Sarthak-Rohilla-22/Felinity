import React from "react";
import CatError from "../assets/CatError.gif";

function ErrorComp({ error = "" }) {
  return (
    <div className="flex flex-col items-center justify-center mt-30">
      <img src={CatError} alt="Loading" className="h-64 " />
      <h1 className="text-2xl mt-10 font-cute text-taupe-500 text-center">
        Oops! an error occured... <br />
        {error}
      </h1>
    </div>
  );
}

export default ErrorComp;
