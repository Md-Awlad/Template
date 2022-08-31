import { Container, Modal } from "@mui/material";
import React, { useState } from "react";
import DiscountList from "../Components/Discount/DiscountList";
import AddDiscount from "../Components/Modals/AddDiscount";
import PageTitle from "../Components/PageTitle/PageTitle";
import { useQuery } from "@tanstack/react-query";
import myAxios from "../utils/myAxios";

const Discount = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleModalOpen = (e) => {
    setOpenModal(true);
  };
  const handleModalClose = (e) => {
    setOpenModal(false);
  };

  const { data: discounts = [], refetch: discountRefetch } = useQuery(
    ["discount"],
    async () => {
      const res = await myAxios("/create_discount/");
      return res.data;
    }
  );

  return (
    <Container>
      <Modal open={openModal} onClose={handleModalClose}>
        <AddDiscount
          discountRefetch={discountRefetch}
          handleModalClose={handleModalClose}
        />
      </Modal>
      <PageTitle
        headingText="discount"
        pageName="discount"
        buttonText="Add Discount"
        modalOpen={handleModalOpen}
      />
      <DiscountList discounts={discounts} handleModalClose={handleModalClose} />
    </Container>
  );
};

export default Discount;
