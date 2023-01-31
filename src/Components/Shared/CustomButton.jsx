import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Button } from "@mui/material";
import React from "react";
import { BiEdit } from "react-icons/bi";

const CustomButton = ({
  buttonText = "",
  buttonTextTwo = "",
  modalOpen = "",
  modalOpenTwo = false,
  editIcon = false,
}) => {
  return (
    <div>
      <div className="flex items-center gap-3">
        <Button
          variant="contained"
          onClick={modalOpen}
          sx={{ backgroundColor: "#0C4A6E" }}
          className="px-3 py-2 text-sm rounded-md text-neutral flex items-center gap-1 font-medium hover:opacity-80 capitalize"
        >
          {editIcon ? (
            <BiEdit className="inline text-xs font-bold " />
          ) : (
            <AddCircleIcon className="inline text-xs font-bold " />
          )}
          {buttonText}
        </Button>
        {modalOpenTwo && (
          <Button
            variant="contained"
            onClick={modalOpenTwo}
            sx={{ backgroundColor: "#0C4A6E" }}
            className="px-3 py-2 text-sm rounded-md text-neutral flex items-center gap-1 font-medium hover:opacity-80 capitalize"
          >
            {buttonTextTwo}
          </Button>
        )}
      </div>
    </div>
  );
};

export default CustomButton;
