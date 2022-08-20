import { Container } from "@mui/material";
import React, { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import PageTitle from "../Components/PageTitle/PageTitle";
import BasicInfo from "../Components/Profile/BasicInfo";
import { useStateContext } from "../Contexts/ContextProvider";

const Profile = () => {
  const { currentColor } = useStateContext();
  const [is_active, setIs_active] = useState(false);
  return (
    <Container>
      <PageTitle headingText="profile" pageName="profile" />
      <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-4">
        {/* --left personal info-- */}
        <div className="col-span-1">
          <div
            style={{ backgroundColor: currentColor }}
            className="h-1 mb-1"
          ></div>
          <div className="bg-neutral dark:bg-secondary-dark-bg border-1 dark:border-gray-700 rounded-bl-md rounded-br-md shadow-sm">
            <img
              className="object-cover"
              src="https://img.freepik.com/free-photo/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction_176420-15187.jpg?w=2000"
              alt=""
            />
            <div className="px-4 py-5 space-y-5">
              <h2 className="text-xl text-center font-medium text-gray-900 dark:text-neutral mt-8">
                Jhon Dolley
              </h2>
              <div className="grid grid-cols-3">
                <div className="col-span-1 flex items-center gap-1">
                  <FaPhoneAlt className="text-xs text-gray-600 dark:text-neutral" />
                  <h2 className="text-sm font-bold dark:text-neutral">Phone</h2>
                </div>
                <div className="col-span-2 flex gap-7 items-center">
                  <p className="text-sm font-bold dark:text-neutral">:</p>
                  <span className="text-sm text-gray-500 dark:text-neutral">
                    {/* {information_user.phone_number || "No phone number set"} */}
                    0123456789
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3">
                <div className="col-span-1 flex items-center gap-1">
                  <MdEmail className="text-xs text-gray-600 dark:text-neutral" />
                  <h2 className="text-sm font-bold dark:text-neutral">Email</h2>
                </div>
                <div className="col-span-2 flex gap-7 items-center">
                  <p className="text-sm font-bold dark:text-neutral">:</p>
                  <span className="text-sm text-gray-500 dark:text-neutral">
                    Email
                    {/* {information_user.email || "No email set"} */}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3">
                <div className="col-span-1 flex items-center gap-1">
                  <IoMdPersonAdd className="text-xs text-gray-600 dark:text-neutral" />
                  <h2 className="text-sm font-bold dark:text-neutral">Join</h2>
                </div>
                <div className="col-span-2 flex gap-7 items-center">
                  <p className="text-sm font-bold dark:text-neutral">:</p>
                  <span className="text-sm text-gray-500 dark:text-neutral">
                    10-10-2010
                  </span>
                </div>
              </div>
            </div>
            <div className="border-1 dark:border-gray-600 rounded-sm drop:shadow-sm bg-gray-100 dark:bg-main-dark-bg dark:text-neutral mt-28 mb-12 mx-4 p-3 divide-y">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-md font-medium text-gray-600 dark:text-neutral">
                  Status
                </h2>
                {!is_active ? (
                  <button className="bg-green-700 text-md text-white px-4 rounded">
                    Active
                  </button>
                ) : (
                  <button className="bg-red-700 text-sm text-white px-2 rounded">
                    Deactive
                  </button>
                )}
              </div>
              <div className="flex justify-between pt-2">
                <p className="text-md text-gray-600 dark:text-neutral">
                  Member since
                </p>
                <p className="text-md text-gray-600 dark:text-neutral"></p>
              </div>
            </div>
          </div>
        </div>

        {/* --right info form-- */}
        <div className="col-span-2 bg-neutral dark:bg-secondary-dark-bg border-1 dark:border-gray-700 rounded-md shadow-sm py-5 px-4">
          <BasicInfo />
        </div>
      </div>
    </Container>
  );
};

export default Profile;
