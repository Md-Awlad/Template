import MenuIcon from "@mui/icons-material/Menu";
import { Box, Collapse, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import {
  AiFillWarning,
  AiOutlineCloseCircle,
  AiTwotoneNotification,
} from "react-icons/ai";
import { BsArrowUpSquare, BsCartCheckFill } from "react-icons/bs";
import { CgFileDocument } from "react-icons/cg";
import { FiCheckCircle } from "react-icons/fi";
import { HiDocumentReport, HiOutlineDocumentReport } from "react-icons/hi";
import {
  MdDashboard,
  MdFastfood,
  MdOutlineFastfood,
  MdOutlineReviews,
} from "react-icons/md";
import { TbFileSettings, TbShoppingCartDiscount } from "react-icons/tb";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";

const Sidebar_copy = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(pathname);
  const {
    expandedMenu,
    setExpandedMenu,
    screenSize,
    currentColor,
    restaurantData,
  } = useStateContext();

  const handleCloseSidebar = () => {
    if (expandedMenu && screenSize <= 900) {
      setExpandedMenu(false);
    }
  };

  const sidebarMenu = [
    {
      path: "",
      icon: MdDashboard,
      name: "dashboard",
    },
    {
      path: "/customfood",
      icon: MdFastfood,
      name: "Branch",
      // visibility: create_branch,
    },
    {
      path: "/fooditem",
      icon: MdOutlineFastfood,
      name: "Payroll",
      // visibility: salary,
    },
    {
      path: "/order",
      icon: BsCartCheckFill,
      name: "employees",
      // visibility: create_user,
    },
    {
      path: "/completeOrder",
      icon: FiCheckCircle,
      name: "attendance",
      // visibility: attendance,
    },
    {
      path: "/cancelorder",
      icon: AiOutlineCloseCircle,
      name: "Requests",
    },
    {
      path: "/discount",
      icon: TbShoppingCartDiscount,
      name: "Roster",
      // visibility: create_roster,
    },
    {
      path: "/report",
      icon: HiOutlineDocumentReport,
      name: "Shift",
      // visibility: create_roster,
    },
    {
      path: "/surveylist",
      icon: MdOutlineReviews,
      name: "Review",
      // visibility: Boolean(subordinate?.length),
    },
    {
      path: "/report",
      icon: HiDocumentReport,
      name: "Report",
      // visibility: create_user,
    },
    {
      path: "/position",
      icon: TbFileSettings,
      name: "Position",
      // visibility: create_position,
    },
    {
      path: "/policies",
      icon: CgFileDocument,
      name: "Policies",
    },
    {
      path: "/complains",
      icon: AiFillWarning,
      name: "Complains",
    },

    {
      path: "/noticeboard",
      icon: AiTwotoneNotification,
      name: "Noticeboard",
      // visibility: Boolean(company || create_branch),
    },
  ];

  const handleDrawerToggle = () => {
    setExpandedMenu(!expandedMenu);
  };

  return (
    <Box
      className="h-screen pb-5 bg-white dark:bg-secondary-dark-bg"
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
              gap: 2,
            }}
          >
            <Box
              component="img"
              src={restaurantData?.map((data) => data?.logo) || ""}
              onClick={() => navigate("/")}
              sx={{
                width: "50px",
                maxHeight: "50px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            />
            <Typography
              variant="h6"
              className="dark:text-neutral"
              sx={{
                whiteSpace: "pre-wrap",
              }}
            >
              {restaurantData?.map((data) => data?.logo)}
            </Typography>
          </Box>
          <IconButton
            onClick={handleDrawerToggle}
            edge="start"
            sx={{
              display: { xs: expandedMenu ? "block" : "none", sm: "none" },
              // color: Boolean(currentMode === "Dark") ? "#fff" : "#33373e",
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      )}
      <Box
        id={!expandedMenu ? "" : "drawer__guide__anchor"}
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
                    borderLeft:
                      Boolean(activeMenu.includes(path)) && "2px solid",
                    borderRadius: 3,
                    borderColor: currentColor,
                    ml: 1,
                  }}
                >
                  <Typography
                    className="flex  items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray"
                    sx={{ cursor: "pointer" }}
                    onClick={() =>
                      Boolean(activeMenu.includes(path))
                        ? setActiveMenu("")
                        : setActiveMenu(path)
                    }
                  >
                    {Boolean(activeMenu.includes(path)) ? (
                      <BsArrowUpSquare
                        className={expandedMenu ? "text-md" : "text-2xl"}
                      />
                    ) : (
                      <NavIcon
                        className={expandedMenu ? "text-md" : "text-2xl"}
                      />
                    )}
                    {expandedMenu && name}
                  </Typography>
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
                                ? "flex  items-center gap-5 pl-6 pt-1.5 pb-1.5 rounded-lg  text-neutral  text-md m-2 ml-1"
                                : "flex  items-center gap-5 pl-6 pt-1.5 pb-1.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2 ml-1"
                            }
                          >
                            <NavIcon />
                            <span className="capitalize">{subMenu.name}</span>
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
                                ? "flex  items-center pl-4 py-2 rounded-lg  text-neutral  text-md mt-2"
                                : "flex  items-center pl-4 py-2 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray mt-2"
                            }
                          >
                            <NavIcon className="text-2xl" />
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
                      ? "flex  items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-neutral  text-md m-2"
                      : "flex  items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2"
                  }
                >
                  <NavIcon />
                  <span className="capitalize ">{name}</span>
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

export default Sidebar_copy;
