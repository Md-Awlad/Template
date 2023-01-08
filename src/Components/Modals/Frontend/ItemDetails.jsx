import { Box, Rating, Typography } from "@mui/material";
import React from "react";
import { MdClose } from "react-icons/md";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fff",
  border: "2px solid #fff",
  borderRadius: "5px",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 2,
};

const ItemDetails = ({ handleModalClose, item }) => {
  return (
    <Box sx={{ ...style, height: 500, overflowY: "scroll" }}>
      <MdClose
        onClick={handleModalClose}
        className="absolute right-2 top-2 cursor-pointer text-red-600 text-lg border border-gray-700 rounded-full"
      />
      {/* --title-- */}
      <Typography
        component="span"
        variant="h6"
        sx={{
          fontWeight: 600,
          fontSize: 18,
        }}
      >
        {item.food_name}
      </Typography>
      {/* --rating-- */}
      <div className="flex justify-end">
        <div>
          <Typography
            component="span"
            sx={{ fontSize: 12, fontWeight: "bold" }}
            component="legend"
          >
            Review: {item.review}
          </Typography>{" "}
          <Rating
            name="read-only"
            defaultValue={item.review}
            precision={0.5}
            size="small"
            readOnly
          />
        </div>
      </div>
      {/* --image-- */}
      <div className="w-72 bg-[#F0A70B] rounded-tl-3xl rounded-br-3xl relative mt-16">
        <div className="relative">
          <div className="flex justify-between items-center pt-40 pb-5 px-4">
            <div className="font-bold">
              <Typography
                component="span"
                variant="h6"
                sx={{
                  width: 50,
                  fontWeight: 600,
                  fontSize: 16,
                  borderBottom: "1px solid",
                  borderStyle: "dashed",
                }}
              >
                Size
              </Typography>
              {Object.entries(item?.price).map((key, index) => (
                <h2 key={index} className="text-sm py-1">
                  {key[0]}
                </h2>
              ))}
            </div>

            <div className="font-bold">
              <Typography
                component="span"
                variant="h6"
                sx={{
                  width: 50,
                  fontWeight: 600,
                  fontSize: 16,
                  borderBottom: "1px solid",
                  borderStyle: "dashed",
                }}
              >
                Price
              </Typography>
              {Object.entries(item?.price).map((key, index) => (
                <h2 key={index} className="text-sm py-1">
                  {key[1]} TK
                </h2>
              ))}
            </div>
          </div>
        </div>
        <Box className="absolute -right-10 -top-16">
          <img className="w-40 h-40 object-contain" src={item.image} alt="" />
        </Box>
      </div>
      {/* --desc-- */}
      <Box sx={{ my: 3 }}>
        <Typography
          component="span"
          variant="h6"
          sx={{
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          Details
        </Typography>
        <Typography
          component="span"
          variant="h6"
          sx={{
            fontSize: 14,
            fontWeight: 300,
          }}
        >
          {item.food_detail}
        </Typography>
      </Box>
    </Box>
  );
};

export default ItemDetails;
