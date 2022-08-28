import { Box, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import { BsCartCheckFill } from "react-icons/bs";

import {
  MdDashboard,
  MdFastfood,
  MdOutlineCancel,
  MdOutlineTextsms,
} from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import logo from "../image/logo.png";
import { useStateContext } from "../Contexts/ContextProvider";
import { CgProfile } from "react-icons/cg";

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize, currentColor } =
    useStateContext();
  const [openSubMenu, setOpenSubmenu] = useState(false);
  const handleCloseSidebar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };
  const handleOpenSubMenu = (e) => {
    setOpenSubmenu(e);
    console.log(e);
  };
  const activeLink =
    "flex  items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-neutral  text-md m-2";
  const smActiveLink =
    "flex  items-center m-3 p-2 rounded-lg  text-neutral  text-md ";
  const normalLink =
    "flex  items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";
  const smNormalLink =
    "flex  items-center m-3 p-2 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray ";

  return (
    <Box className="h-screen lg:overflow-hidden overflow-auto lg:hover:overflow-auto pb-10 bg-white dark:bg-main-dark-bg">
      {activeMenu ? (
        <Fragment>
          <Box className="flex justify-between items-center">
            <Box
              to="/"
              onClick={handleCloseSidebar}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                px: 1,
                mt: 2,
              }}
              // className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-neutral text-slate-900"
            >
              <Box
                component="img"
                src={logo}
                sx={{
                  width: "40px",
                }}
              />
              <Typography variant="h6" className="dark:text-neutral">
                Digital Menu_Card
              </Typography>
            </Box>
            <button
              type="button"
              onClick={() => setActiveMenu(!activeMenu)}
              style={{ color: currentColor }}
              className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block lg:hidden "
            >
              <MdOutlineCancel />
            </button>
          </Box>
          <div className="mt-5 ">
            <NavLink
              to="/dashboard"
              onClick={handleCloseSidebar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <MdDashboard />
              <span className="capitalize ">dashboard</span>
            </NavLink>
            <NavLink
              to="/fooditem"
              onClick={handleCloseSidebar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <MdFastfood />
              <span className="capitalize ">food item</span>
            </NavLink>
            <NavLink
              to="/order"
              onClick={handleCloseSidebar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <BsCartCheckFill />
              <span className="capitalize ">order</span>
            </NavLink>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <Box className="flex justify-between items-center pt-5 ">
            <Link
              to="/"
              onClick={handleCloseSidebar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-neutral text-slate-900"
            ></Link>
            <button
              type="button"
              onClick={() => setActiveMenu(!activeMenu)}
              style={{ color: currentColor }}
              className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
            >
              <MdOutlineCancel />
            </button>
          </Box>
          <div className="mt-10 ">
            <NavLink
              to="/dashboard"
              onClick={handleCloseSidebar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) =>
                isActive ? smActiveLink : smNormalLink
              }
            >
              <MdDashboard className="text-3xl" />
            </NavLink>
            <NavLink
              to="/fooditem"
              onClick={handleCloseSidebar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) =>
                isActive ? smActiveLink : smNormalLink
              }
            >
              <MdFastfood className="text-3xl" />
            </NavLink>
            <NavLink
              to="/order"
              onClick={handleCloseSidebar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) =>
                isActive ? smActiveLink : smNormalLink
              }
            >
              <BsCartCheckFill className="text-3xl" />
            </NavLink>
          </div>
        </Fragment>
      )}
    </Box>
  );
};

export default Sidebar;
