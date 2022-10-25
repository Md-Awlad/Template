import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import PopularFood from "./PopularFood";
import RecommendFood from "./RecommendFood";

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
      {value === index && <Box sx={{ mt: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const PopularFoodTabs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      {" "}
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "#F0A70B",
            },
            "& button": {
              color: "#000",
              borderRadius: "5px 5px 0 0 ",
              paddingX: 3,
            },
            "& button.Mui-selected": {
              backgroundColor: "#F0A70B",
              color: "#000",
            },
          }}
        >
          <Tab label="Popular Food" {...a11yProps(0)} />
          <Tab label="Recommend Food" {...a11yProps(1)} />
        </Tabs>
        {/* --dineIn-- */}
        <TabPanel value={value} index={0}>
          <PopularFood />
        </TabPanel>
        {/* --takeaway-- */}
        <TabPanel value={value} index={1}>
          <RecommendFood />
        </TabPanel>
      </Box>
    </div>
  );
};

export default PopularFoodTabs;
