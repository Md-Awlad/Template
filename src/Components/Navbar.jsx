import { Home } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Button, Menu } from "@mui/material";
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
import { useStateContext } from "../Contexts/ContextProvider";
import Sidebar from "./Sidebar";
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
  const [userProfile, setUserProfile] = React.useState(null);
  const {
    activeMenu,
    setActiveMenu,
    setMode,
    currentMode,
    restaurantData,
    currentUser: { first_name, profile_pic },
  } = useStateContext();
  const [isDarkMode, setIsDarkMode] = React.useState(
    Boolean(currentMode === "Dark")
  );
  const toggleTheme = () => {
    setMode(currentMode === "Light" ? "Dark" : "Light");
    setIsDarkMode(currentMode === "Dark" ? false : true);
  };

  const handleDrawerToggle = () => {
    setActiveMenu(!activeMenu);
  };

  return (
    <Fragment>
      <AppBar
        position="fixed"
        open={activeMenu}
        sx={{
          bgcolor: !isDarkMode ? "#fff" : "#33373e",
          display: { xs: activeMenu ? "none" : "block", md: "block" },
          boxShadow: "0",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            bgcolor: !isDarkMode ? "#fff" : "#33373e",
          }}
        >
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
                    objectFit: "cover",
                    maxWidth: "100px",
                    height: "54px",
                  }}
                />
              ))}
            </IconButton>
          </Box>
          <div className="flex items-center justify-between space-x-1">
            {/* <DarkModeToggle
              onChange={toggleTheme}
              value={currentMode === "Light" ? "Light" : "Dark"}
              checked={!isDarkMode}
              size={50}
            /> */}
            <Box>
              <Link target={"_blank"} to="/">
                <Button
                  variant="contained"
                  sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Home /> {activeMenu && "Go to Store"}
                </Button>
              </Link>
            </Box>
            {restaurantData?.map((data, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
                  onClick={(event) => setUserProfile(event.currentTarget)}
                >
                  <div className="flex items-center">
                    <img
                      className="rounded-full w-8 h-8 "
                      src={profile_pic}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src =
                          "https://i.ibb.co/0q5B8VP/MainLogo.png";
                      }}
                      alt=""
                    />
                  </div>

                  <p>
                    <span className="text-gray-400 text-14">Hi,</span>{" "}
                    <span className="text-gray-400 font-bold ml-1 text-14">
                      {first_name ?? "user"}
                    </span>
                  </p>
                  <MdKeyboardArrowDown className="text-gray-400 text-14" />
                </div>
              );
            })}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={userProfile}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(userProfile)}
              onClose={() => setUserProfile(null)}
            >
              <UserProfile closeUserProfile={() => setUserProfile(null)} />
            </Menu>

            {/* {notification && <Notification />} */}
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={activeMenu}
        sx={{
          "& .MuiPaper-root": {
            bgcolor: isDarkMode ? "#20232a" : "#fff",
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
