import MenuIcon from "@mui/icons-material/Menu";
import { Box, Menu } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { Fragment } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";

import { useState } from "react";
import { useStateContext } from "../Contexts/ContextProvider";
import Sidebar from "./SidebarCopy";
import UserProfile from "./UserProfile";

const drawerWidth = 240;

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
  const {
    expandedMenu,
    setExpandedMenu,
    setMode,
    activeMenu,
    currentMode,
    restaurantData,
    currentUser: {
      information_user,
      organization,
      user,
      profile_pic,
      // position: { permission_position: { company = false } = {} },
    } = {},
  } = useStateContext();

  const [profileAnchor, setProfileAnchor] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [isDarkMode, setIsDarkMode] = React.useState(
    Boolean(currentMode === "Dark")
  );
  const toggleTheme = () => {
    setMode(currentMode === "Light" ? "Dark" : "Light");
  };

  const handleDrawerToggle = () => {
    setExpandedMenu(!expandedMenu);
  };

  return (
    <Fragment>
      <AppBar
        position="fixed"
        open={expandedMenu}
        sx={{
          bgcolor: Boolean(currentMode === "Dark") ? "#33373e" : "#fff",
          display: { xs: expandedMenu ? "none" : "block", md: "block" },
          boxShadow: "0",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            bgcolor: Boolean(currentMode === "Dark") ? "#33373e" : "#fff",
          }}
        >
          {/* <Box className="flex justify-between items-center">
            <IconButton
              onClick={handleDrawerToggle}
              edge="start"
              sx={{
                marginRight: 2,
                display: { xs: activeMenu ? "none" : "block", sm: "block" },
                color: isDarkMode ? "#fff" : "#33373e",
              }}
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              disableRipple
              color="inherit"
              edge="start"
              component={Link}
              to="/"
              sx={{
                ...(activeMenu && { display: "none" }),
                color: isDarkMode ? "#fff" : "#33373e",
                ml: "8px",
              }}
            >
              {restaurantData?.map((data, index) => (
                <Box
                  key={index}
                  component="img"
                  src={data?.logo}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = "https://i.ibb.co/0q5B8VP/MainLogo.png";
                  }}
                  sx={{
                    width: "50px",
                  }}
                />
              ))}
            </IconButton>
          </Box> */}
          <Box className="flex justify-between items-center">
            <IconButton
              onClick={handleDrawerToggle}
              edge="start"
              sx={{
                marginRight: 2,
                display: { xs: activeMenu ? "none" : "block", sm: "block" },
                color: isDarkMode ? "#fff" : "#33373e",
              }}
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              disableRipple
              color="inherit"
              edge="start"
              component={Link}
              to="/"
              sx={{
                ...(activeMenu && { display: "none" }),
                color: isDarkMode ? "#fff" : "#33373e",
                ml: "8px",
              }}
            >
              {restaurantData?.map((data, index) => (
                <Box
                  key={index}
                  component="img"
                  src={data?.logo}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = "https://i.ibb.co/0q5B8VP/MainLogo.png";
                  }}
                  sx={{
                    width: "50px",
                  }}
                />
              ))}
            </IconButton>
          </Box>
          <Box className=" flex items-center justify-between space-x-1">
            {/* {company && Boolean(branches?.length > 1) && ( */}
            <Box
              id="branch_switch__guide__anchor"
              sx={{
                display: { xs: "none", md: "block" },
                width: 200,
              }}
            >
              {/* <BranchSelector /> */}
            </Box>
            {/* )} */}
            {/* <DarkModeToggle
              className="dark_mode_switch__guide__anchor"
              onChange={toggleTheme}
              value={currentMode === "Light" ? "Light" : "Dark"}
              checked={Boolean(currentMode === "Dark")}
              size={50}
            /> */}

            <div
              className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
              onClick={(event) => setProfileAnchor(event.currentTarget)}
            >
              <div className="flex items-center">
                <img
                  className="rounded-full w-8 h-8 "
                  src={profile_pic}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = "https://i.ibb.co/0q5B8VP/MainLogo.png";
                  }}
                  alt="profile"
                />
              </div>

              <p>
                <span className="text-gray-400 text-14">Hi,</span>{" "}
                <span className="text-gray-400 font-bold ml-1 text-14">
                  {user?.username ? user?.username : "user"}
                </span>
              </p>
              <MdKeyboardArrowDown className="text-gray-400 text-14" />
            </div>

            <Menu
              keepMounted
              id="profileAnchor-appbar"
              anchorEl={profileAnchor}
              open={Boolean(profileAnchor)}
              onClose={() => setProfileAnchor(null)}
              PaperProps={{
                sx: {
                  bgcolor: currentMode === "Dark" ? "#33373E" : "#fff",
                  borderRadius: 1,
                },
              }}
              sx={{
                mt: "45px",
                "& .MuiMenu-list": {
                  paddingY: "0",
                },
              }}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <UserProfile closeUserProfile={() => setProfileAnchor(null)} />
            </Menu>

            {/* notification  */}
            <Menu
              keepMounted
              id="notificationAnchor-appbar"
              anchorEl={notificationAnchor}
              open={Boolean(notificationAnchor)}
              onClose={() => setNotificationAnchor(null)}
              PaperProps={{
                sx: {
                  bgcolor: currentMode === "Dark" ? "#33373E" : "#fff",
                  borderRadius: 1,
                },
              }}
              sx={{
                mt: "45px",
                "& .MuiMenu-list": {
                  paddingY: "0",
                },
              }}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              {/* <Notification
                notifications={[]}
                handleClose={() => setNotificationAnchor(null)}
              /> */}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={expandedMenu}
        sx={{
          "& .MuiPaper-root": {
            bgcolor: Boolean(currentMode === "Dark") ? "#20232a" : "#fff",
            zIndex: 100,
          },
        }}
      >
        <Divider />
        <Sidebar />
      </Drawer>
    </Fragment>
  );
};

export default Navbar;
