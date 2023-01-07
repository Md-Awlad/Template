import { Container } from "@mui/material";
import React, { useState } from "react";
import RestaurantSetting from "../../Components/Admin/RestaurantSetting/RestaurantSetting";
import EditRestaurantInfo from "../../Components/Modals/Admin/EditRestaurantInfo";
import PageTitle from "../../Components/PageTitle/PageTitle";
import { CustomModal } from "../../Components/Shared/SharedStyles";
import { useStateContext } from "../../Contexts/ContextProvider";

const Settings = () => {
  const { restaurantData } = useStateContext();
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
        buttonText="Edit info"
        modalOpen={handleModalOpen}
      />
      <RestaurantSetting />
    </Container>
  );
};

export default Settings;
