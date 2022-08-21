import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import Pizza from "./FoodItem/Pizza";
import Burger from "./FoodItem/Burger";
import Sandwich from "./FoodItem/Sandwich";
import Noodles from "./FoodItem/Noodles";
import { useStateContext } from "../../Contexts/ContextProvider";

const FoodCategory = () => {
  const { currentColor, currentMode } = useStateContext();
  return (
    <div>
      <Accordion
        sx={{
          backgroundColor: currentMode === "Dark" ? "#2b2a2a" : "#fff",
          color: currentMode === "Dark" ? "#fff" : "#2b2a2a",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{ fontWeight: 500, fontSize: 18 }}>Pizza</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <Pizza />
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          backgroundColor: currentMode === "Dark" ? "#2b2a2a" : "#fff",
          color: currentMode === "Dark" ? "#fff" : "#2b2a2a",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{ fontWeight: 500, fontSize: 18 }}>Burger</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <Burger />
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          backgroundColor: currentMode === "Dark" ? "#2b2a2a" : "#fff",
          color: currentMode === "Dark" ? "#fff" : "#2b2a2a",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{ fontWeight: 500, fontSize: 18 }}>
            Sandwich
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <Sandwich />
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          backgroundColor: currentMode === "Dark" ? "#2b2a2a" : "#fff",
          color: currentMode === "Dark" ? "#fff" : "#2b2a2a",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{ fontWeight: 500, fontSize: 18 }}>
            Noodles
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <Noodles />
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default FoodCategory;
