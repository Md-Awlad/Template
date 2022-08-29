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

const FoodCategory = ({ categories }) => {
  const { currentMode } = useStateContext();
  const [deleteId, setDeleteId] = useState(false);
  return (
    <div>
      {categories.map((item, index) => (
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
            <div className="flex items-center gap-6">
              <Typography sx={{ fontWeight: 500, fontSize: 18 }}>
                <RiDeleteBin6Line
                  onClick={() => setDeleteId(true)}
                  className="text-dark-color dark:text-neutral text-lg cursor-pointer"
                />
              </Typography>
              <Typography sx={{ fontWeight: 500, fontSize: 18 }}>
                {item.name}
              </Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Food category={item?.id} />
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
      {Boolean(deleteId) && (
        <DeleteCategory deleteId={deleteId} handleClose={() => setDeleteId()} />
      )}
    </div>
  );
};

export default FoodCategory;
