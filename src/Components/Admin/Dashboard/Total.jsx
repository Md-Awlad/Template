import React from "react";
import { MdFastfood } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { useStateContext } from "../../../Contexts/ContextProvider";
import { BsCartCheckFill } from "react-icons/bs";
import { FiCheckCircle } from "react-icons/fi";
import { FaSellcast } from "react-icons/fa";

const Total = ({ todays }) => {
  const { currentColor } = useStateContext();
  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-5">
      {/* --food-- */}
      <div className="bg-neutral dark:bg-secondary-dark-bg dark:text-neutral px-2 py-8 border rounded-md text-2xl font-semibold shadow-sm dark:border-gray-700">
        <div className="flex gap-3 items-center">
          <MdFastfood
            style={{
              color: currentColor,
              backgroundColor: `${currentColor}40`,
            }}
            className="inline w-12 h-12 p-2 rounded-full"
          />
          <div className="">
            <h2 className="text-sm text-gray-600">Total Food</h2>
            <h2 className="text-xl font-bold text-center">
              {todays.total_food}
            </h2>
          </div>
        </div>
      </div>
      {/* --category-- */}
      <div className="bg-neutral dark:bg-secondary-dark-bg dark:text-neutral px-2 py-8 border rounded-md text-2xl font-semibold shadow-sm dark:border-gray-700">
        <div className="flex gap-3 items-center">
          <BiCategoryAlt
            style={{
              color: currentColor,
              backgroundColor: `${currentColor}40`,
            }}
            className="inline w-12 h-12 p-2 rounded-full"
          />
          <div className="">
            <h2 className="text-sm text-gray-600 ">Total Category</h2>
            <h2 className="text-xl font-bold text-center">
              {todays.total_category}
            </h2>
          </div>
        </div>
      </div>
      {/* --order-- */}
      <div className="bg-neutral dark:bg-secondary-dark-bg dark:text-neutral px-2 py-8 border rounded-md text-2xl font-semibold shadow-sm dark:border-gray-700">
        <div className="flex gap-3 items-center">
          <BsCartCheckFill
            style={{
              color: currentColor,
              backgroundColor: `${currentColor}40`,
            }}
            className="inline w-12 h-12 p-2 rounded-full"
          />
          <div className="">
            <h2 className="text-sm text-gray-600">Total Order</h2>
            <h2 className="text-xl font-bold text-center">
              {todays.total_order}
            </h2>
          </div>
        </div>
      </div>
      {/* --complete-- */}
      <div className="bg-neutral dark:bg-secondary-dark-bg dark:text-neutral px-2 py-8 border rounded-md text-2xl font-semibold shadow-sm dark:border-gray-700">
        <div className="flex gap-3 items-center">
          <FiCheckCircle
            style={{
              color: currentColor,
              backgroundColor: `${currentColor}40`,
            }}
            className="inline w-12 h-12 p-2 rounded-full"
          />
          <div className="">
            <h2 className="text-sm text-gray-600">Complete Order</h2>
            <h2 className="text-xl font-bold text-center">
              {todays.total_complete_order}
            </h2>
          </div>
        </div>
      </div>
      {/* --sell-- */}
      <div className="bg-neutral dark:bg-secondary-dark-bg dark:text-neutral px-2 py-8 border rounded-md text-2xl font-semibold shadow-sm dark:border-gray-700">
        <div className="flex gap-3 items-center">
          <FaSellcast
            style={{
              color: currentColor,
              backgroundColor: `${currentColor}40`,
            }}
            className="inline w-12 h-12 p-2 rounded-full"
          />
          <div className="">
            <h2 className="text-sm text-gray-600">Total Sell</h2>
            <h2 className="text-xl font-bold text-center">
              {todays.total_sell}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Total;
