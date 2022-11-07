import { Box, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import { AiOutlineCloseCircle, AiOutlineFileProtect } from "react-icons/ai";
import { BsCartCheckFill } from "react-icons/bs";
import { FiCheckCircle, FiSettings } from "react-icons/fi";
import { HiDocumentReport } from "react-icons/hi";
import {
  MdDashboard,
  MdFastfood,
  MdOutlineCancel,
  MdOutlineFoodBank,
} from "react-icons/md";
import { TbShoppingCartDiscount } from "react-icons/tb";
import { Link, NavLink } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";
import mainLogo from "../image/logo.png";

const Sidebar = () => {
  const {
    activeMenu,
    setActiveMenu,
    screenSize,
    currentColor,
    currentMode,
    restaurantData,
  } = useStateContext();
  // const [openSubMenu, setOpenSubmenu] = useState(false);
  const [changeMe, setChangeMe] = useState(false);
  const handleCloseSidebar = (value) => {
    if (value === "i_am_not_dashboard") {
      setChangeMe(true);
    } else {
      setChangeMe(false);
    }
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };
  // const handleOpenSubMenu = (e) => {
  //   setOpenSubmenu(e);
  //   console.log(e);
  // };
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
                  src={data?.logo || mainLogo}
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
          <div className="mt-5">
            <NavLink
              to=""
              onClick={() => handleCloseSidebar("i_am_dashboard")}
              // style={({ isActive }) => ({
              //   backgroundColor: isActive ? `${currentColor}10` : "",
              //   color: currentMode === "Dark" ? "#fff" : "#000",
              // })}
              style={({ isActive }) => ({
                backgroundColor: isActive && !changeMe ? currentColor : "",
                color: !changeMe
                  ? "#fff"
                  : currentMode === "Light"
                  ? "#000"
                  : "#fff",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <MdDashboard />
              <span className="capitalize ">dashboard</span>
            </NavLink>
            <NavLink
              to="customfood"
              onClick={() => handleCloseSidebar("i_am_not_dashboard")}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <MdOutlineFoodBank className="text-xl" />
              <span className="capitalize ">custom food</span>
            </NavLink>
            <NavLink
              to="fooditem"
              onClick={() => handleCloseSidebar("i_am_not_dashboard")}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <MdFastfood />
              <span className="capitalize ">food item</span>
            </NavLink>

            <NavLink
              to="order"
              onClick={() => handleCloseSidebar("i_am_not_dashboard")}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <BsCartCheckFill />
              <span className="capitalize ">order</span>
            </NavLink>
            <NavLink
              to="completeOrder"
              onClick={() => handleCloseSidebar("i_am_not_dashboard")}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <FiCheckCircle />
              <span className="capitalize ">Completed Order</span>
            </NavLink>
            <NavLink
              to="cancelorder"
              onClick={() => handleCloseSidebar("i_am_not_dashboard")}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <AiOutlineCloseCircle />
              <span className="capitalize ">Cancel Order</span>
            </NavLink>
            <NavLink
              to="discount"
              onClick={() => handleCloseSidebar("i_am_not_dashboard")}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <TbShoppingCartDiscount />
              <span className="capitalize ">discount</span>
            </NavLink>
            <NavLink
              to="report"
              onClick={() => handleCloseSidebar("i_am_not_dashboard")}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <HiDocumentReport />
              <span className="capitalize ">Report</span>
            </NavLink>
            <NavLink
              to="surveylist"
              onClick={() => handleCloseSidebar("i_am_not_dashboard")}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <AiOutlineFileProtect />
              <span className="capitalize ">survey</span>
            </NavLink>
            <NavLink
              to="settings"
              onClick={() => handleCloseSidebar("i_am_not_dashboard")}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <FiSettings />
              <span className="capitalize ">settings</span>
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
              to=""
              onClick={() => handleCloseSidebar("i_am_dashboard")}
              style={({ isActive }) => ({
                backgroundColor: isActive && !changeMe ? currentColor : "",
                color: !changeMe
                  ? "#fff"
                  : currentMode === "Light"
                  ? "#000"
                  : "#fff",
              })}
              className={({ isActive }) =>
                isActive ? smActiveLink : smNormalLink
              }
            >
              <MdDashboard className="text-3xl" />
            </NavLink>
            <NavLink
              to="customfood"
              onClick={() => handleCloseSidebar("i_am_not_dashboard")}
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
              to="fooditem"
              onClick={() => handleCloseSidebar("i_am_not_dashboard")}
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
              to="order"
              onClick={() => handleCloseSidebar("i_am_not_dashboard")}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) =>
                isActive ? smActiveLink : smNormalLink
              }
            >
              <BsCartCheckFill className="text-3xl" />
            </NavLink>
            <NavLink
              to="completeOrder"
              onClick={() => handleCloseSidebar("i_am_not_dashboard")}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) =>
                isActive ? smActiveLink : smNormalLink
              }
            >
              <FiCheckCircle className="text-3xl" />
            </NavLink>
            <NavLink
              to="cancelorder"
              onClick={() => handleCloseSidebar("i_am_not_dashboard")}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) =>
                isActive ? smActiveLink : smNormalLink
              }
            >
              <AiOutlineCloseCircle className="text-3xl" />
            </NavLink>
            <NavLink
              to="discount"
              onClick={() => handleCloseSidebar("i_am_not_dashboard")}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) =>
                isActive ? smActiveLink : smNormalLink
              }
            >
              <TbShoppingCartDiscount className="text-3xl" />
            </NavLink>
            <NavLink
              to="report"
              onClick={() => handleCloseSidebar("i_am_not_dashboard")}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) =>
                isActive ? smActiveLink : smNormalLink
              }
            >
              <HiDocumentReport className="text-3xl" />
            </NavLink>
            <NavLink
              to="surveylist"
              onClick={() => handleCloseSidebar("i_am_not_dashboard")}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) =>
                isActive ? smActiveLink : smNormalLink
              }
            >
              <AiOutlineFileProtect className="text-3xl" />
            </NavLink>
            <NavLink
              to="settings"
              onClick={() => handleCloseSidebar("i_am_not_dashboard")}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) =>
                isActive ? smActiveLink : smNormalLink
              }
            >
              <FiSettings className="text-3xl" />
            </NavLink>
          </div>
        </Fragment>
      )}
    </Box>
  );
};

export default Sidebar;
