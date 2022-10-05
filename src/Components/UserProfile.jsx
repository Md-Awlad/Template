import { Button } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { Fragment } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { useStateContext } from "../Contexts/ContextProvider";
import { themeColors } from "../Data/dummy";
import { removeTokens } from "../utils/localStorages";
import { NavLink } from "react-router-dom";

const UserProfile = ({ closeUserProfile }) => {
  const {
    currentColor,
    setColor,
    currentUser: { id } = {},
  } = useStateContext();
  const queryClient = useQueryClient();
  const logOut = () => {
    removeTokens();
    closeUserProfile();
    queryClient.resetQueries();
  };

  return (
    <Fragment>
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
      <NavLink
        to="/dashboard/change-password"
        className="flex gap-3 flex-col border-color py-2  px-6 "
      >
        <Button
          fullWidth
          variant="contained"
          className="rounded-md w-full p-1 text-white"
        >
          <AiOutlineUserAdd className="text-xl" />
          Change your Password
        </Button>
      </NavLink>
      <div className="flex gap-3 flex-col border-color py-2  px-6 ">
        <Button
          fullWidth
          variant="contained"
          onClick={logOut}
          className="rounded-md w-full p-1 text-white"
        >
          Logout
        </Button>
      </div>
    </Fragment>
  );
};

export default UserProfile;
