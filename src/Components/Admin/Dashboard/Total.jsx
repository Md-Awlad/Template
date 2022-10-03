import React from "react";
import { MdFastfood } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { useStateContext } from "../../../Contexts/ContextProvider";
import { BsCartCheckFill, BsCurrencyDollar } from "react-icons/bs";
import { FiCheckCircle } from "react-icons/fi";
import { Box, Typography } from "@mui/material";

const Total = ({ orders }) => {
  const { currentColor } = useStateContext();
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          lg: " repeat(4, 1fr)",
          sm: "repeat(2,1fr)",
        },
        gap: 2,
      }}
      // className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-5"
    >
      {/* --food-- */}
      <div className="bg-neutral dark:bg-secondary-dark-bg dark:text-neutral md:px-3 px-6 py-8 border rounded-md text-2xl font-semibold shadow-sm dark:border-gray-700">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <MdFastfood
            style={{
              color: currentColor,
              backgroundColor: `${currentColor}40`,
            }}
            className="inline w-12 h-12 p-2 rounded-full"
          />
          <Box>
            <Typography
              variant="h6"
              sx={{ fontSize: "16px" }}
              // className="text-sm text-gray-600"
            >
              Total Food
            </Typography>
            <Typography
              variant="h5"
              sx={{ fontWeight: 500, textAlign: "center" }}
            >
              {orders.total_food}
            </Typography>
          </Box>
        </Box>
      </div>
      {/* --category-- */}
      <div className="bg-neutral dark:bg-secondary-dark-bg dark:text-neutral md:px-3 px-6 py-8 border rounded-md text-2xl font-semibold shadow-sm dark:border-gray-700">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <BiCategoryAlt
            style={{
              color: currentColor,
              backgroundColor: `${currentColor}40`,
            }}
            className="inline w-12 h-12 p-2 rounded-full"
          />
          <Box>
            <Typography
              variant="h6"
              sx={{ fontSize: "16px" }}
              // className="text-sm text-gray-600"
            >
              Total Category
            </Typography>
            <Typography
              variant="h5"
              sx={{ fontWeight: 500, textAlign: "center" }}
            >
              {orders.total_category}
            </Typography>
          </Box>
        </Box>
      </div>
      {/* --order-- */}
      <div className="bg-neutral dark:bg-secondary-dark-bg dark:text-neutral md:px-3 px-6 py-8 border rounded-md text-2xl font-semibold shadow-sm dark:border-gray-700">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <BsCartCheckFill
            style={{
              color: currentColor,
              backgroundColor: `${currentColor}40`,
            }}
            className="inline w-12 h-12 p-2 rounded-full"
          />
          <Box>
            <Typography
              variant="h6"
              sx={{ fontSize: "16px" }}
              // className="text-sm text-gray-600"
            >
              Total Orders
            </Typography>
            <Typography
              variant="h5"
              sx={{ fontWeight: 500, textAlign: "center" }}
            >
              {orders.total_order}
            </Typography>
          </Box>
        </Box>
      </div>
      {/* --complete-- */}
      <div className="bg-neutral dark:bg-secondary-dark-bg dark:text-neutral md:px-3 px-6 py-8 border rounded-md text-2xl font-semibold shadow-sm dark:border-gray-700">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <FiCheckCircle
            style={{
              color: currentColor,
              backgroundColor: `${currentColor}40`,
            }}
            className="inline w-12 h-12 p-2 rounded-full"
          />
          <Box>
            <Typography
              variant="h6"
              sx={{ fontSize: "16px" }}
              // className="text-sm text-gray-600"
            >
              Complete Order
            </Typography>
            <Typography
              variant="h5"
              sx={{ fontWeight: 500, textAlign: "center" }}
            >
              {orders.total_complete_order}
            </Typography>
          </Box>
        </Box>
      </div>
    </Box>
  );
};

export default Total;
