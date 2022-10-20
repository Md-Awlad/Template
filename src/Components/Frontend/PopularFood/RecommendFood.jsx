import {
  Box,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { staticAxios } from "../../../utils/myAxios";

const RecommendFood = () => {
  const { data: recommendFood = [] } = useQuery(["recommend"], async () => {
    const res = await staticAxios("/popularfood/");
    return res.data;
  });
  console.log(recommendFood);
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          md: "repeat(3,1fr)",
          sm: "repeat(2,1fr)",
          xs: "repeat(1,1fr)",
        },
        gap: 2,
      }}
    >
      {recommendFood?.map((item,index) => (
        <Paper
          key={index}
          sx={{
            width: 200,
            marginX: 1,
            marginY: 2,
            padding: 3,
            boxShadow: "0px 0px 5px 0px rgb(0 0 0 / 20%)",
            border: "1px solid",
          }}
        >
          <img
            className="w-36 h-36"
            src="https://www.imgacademy.com/themes/custom/imgacademy/images/helpbox-contact.jpg"
            alt=""
          />
          <Typography variant="h4">{item.food_name}</Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default RecommendFood;