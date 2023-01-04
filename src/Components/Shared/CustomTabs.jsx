import { Box, Tab, Tabs } from "@mui/material";
import React, { Fragment, Suspense, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStateContext } from "../../Contexts/ContextProvider";
import QueryLoader from "../Loaders/QueryLoader";
export const CustomTabs = ({ tabOptions }) => {
  const navigate = useNavigate();
  let { hash } = useLocation();
  const { currentMode, currentColor } = useStateContext();

  useEffect(() => {
    if (!hash) {
      navigate(`#${tabOptions[0].label?.toLowerCase()?.replace(/\s/g, "_")}`, {
        replace: true,
      });
    }
  }, [hash, navigate, tabOptions]);

  return (
    <Box
      sx={{ maxWidth: "90vw", padding: { xs: "15px 0px", md: 2 } }}
      className="dark:text-neutral dark:border-gray-600 dark:bg-secondary-dark-bg bg-neutral rounded-lg"
    >
      {Boolean(hash) && (
        <Fragment>
          <Tabs
            value={hash}
            onChange={(_, newHash) => navigate(newHash)}
            aria-label="basic tabs example"
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              "& button": {
                borderRadius: "5px 5px 0 0 ",
                color: `${currentMode === "Light" ? "#000" : "#fff"}`,
              },
              "& button.Mui-selected": {
                backgroundColor: `${currentColor}`,
                color: "white",
                "&:hover": {
                  backgroundColor: `${currentColor}`,
                  color: "white",
                },
              },
              "& button:hover": {
                backgroundColor: `${
                  currentMode === "Light" ? "#fff" : "#33373E"
                }`,
                color: `${currentMode === "Light" ? "#000" : "#fff"}`,
              },
            }}
          >
            {tabOptions
              ?.filter(({ visibility = true }) => visibility)
              ?.map(({ label }, index) => {
                return (
                  <Tab
                    label={label}
                    value={`#${label?.toLowerCase()?.replace(/\s/g, "_")}`}
                    key={index + "customTabs"}
                    sx={{
                      minWidth: { xs: 130, md: 110 },
                    }}
                  />
                );
              })}
          </Tabs>
          <Suspense
            fallback={
              <Box sx={{ height: 500 }}>
                <QueryLoader />
              </Box>
            }
          >
            {tabOptions
              ?.filter(({ visibility = true }) => visibility)
              ?.map(({ Component, props = {}, label }, index) => {
                return (
                  hash === `#${label?.toLowerCase()?.replace(/\s/g, "_")}` && (
                    <Component {...props} key={index + 78457834} />
                  )
                );
              })}
          </Suspense>
        </Fragment>
      )}
    </Box>
  );
};
