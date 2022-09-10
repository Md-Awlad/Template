import { Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import interceptor from "../../../../utils/interceptors";
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
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { data: categories = [] } = useQuery(["category"], async () => {
    const res = await interceptor("/category/");
    return res.data;
  });

  return (
    <div>
      <Box>
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            TabIndicatorProps={{
              hidden: true,
            }}
            sx={{
              "& .MuiTabs-flexContainer": {
                overflowX: "scroll",
              },
              "& button": {
                borderRadius: "5px 5px 0 0 ",
                color: "#000",
              },
              "& button.Mui-selected": {
                backgroundColor: "#FFC446",
                color: "#fff",
                fontWeight: 600,
              },
            }}
          >
            {categories?.map((category, index) => (
              <Tab label={category.name} key={index + 45674645} />
            ))}
            {/* <Tab label="Burgers" {...a11yProps(1)} />
            <Tab label="Sandwiches" {...a11yProps(2)} />
            <Tab label="Salads" {...a11yProps(3)} />
            <Tab label="Fried Chicken" {...a11yProps(4)} />
            <Tab label="Noodles" {...a11yProps(5)} />
            <Tab label="Noodles" {...a11yProps(6)} />
            <Tab label="Noodles" {...a11yProps(7)} />
            <Tab label="Noodles" {...a11yProps(8)} />
            <Tab label="Noodles" {...a11yProps(9)} />
            <Tab label="Noodles" {...a11yProps(10)} /> */}
          </Tabs>
          {categories?.map((category, index) => (
            <TabPanel value={value} index={index}>
              <Food setCart={setCart} id={category.id} cart={cart} />
            </TabPanel>
          ))}
        </Box>
        {/* <TabPanel value={value} index={0}>
          <Pizza setCart={setCart} cart={cart} products={products} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Burger />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Sandwiches />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Salad />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <FriedChicken />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <Noodles />
        </TabPanel> */}
      </Box>
    </div>
  );
};

export default MenuTabs;
