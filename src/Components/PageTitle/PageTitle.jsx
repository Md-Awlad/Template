import React from "react";
import { useLocation } from "react-router-dom";
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
  const { pathname } = useLocation();
  return (
    <div className="bg-white md:flex justify-between mb-5 py-2 items-center shadow rounded-md px-4">
      <div>
        <h2 className="text-3xl font-semibold capitalize"> {headingText}</h2>
        <p className="text-sm my-2 font-medium">
          Dashboard <span className="capitalize"> {pathname}</span>
        </p>
      </div>
      <div className="flex items-center gap-3">
        {modalOpen && (
          <button
            onClick={modalOpen}
            style={{ backgroundColor: currentColor }}
            className="px-3 py-2 text-sm rounded-md text-neutral flex items-center gap-1 font-medium hover:opacity-80 capitalize"
          >
            {buttonText}
          </button>
        )}
        {modalOpenTwo && (
          <button
            onClick={modalOpenTwo}
            style={{ backgroundColor: currentColor }}
            className="px-3 py-2 text-sm rounded-md text-neutral flex items-center gap-1 font-medium hover:opacity-80 capitalize"
          >
            {buttonTextTwo}
          </button>
        )}
      </div>
    </div>
  );
};

export default PageTitle;
