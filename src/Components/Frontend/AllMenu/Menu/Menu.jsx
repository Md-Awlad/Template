import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import React, { lazy } from "react";
import { useStateContext } from "../../../../Contexts/ContextProvider";

const Cart = lazy(() => import("../../Cart/Cart"));
const MenuTabs = lazy(() => import("../MenuTabs/MenuTabs"));
const Menu = () => {
  const { expandedMenu } = useStateContext();
  return (
    <Box
      sx={{
        flexGrow: 1,
        "& .MuiGrid-root": {
          width: "100%",
          marginTop: 2,
          marginLeft: 0,
        },
      }}
    >
      <Grid
        container
        sx={{
          "& .MuiGrid-root": {
            margin: 0,
            padding: 1,
          },
        }}
      >
        <Grid item xs={12} md={8}>
          {/* <CustomTabs tabOptions={}/> */}
          <MenuTabs />
        </Grid>
        {expandedMenu ? (
          <Grid item xs={12} md={4}>
            <Cart />
          </Grid>
        ) : (
          []
        )}
      </Grid>
    </Box>
  );
};

export default Menu;
