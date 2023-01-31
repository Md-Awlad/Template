import MenuIcon from "@mui/icons-material/Menu";
import mainLogo from "../image/Awlad_icon.png";
import { Box, IconButton, Typography } from "@mui/material";
import { MdDashboard } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";

const Sidebar = () => {
  const navigate = useNavigate();
  const { expandedMenu, setExpandedMenu, drawerToggle, screenSize } =
    useStateContext();

  const handleCloseSidebar = () => {
    if (expandedMenu && screenSize <= 900) {
      setExpandedMenu(false);
    }
  };

  const sidebarMenu = [
    {
      path: "/dashboard",
      icon: MdDashboard,
      name: "Dashboard",
    },
  ];

  const handleDrawerToggle = () => {
    setExpandedMenu(!expandedMenu);
  };

  return (
    <Box
      className="h-screen pb-5 bg-white "
      sx={{
        overflowY: { xs: expandedMenu ? "auto" : "hidden", md: "hidden" },
        "&:hover": {
          overflowY: { md: "auto" },
        },
      }}
    >
      {expandedMenu && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: { xs: "5px", md: 2 },
            px: 2,
          }}
        >
          <Box
            onClick={handleCloseSidebar}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <Box
              component="img"
              src={mainLogo}
              onClick={() => navigate("/")}
              sx={{
                width: "50px",
                maxHeight: "50px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            />
            <Typography
              component="span"
              variant="h6"
              sx={{
                whiteSpace: "pre-wrap",
              }}
            >
              Mohammad Awlad
            </Typography>
          </Box>

          <IconButton
            onClick={handleDrawerToggle}
            edge="start"
            sx={{
              display: { xs: expandedMenu ? "block" : "none", sm: "none" },
              color: "#33373e",
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      )}
      <Box
        // id={!expandedMenu ? "" : "drawer__guide__anchor"}
        id={!expandedMenu ? "" : "drawer__guide__anchor"}
        onMouseOver={() => {
          drawerToggle && setExpandedMenu(drawerToggle);
        }}
        onMouseLeave={() => {
          drawerToggle && setExpandedMenu(!drawerToggle);
        }}
        sx={{
          mt: !expandedMenu && 10,
        }}
      >
        {sidebarMenu?.map(
          ({ path, icon: NavIcon, name, visibility = true }, idx) => {
            if (!visibility) {
              return false;
            }

            if (expandedMenu) {
              // expanded menus
              return (
                <NavLink
                  key={idx + 7865476}
                  to={path}
                  onClick={handleCloseSidebar}
                  style={({ isActive }) => ({
                    backgroundColor: isActive && "#0C4A6E",
                  })}
                  className={({ isActive }) =>
                    isActive
                      ? "flex  items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-neutral text-md m-2"
                      : "flex  items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 hover:bg-light-gray m-2"
                  }
                >
                  <Typography
                    component="span"
                    className="flex items-center gap-5    "
                  >
                    <NavIcon className="text-xl" />
                    {name}
                  </Typography>
                </NavLink>
              );
            } else {
              return (
                <NavLink
                  key={idx + 7865476}
                  to={path}
                  onClick={handleCloseSidebar}
                  style={({ isActive }) => ({
                    backgroundColor: isActive && "#0C4A6E",
                  })}
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center m-3 px-4 py-2 rounded-lg text-neutral  text-md"
                      : "flex items-center m-3 px-4 py-2 rounded-lg text-md text-gray-700 hover:bg-light-gray"
                  }
                >
                  <NavIcon className="text-xl" />
                </NavLink>
              );
            }
          }
        )}
      </Box>
    </Box>
  );
};

export default Sidebar;
