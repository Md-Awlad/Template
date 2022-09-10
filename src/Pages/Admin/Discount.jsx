import { Container, Modal } from "@mui/material";
import React, { useState } from "react";
import PageTitle from "../../Components/PageTitle/PageTitle";
import { useQuery } from "@tanstack/react-query";
import myAxios from "../../utils/myAxios";
import AddDiscount from "../../Components/Modals/Admin/AddDiscount";
import ApplyDiscount from "../../Components/Modals/Admin/ApplyDiscount";
import DiscountList from "../../Components/Admin/Discount/DiscountList";

const Discount = () => {
  const [openModal, setOpenModal] = useState(false);
  const [discountModal, setDiscountModal] = useState(false);

  const handleModalOpen = (e) => {
    setOpenModal(true);
  };
  const handleModalClose = (e) => {
    setOpenModal(false);
  };
  const handleDiscountModalOpen = (e) => {
    setDiscountModal(true);
  };
  const handleDiscountModalClose = (e) => {
    setDiscountModal(false);
  };

  const { data: discounts = [], refetch: discountRefetch } = useQuery(
    ["discount"],
    async () => {
      const res = await myAxios("/create_discount/");
      return res.data;
    }
  );

  const { data: categories = [] } = useQuery(["category"], async () => {
    const res = await myAxios("/category/");
    return res.data;
  });
  const { data: foods = [] } = useQuery(["food"], async () => {
    const res = await myAxios("/food/");
    return res.data;
  });

  return (
    <Container>
      <Modal open={openModal} onClose={handleModalClose}>
        <AddDiscount
          discountRefetch={discountRefetch}
          handleModalClose={handleModalClose}
        />
      </Modal>
      <Modal open={discountModal} onClose={handleDiscountModalClose}>
        <ApplyDiscount
          discounts={discounts}
          categories={categories}
          foods={foods}
          handleDiscountModalClose={handleDiscountModalClose}
        />
      </Modal>
      <PageTitle
        headingText="discount"
        pageName="discount"
        buttonText="Add Discount"
        buttonTextTwo="Apply Discount"
        modalOpen={handleModalOpen}
        modalOpenTwo={handleDiscountModalOpen}
      />
      <DiscountList discounts={discounts} handleModalClose={handleModalClose} />
    </Container>
  );
};

export default Discount;
