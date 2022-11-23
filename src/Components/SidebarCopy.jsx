  import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Box, Collapse, Typography } from "@mui/material";
import { FiCheckCircle, FiSettings } from "react-icons/fi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import MainLogo from "../image/MainLogo.png";
import { useState } from "react";
import { AiOutlineCloseCircle, AiOutlineFileProtect } from "react-icons/ai";
import { BsCartCheckFill } from "react-icons/bs";
import { HiDocumentReport } from "react-icons/hi";
import { MdDashboard, MdFastfood, MdOutlineCancel } from "react-icons/md";
import { TbShoppingCartDiscount } from "react-icons/tb";
import { useStateContext } from "../Contexts/ContextProvider";
const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(pathname);
  const {
    expandedMenu,
    setExpandedMenu,

    screenSize,
    currentColor,
    currentMode,
    restaurantData,
    currentUser: {
      organization: { logo: orgLogo = null, name: orgName = null } = {},
      position: {
        permission_position: {
          company = false,
          create_branch = false,
          create_position = false,
          create_user = false,
          attendance = false,
          salary = false,
          create_roster = false,
        } = {},
        subordinate = [],
      } = {},
    },
  } = useStateContext();

  const handleCloseSidebar = () => {
    if (expandedMenu && screenSize <= 900) {
      setExpandedMenu(false);
    }
  };

  const sidebarMenu = [
    {
      path: "dashboard",
      icon: MdDashboard,
      name: "Dashboard",
    },
    {
      path: "fooditem",
      icon: MdFastfood,
      name: "food item",
    },

    {
      path: "order",
      icon: BsCartCheckFill,
      name: "order",
    },
    {
      path: "completeOrder",
      icon: FiCheckCircle,
      name: "Completed Order",
    },
    {
      path: "cancelorder",
      icon: AiOutlineCloseCircle,
      name: "Cancel Order",
    },
    {
      path: "discount",
      icon: TbShoppingCartDiscount,
      name: "discount",
    },
    {
      path: "report",
      icon: HiDocumentReport,
      name: "Report",
    },
    {
      path: "surveylist",
      icon: AiOutlineFileProtect,
      name: "survey",
    },
    {
      path: "settings",
      icon: FiSettings,
      name: "settings",
    },
  ];

  const handleDrawerToggle = () => {
    setExpandedMenu(!expandedMenu);
  };

  return (
    <Box
      className="h-screen pb-5"
      sx={{
        overflowY: { xs: expandedMenu ? "auto" : "hidden", md: "hidden" },
        "&:hover": {
          overflowY: { md: "auto" },
        },
        bgcolor: currentMode === "Dark" ? "#33373e" : "#fff",
        color: currentMode === "Dark" ? "#fff" : "#000",
      }}
    >
      {expandedMenu && (
        <Box className="flex justify-between items-center">
          {restaurantData?.map((data, index) => (
            <Box
              key={index}
              to="/"
              onClick={handleCloseSidebar}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                px: 1,
                mt: 2,
              }}
            >
              <Box
                component="img"
                src={data?.logo}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = "https://i.ibb.co/0q5B8VP/MainLogo.png";
                }}
                sx={{
                  width: "35px",
                }}
              />

              <Typography variant="h6" className="dark:text-neutral">
                {data?.name || "Nexis Menu"}
              </Typography>
            </Box>
          ))}
          <button
            type="button"
            onClick={() => setActiveMenu(!activeMenu)}
            style={{ color: currentColor }}
            className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block lg:hidden "
          >
            <MdOutlineCancel />
          </button>
        </Box>
      )}
      <Box
        id={!expandedMenu ? "" : "drawer__guide__anchor"}
        // onMouseOver={() => handleDrawerToggle()}
        // onMouseLeave={handleDrawerToggle}
        sx={{
          mt: !expandedMenu && 10,
        }}
      >
        {sidebarMenu.map(
          ({ path, icon: NavIcon, name, children, visibility = true }, idx) => {
            if (!visibility) {
              return false;
            }

            if (Boolean(children?.length)) {
              return (
                <Box
                  key={idx + 7865476}
                  sx={{
                    borderRadius: 3,
                    borderColor: currentColor,
                    ml: 1,
                  }}
                >
                  <Box
                    className="flex justify-between items-center gap-5 pl-4 py-3  pr-3 rounded-lg text-md hover:text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-gray-200 my-1"
                    sx={{ cursor: "pointer" }}
                    onClick={() =>
                      Boolean(activeMenu.includes(path))
                        ? setActiveMenu("")
                        : setActiveMenu(path)
                    }
                  >
                    <Typography className="flex items-center gap-5">
                      <NavIcon /> {expandedMenu && name}
                    </Typography>

                    {Boolean(activeMenu.includes(path)) ? (
                      <ArrowDropUpIcon
                        sx={{ display: !expandedMenu && "none" }}
                        className={expandedMenu ? "text-md" : "text-2xl"}
                      />
                    ) : (
                      <ArrowDropDownIcon
                        sx={{ display: !expandedMenu && "none" }}
                        className={expandedMenu ? "text-md" : "text-2xl"}
                      />
                    )}
                  </Box>
                  <Collapse in={Boolean(activeMenu.includes(path))}>
                    {children.map((subMenu, index) => {
                      if (expandedMenu) {
                        // expanded menus
                        return (
                          <NavLink
                            key={index + 534756}
                            to={path + "/" + subMenu.path}
                            onClick={handleCloseSidebar}
                            style={({ isActive }) => ({
                              backgroundColor: isActive ? currentColor : "",
                            })}
                            className={({ isActive }) =>
                              isActive
                                ? "flex items-center gap-5 pl-4 pt-3 pb-2.5  rounded-lg text-neutral text-md mt-2 ml-10 mr-4"
                                : "flex items-center gap-5 pl-4 pt-3 pb-2.5  rounded-lg text-md hover:text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-gray-200 m-2 ml-10 mr-4"
                            }
                          >
                            <Typography component="span" className="capitalize">
                              {subMenu.name}
                            </Typography>
                          </NavLink>
                        );
                      } else {
                        // collapsed menus
                        return (
                          <NavLink
                            key={index + 534756}
                            to={path + "/" + subMenu.path}
                            onClick={handleCloseSidebar}
                            style={({ isActive }) => ({
                              backgroundColor: isActive ? currentColor : "",
                            })}
                            className={({ isActive }) =>
                              isActive
                                ? "flex  items-center pl-2 py-2 rounded-lg  text-neutral  text-md mt-2 mr-4"
                                : "flex  items-center pl-2 py-2 rounded-lg text-md hover:text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray mt-2 mr-4"
                            }
                          >
                            <NavIcon className="text-xl" />
                          </NavLink>
                        );
                      }
                    })}
                  </Collapse>
                </Box>
              );
            }

            if (expandedMenu) {
              // expanded menus
              return (
                <NavLink
                  key={idx + 7865476}
                  to={path}
                  onClick={handleCloseSidebar}
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? currentColor : "",
                  })}
                  className={({ isActive }) =>
                    isActive
                      ? "flex  items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  dark:text-gray-200 text-neutral text-md m-2"
                      : "flex  items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md  dark:text-gray-200  dark:hover:text-gray-800 hover:bg-gray-200 m-2"
                  }
                >
                  <NavIcon />
                  <Typography component="span" className="capitalize ">
                    {name}
                  </Typography>
                </NavLink>
              );
            } else {
              // collapsed menus
              return (
                <NavLink
                  key={idx + 7865476}
                  to={path}
                  onClick={handleCloseSidebar}
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? currentColor : "",
                  })}
                  className={({ isActive }) =>
                    isActive
                      ? "flex  items-center m-3 p-2 rounded-lg  text-neutral  text-md"
                      : "flex  items-center m-3 p-2 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray"
                  }
                >
                  <NavIcon className="text-3xl" />
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
