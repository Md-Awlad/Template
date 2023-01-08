import { Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useStateContext } from "../../../../Contexts/ContextProvider";
import { staticAxios } from "../../../../utils/myAxios";
import Food from "../MenuItem/Food";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const MenuTabs = ({ setCart, cart }) => {
  const { restaurantData } = useStateContext();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { data: categories = [] } = useQuery(["category"], async () => {
    const res = await staticAxios("/category/");
    return res.data;
  });
  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          "& .MuiTabs-indicator": {
            backgroundColor: restaurantData?.color || "#F0A70B",
          },
          "& button": {
            color: "#000",
            backgroundColor: "#FAFAEE",
            borderRadius: "5px 5px 0 0 ",
          },
          "& button.Mui-selected": {
            backgroundColor: restaurantData?.color || "#F0A70B",
            color: restaurantData?.color ? "#fff" : "#000",
          },
        }}
      >
        {categories?.map((category, index) => (
          <Tab label={category.name} key={index + 45674645} />
        ))}
      </Tabs>

      {categories?.map((category, index) => {
        return (
          <TabPanel key={category.id} value={value} index={index}>
            <Food
              setCart={setCart}
              id={category.id}
              cart={cart}
              category={category}
            />
          </TabPanel>
        );
      })}
    </>
  );
};

export default MenuTabs;
