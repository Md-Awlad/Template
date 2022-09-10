import React from "react";
import { Box } from "@mui/system";
import Grid from "@mui/material/Grid";
import MenuTabs from "../MenuTabs/MenuTabs";
import Cart from "../../Cart/Cart";

const Menu = () => {
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
      <Grid container sx={{ "& .MuiGrid-root": { margin: 0, padding: 3 } }}>
        <Grid item xs={12} md={8}>
          <MenuTabs />
        </Grid>
        <Grid item xs={12} md={4}>
          <Cart />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Menu;
