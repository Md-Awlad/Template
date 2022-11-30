import { Dashboard } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { useStateContext } from "../../Contexts/ContextProvider";
import mainLogo from "../../image/logo.png";
import { getAccessToken } from "../../utils/localStorages";
import CustomDrawer from "../Shared/CustomDrawer";

const Header = () => {
  const {
    cart,
    activeMenu,
    restaurantData,
    currentUser: { id: UID = null },
  } = useStateContext();
  const [accessToken, setAccessToken] = useState();
  useEffect(() => {
    setAccessToken(getAccessToken());
  }, []);
  return (
    <>
      {restaurantData?.map((data, index) => (
        <Box
          key={index}
          style={{
            backgroundColor: data?.color || "#F0A70B",
          }}
          className=" px-4 py-2 flex justify-between items-center md:gap-0 gap-5 md:items-center fixed top-0 left-0 right-0 z-10 lg:mb-6"
        >
          <Link to="/">
            <img
              className="w-12 h-12 object-cover rounded-full"
              src={data?.logo || mainLogo}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = "https://i.ibb.co/0q5B8VP/MainLogo.png";
              }}
              alt=""
            />
          </Link>
          {Boolean(UID) && (
            <Link to="dashboard">
              {activeMenu ? (
                <Button
                  sx={{
                    color: "#fff",
                  }}
                  variant="contained"
                >
                  go to dashboard
                </Button>
              ) : (
                <Dashboard />
              )}
            </Link>
          )}
          {activeMenu ? null : cart?.length ? (
            <CustomDrawer />
          ) : (
            <MdOutlineAddShoppingCart
              className="inline w-8 h-8 cursor-pointer"
              color="action"
            />
          )}
        </Box>
      ))}
    </>
  );
};

export default Header;
