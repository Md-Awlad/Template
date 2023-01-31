import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Box, Tooltip } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { Fragment } from "react";
import { useStateContext } from "../Contexts/ContextProvider";
import Sidebar from "./Sidebar";
import UserProfile from "./UserProfile";

const drawerWidth = 270;

const openedMixin = (theme) => ({
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: drawerWidth,
  },
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: 0,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(10)} + 1px)`,
  },
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Navbar = () => {
  const { expandedMenu, setExpandedMenu, setDrawerToggle } = useStateContext();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setDrawerToggle((prev) => !prev);
    setExpandedMenu(!expandedMenu);
  };

  return (
    <Fragment>
      <AppBar
        position="fixed"
        open={expandedMenu}
        sx={{
          bgcolor: "#fff",
          display: { xs: expandedMenu ? "none" : "block", md: "block" },
          boxShadow: "0",
          borderBottom: "1px solid #ccc",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Box className="flex justify-between items-center">
            <IconButton
              onClick={handleDrawerToggle}
              edge="start"
              sx={{
                marginRight: 2,
                display: { xs: expandedMenu ? "none" : "block", sm: "block" },
                color: "#33373e",
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar />
              </IconButton>
            </Tooltip>
            <UserProfile
              open={open}
              anchorEl={anchorEl}
              handleClose={handleClose}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={expandedMenu}
        sx={{
          "& .MuiPaper-root": {
            bgcolor: "#fff",
            zIndex: 100,
          },
        }}
      >
        <Sidebar />
      </Drawer>
    </Fragment>
  );
};

export default Navbar;
