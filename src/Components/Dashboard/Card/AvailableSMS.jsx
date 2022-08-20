import React from "react";
import { FiPackage } from "react-icons/fi";
import { useStateContext } from "../../../Contexts/ContextProvider";

const AvailableSMS = () => {
  const { currentColor } = useStateContext();
  return (
    <div>
      <div className="flex flex-wrap justify-center md:justify-between items-center">
        <div
          style={{
            backgroundColor: `${currentColor}20`,
            color: currentColor,
          }}
          className="text-5xl w-16 h-16 flex justify-center items-center rounded-full"
        >
          <FiPackage />
        </div>
        <div>
          <h2 className="text-md dark:text-neutral font-semibold text-gray-900">
            Total Available SMS
          </h2>
          <p className="text-center text-2xl font-bold dark:text-neutral">
            5464
          </p>
        </div>
      </div>
    </div>
  );
};

export default AvailableSMS;
