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
          <Typography>{children}</Typography>
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
    <Box>
      {restaurantData?.map((data, index) => (
        <Tabs
          key={index}
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: data?.color || "#F0A70B",
            },
            "& button": {
              color: "#000",
              borderRadius: "5px 5px 0 0 ",
              marginLeft: { md: 2 },
              paddingX: 3,
            },
            "& button.Mui-selected": {
              backgroundColor: data?.color || "#F0A70B",
              color: data?.color ? "#fff" : "#000",
            },
          }}
        >
          {categories?.map((category, index) => (
            <Tab label={category.name} key={index + 45674645} />
          ))}
        </Tabs>
      ))}
      {categories?.map((category, index) => (
        <TabPanel key={index} value={value} index={index}>
          <Food setCart={setCart} id={category.id} cart={cart} />
        </TabPanel>
      ))}
    </Box>
  );
};

export default MenuTabs;
