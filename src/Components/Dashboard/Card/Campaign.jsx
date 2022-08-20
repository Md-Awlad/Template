import React from "react";
import { GoMegaphone } from "react-icons/go";
import { useStateContext } from "../../../Contexts/ContextProvider";

const Campaign = () => {
  const { currentColor } = useStateContext();
  return (
    <div className="text-center">
      <div
        style={{
          backgroundColor: `${currentColor}20`,
          color: currentColor,
        }}
        className="text-5xl w-16 h-16 flex justify-center items-center rounded-full m-auto"
      >
        <GoMegaphone />
      </div>
      <button className="text-lg text-gray-900 dark:text-neutral font-semibold border-1 dark:border-gray-700 rounded-md shadow-md px-3 py-2 mt-3">
        Campaign
      </button>
    </div>
  );
};

export default Campaign;
