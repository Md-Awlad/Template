import React from "react";
import { BiEditAlt } from "react-icons/bi";
import { ImPlus } from "react-icons/im";
import { useStateContext } from "../../Contexts/ContextProvider";
const PageTitle = ({
  headingText = "",
  pageName = "",
  modalOpen = "",
  modalOpenTwo = "",
  buttonText = "",
  buttonTextTwo = "",
  editIcon = false,
}) => {
  const { currentColor } = useStateContext();
  return (
    <div className="md:flex justify-between mb-5 py-2  items-center">
      <div className="dark:text-neutral">
        <h2 className="text-3xl  font-semibold capitalize"> {headingText}</h2>
        <p className="text-sm my-2 font-medium">
          Dashboard /
          <span className="text-gray-600 dark:text-gray-400 capitalize">
            {" "}
            {pageName}
          </span>
        </p>
      </div>
      <div className="flex items-center gap-3">
        {modalOpen && (
          <button
            onClick={modalOpen}
            style={{ backgroundColor: currentColor }}
            className="px-3 py-2 text-sm rounded-md text-neutral flex items-center gap-1 font-medium hover:opacity-80 capitalize"
          >
            {editIcon ? (
              <BiEditAlt className="inline text-xs font-bold " />
            ) : (
              <ImPlus className="inline text-xs font-bold " />
            )}
            {buttonText}
          </button>
        )}
        {modalOpenTwo && (
          <button
            onClick={modalOpenTwo}
            style={{ backgroundColor: currentColor }}
            className="px-3 py-2 text-sm rounded-md text-neutral flex items-center gap-1 font-medium hover:opacity-80 capitalize"
          >
            {editIcon ? (
              <BiEditAlt className="inline text-xs font-bold " />
            ) : (
              <ImPlus className="inline text-xs font-bold " />
            )}
            {buttonTextTwo}
          </button>
        )}
      </div>
    </div>
  );
};

export default PageTitle;
