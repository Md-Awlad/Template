import { TableContainer } from "@mui/material";
import React from "react";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import pizza from "../../../image/pizza.png";

const Pizza = () => {
  return (
    <div className="">
      <div className="bg-gray-100 flex items-center justify-center font-sans ">
        <div className="w-full overflow-x-scroll">
          <div className="bg-white shadow-md rounded ">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-[#FFC446] text-gray-600 uppercase text-sm">
                  <th className="py-3 px-6 text-left">Image</th>
                  <th className="py-3 px-6 text-left">Food Name</th>
                  <th className="py-3 px-6 text-center">Price</th>
                  <th className="py-3 px-6 text-center">Details</th>
                  <th className="py-3 px-6 text-center">Other</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                {[1, 2, 3, 4, 5].map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <img className="w-12 h-12" src={pizza} alt="" />
                    </td>
                    <td className="py-3 px-6 text-center">
                      <h2>Pizza</h2>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <h2>500</h2>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <h2>
                        Lorem ipsum dolor sit amet consectetur adipisicing.
                      </h2>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <h2>Extra Sauce</h2>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex gap-3 item-center justify-center">
                        <GrEdit className="cursor-pointer" />
                        <RiDeleteBin6Line className="cursor-pointer" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pizza;
