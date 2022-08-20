import { Button, IconButton, MenuItem } from "@mui/material";
import { Fragment } from "react";
import { BiUserCircle } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";
import { themeColors } from "../Data/dummy";
import { removeTokens } from "../utils/localStorages";

const UserProfile = ({ closeUserProfile, changePassword }) => {
  const { currentColor, setColor, isLoading } = useStateContext();
  const removeLoginItem = () => {
    removeTokens();
    closeUserProfile();
  };

  return (
    <Fragment>
      <div className="flex justify-between items-center w-full px-5">
        <p className="font-semibold text-md dark:text-gray-200">User Profile</p>
        <IconButton onClick={closeUserProfile}>
          <MdOutlineCancel className="dark:text-neutral" />
        </IconButton>
      </div>
      <MenuItem onClick={closeUserProfile}>
        <NavLink to="/settings">
          <div className="flex gap-5 px-2 pt-1 pb-1 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
            <button
              type="button"
              style={{ color: currentColor, backgroundColor: "currentcolor" }}
              className=" text-lg rounded-lg p-3 hover:bg-light-gray"
            >
              <BiUserCircle className="text-white" />
            </button>
            <div>
              <p className="font-medium dark:text-gray-200 ">Settings</p>
              <p className="text-gray-500 text-sm dark:text-gray-400">
                Account Information
              </p>
            </div>
          </div>
        </NavLink>
      </MenuItem>
      <hr />
      <div className="flex gap-5 border-b-1 border-color py-[.6rem]  px-6 ">
        <div>
          <div className="flex gap-5">
            <div
              type="button"
              style={{ color: currentColor, backgroundColor: "currentcolor" }}
              className=" text-lg rounded-lg p-3  "
            >
              <FiSettings className="text-white" />
            </div>
            <div>
              <p className="font-medium dark:text-gray-200 ">Theme Settings</p>
              <p className="text-gray-500 text-sm dark:text-gray-400 text-center">
                Customize your theme
              </p>
            </div>
          </div>
          <div className="flex gap-3 ">
            {themeColors.map((item, index) => (
              <div
                className="relative mt-2 cursor-pointer flex gap-5 items-center"
                key={item.name}
              >
                <button
                  type="button"
                  className="h-7 w-7 rounded-full cursor-pointer flex justify-center items-center"
                  style={{ backgroundColor: item.color }}
                  onClick={() => setColor(item.color)}
                >
                  <BsCheck
                    className={` text-2xl text-white ${
                      item.color === currentColor ? "block" : "hidden"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-3 flex-col border-color py-2  px-6 ">
        <Button
          fullWidth
          variant="contained"
          onClick={removeLoginItem}
          className="rounded-md w-full p-1 text-white"
        >
          Logout
        </Button>
      </div>
    </Fragment>
  );
};

export default UserProfile;
