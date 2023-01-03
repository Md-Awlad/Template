import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Box, Collapse, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import {
  AiOutlineCloseCircle,
  AiOutlineFileProtect,
  AiTwotoneNotification,
} from "react-icons/ai";
import { BiCalendarCheck, BiCalendarX } from "react-icons/bi";
import { BsArrowUpSquare, BsCartCheckFill } from "react-icons/bs";
import { CgFileDocument } from "react-icons/cg";
import { FaCodeBranch } from "react-icons/fa";
import { FiCheckCircle, FiSettings } from "react-icons/fi";
import { HiDocumentReport, HiOutlineDocumentReport } from "react-icons/hi";
import { IoMdContacts } from "react-icons/io";
import {
  MdDashboard,
  MdFastfood,
  MdLocalAtm,
  MdManageAccounts,
  MdOutlineFoodBank,
  MdOutlineWork,
  MdQrCode2,
  MdReviews,
} from "react-icons/md";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";
import MainLogo from "../image/logo.png";
import { TbShoppingCartDiscount } from "react-icons/tb";
import { QrCode } from "@mui/icons-material";

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
  } = useStateContext();

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
    {
      path: "/customfood",
      icon: MdOutlineFoodBank,
      name: "Custom Food",
    },
    {
      path: "/fooditem",
      icon: MdFastfood,
      name: "Food Item",
    },
    {
      path: "/order",
      icon: BsCartCheckFill,
      name: "order",
    },
    {
      path: "/completeOrder",
      icon: FiCheckCircle,
      name: "Complete Order",
    },
    {
      path: "/cancelorder",
      icon: AiOutlineCloseCircle,
      name: "Cancel Order",
    },

    {
      path: "/discount",
      icon: TbShoppingCartDiscount,
      name: "Discount",
    },

    {
      path: "/surveylist",
      icon: AiOutlineFileProtect,
      name: "Survey",
    },
    {
      path: "/report",
      icon: HiDocumentReport,
      name: "Report",
    },
    {
      path: "/qr",
      icon: MdQrCode2,
      name: "Qr Generator",
    },
    {
      path: "/settings",
      icon: FiSettings,
      name: "Settings",
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
          {restaurantData?.map((data, i) => {
            return (
              <Box
                key={i}
                onClick={handleCloseSidebar}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box
                  component="img"
                  src={data?.logo}
                  onClick={() => navigate("/")}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = "https://i.ibb.co/0q5B8VP/MainLogo.png";
                  }}
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
                  {"hgh"}
                </Typography>
              </Box>
            );
          })}
          <IconButton
            onClick={handleDrawerToggle}
            edge="start"
            sx={{
              display: { xs: expandedMenu ? "block" : "none", sm: "none" },
              color: Boolean(currentMode === "Dark") ? "#fff" : "#33373e",
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
                    borderRadius: 3,
                    borderColor: currentColor,
                    ml: 1,
                  }}
                >
                  <Box
                    className={`flex justify-between items-center gap-5 pl-4 pt-3 pb-2.5 pr-2.5 rounded-lg text-md  hover:text-gray-700 dark:text-gray-200   dark:hover:text-black hover:bg-gray-200 my-1 mr-2`}
                    sx={{
                      cursor: "pointer",
                      color: currentMode === "Dark" ? "#fff" : "#000",
                    }}
                    onClick={() =>
                      Boolean(activeMenu.includes(path))
                        ? setActiveMenu("")
                        : setActiveMenu(path)
                    }
                  >
                    <Typography className="flex items-center gap-5 capitalize">
                      <NavIcon />
                      {expandedMenu && name}
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
                                ? "flex items-center pl-2 py-2 rounded-lg  text-neutral  text-md mt-2 mr-4"
                                : "flex  items-center pl-2 py-2 rounded-lg text-md hover:text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray mt-2 mr-4"
                            }
                          >
                            {/* <NavIcon className="text-xl" /> */}
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

export default Sidebar;
