import { Container, Modal } from "@mui/material";
import React, { useState } from "react";
import DiscountList from "../Components/Discount/DiscountList";
import AddDiscount from "../Components/Modals/AddDiscount";
import PageTitle from "../Components/PageTitle/PageTitle";

const Discount = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleModalOpen = (e) => {
    setOpenModal(true);
  };
  const handleModalClose = (e) => {
    setOpenModal(false);
  };
  return (
    <Container>
      <Modal open={openModal} onClose={handleModalClose}>
        <AddDiscount handleModalClose={handleModalClose} />
      </Modal>
      <PageTitle
        headingText="discount"
        pageName="discount"
        buttonText="Add Discount"
        modalOpen={handleModalOpen}
      />
      <DiscountList />
    </Container>
  );
};

export default Discount;
