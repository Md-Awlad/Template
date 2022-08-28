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

const FoodCategory = ({ categories }) => {
  const { currentMode } = useStateContext();
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
            <Typography sx={{ fontWeight: 500, fontSize: 18 }}>
              {item.name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Food category={item?.id} />
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default FoodCategory;
