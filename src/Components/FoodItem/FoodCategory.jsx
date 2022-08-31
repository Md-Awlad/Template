import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import Food from "./FoodItem/Food";
import { useStateContext } from "../../Contexts/ContextProvider";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import DeleteCategory from "../Modals/DeleteCategory";
import { MdModeEdit } from "react-icons/md";
import EditCategory from "../Modals/EditCategory";

const FoodCategory = ({ categories }) => {
  const { currentMode } = useStateContext();
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  return (
    <div>
      {categories?.map((item, index) => (
        <Accordion
          key={index}
          sx={{
            backgroundColor: currentMode === "Dark" ? "#33373E" : "#fff",
            color: currentMode === "Dark" ? "#fff" : "#2b2a2a",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <div className="flex items-center gap-4">
              <Typography sx={{ fontWeight: 500, fontSize: 18 }}>
                <img className="w-14 h-14" src={item.image} alt="" />
              </Typography>
              <Typography sx={{ fontWeight: 500, fontSize: 18 }}>
                {item.name}
              </Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                justifyContent: "end",
                fontWeight: 500,
                fontSize: 18,
                marginBottom: 3,
              }}
            >
              <button
                onClick={() => setEditId(item.id)}
                className="flex items-center gap-1 bg-teal-700 text-white w-20 py-1 justify-center rounded-md text-sm shadow-lg"
              >
                <MdModeEdit />
                <h3>Edit</h3>
              </button>
              <button
                onClick={() => setDeleteId(item.id)}
                className="flex items-center gap-1 bg-red-400 text-white w-20 py-1 justify-center rounded-md text-sm shadow-lg"
              >
                <RiDeleteBin6Line />
                <h3>Delete</h3>
              </button>
            </Typography>
            <Typography>
              <Food category={item} />
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
      {Boolean(editId) && (
        <EditCategory editId={editId} handleClose={() => setEditId()} />
      )}
      {Boolean(deleteId) && (
        <DeleteCategory
          deleteId={deleteId}
          handleModalClose={() => setDeleteId()}
        />
      )}
    </div>
  );
};

export default FoodCategory;
