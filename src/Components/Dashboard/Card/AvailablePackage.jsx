import React from "react";
import packageImg from "../../../image/sms.svg";
import { useStateContext } from "../../../Contexts/ContextProvider";

const AvailablePackage = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="text-5xl w-16 h-16 flex justify-center items-center rounded-full">
        <img src={packageImg} alt="" />
      </div>
      <div>
        <h2 className="text-md dark:text-neutral font-semibold text-gray-900 capitalize">
          last purchase package
        </h2>
        <button className="text-lg text-gray-900 dark:text-neutral font-semibold border-1 dark:border-gray-700 rounded-md shadow-md px-8 py-2 mt-3 md:ml-8">
          Watch
        </button>
      </div>
    </div>
  );
};

export default AvailablePackage;
