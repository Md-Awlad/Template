import { Box, Container, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import RestaurantSetting from "../../Components/Admin/RestaurantSetting/RestaurantSetting";
import { SSO_HOST } from "../../Components/Authentication/AuthRedirect";
import EditRestaurantInfo from "../../Components/Modals/Admin/EditRestaurantInfo";
import PageTitle from "../../Components/PageTitle/PageTitle";
import { CustomModal } from "../../Components/Shared/SharedStyles";
import { useStateContext } from "../../Contexts/ContextProvider";

const Settings = () => {
  const { restaurantData, currentColor } = useStateContext();
  const [openModal, setOpenModal] = useState(false);

  const handleModalOpen = (e) => {
    setOpenModal(true);
  };
  const handleModalClose = (e) => {
    setOpenModal(false);
  };

  return (
    <Container>
      <CustomModal open={openModal} onClose={handleModalClose}>
        <EditRestaurantInfo
          data={restaurantData}
          handleModalClose={handleModalClose}
        />
      </CustomModal>

      <PageTitle
        headingText="Settings"
        pageName="Restaurants Settings"
        buttonText="Edit Basic info"
        modalOpen={handleModalOpen}
      />
      <Box className="flex justify-between mb-5">
        <div></div>
        <Stack>
          <Typography
            component="div"
            sx={{
              fontWeight: 500,
              fontSize: 18,
            }}
          >
            Manage your organization information
          </Typography>
          <Typography
            component="div"
            className="text-gray-400"
            sx={{
              fontSize: 13,
            }}
          >
            This account is managed by{" "}
            <a
              target="_blank"
              href="https://www.nexisltd.com/"
              rel="noreferrer"
              style={{
                color: currentColor,
              }}
            >
              Nexis Ltd.
            </a>
            <br />
            To edit your organization information,{" "}
            <a
              target="_blank"
              href={`${SSO_HOST}/my-organization`}
              style={{
                color: currentColor,
              }}
              rel="noreferrer"
            >
              Click Here
            </a>
          </Typography>
        </Stack>
      </Box>
      <RestaurantSetting />
    </Container>
  );
};

export default Settings;
