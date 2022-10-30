import { Container, Modal, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import RestaurantSetting from "../../Components/Admin/RestaurantSetting/RestaurantSetting";
import EditRestaurantInfo from "../../Components/Modals/Admin/EditRestaurantInfo";
import PageTitle from "../../Components/PageTitle/PageTitle";
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
      {restaurantData?.map((data, index) => (
        <Modal key={index} open={openModal} onClose={handleModalClose}>
          <EditRestaurantInfo data={data} handleModalClose={handleModalClose} />
        </Modal>
      ))}
      <PageTitle
        headingText="Settings"
        pageName="Restaurants Settings"
        buttonText="Edit Restaurant"
        modalOpen={handleModalOpen}
      />
      <RestaurantSetting />
    </Container>
  );
};

export default Settings;
