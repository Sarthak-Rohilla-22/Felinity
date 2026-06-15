import React from "react";
import { RiArrowGoBackLine } from "react-icons/ri";
import { useNavigate } from "react-router";

function GoBack() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className=" self-start rounded-sm bg-taupe-700 px-8 py-3 font-cute text-sm font-medium tracking-wide text-stone-100 transition-all duration-200 hover:bg-taupe-600 hover:scale-105 my-5 cursor-pointer flex flex-row"
    >
      <RiArrowGoBackLine className="mt-[3.5px] mr-2" />
      Go Back
    </button>
  );
}

export default GoBack;
