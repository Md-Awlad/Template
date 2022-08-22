import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import Pizza from "./FoodItem/Pizza";
import { useStateContext } from "../../Contexts/ContextProvider";

const FoodCategory = ({ categories, foodRefetch }) => {
  const { currentMode } = useStateContext();
  console.log(categories);
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
              <Pizza  />
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default FoodCategory;
