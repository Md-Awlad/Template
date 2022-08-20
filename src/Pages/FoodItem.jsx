import { Container, Modal } from "@mui/material";
import { useState } from "react";
import FoodCategory from "../Components/FoodItem/FoodCategory";
import AddCategory from "../Components/Modals/AddCategory";
import AddFoodItem from "../Components/Modals/AddFoodItem";
import PageTitle from "../Components/PageTitle/PageTitle";

const FoodItem = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalTwo, setOpenModalTwo] = useState(false);

  const handleModalOpen = (e) => {
    setOpenModal(true);
  };
  const handleModalClose = (e) => {
    setOpenModal(false);
  };
  const handleModalOpenTwo = (e) => {
    setOpenModalTwo(true);
  };
  const handleModalCloseTwo = (e) => {
    setOpenModalTwo(false);
  };
  return (
    <Container>
      <Modal open={openModal} onClose={handleModalClose}>
        <AddCategory handleModalClose={handleModalClose} />
      </Modal>
      <Modal open={openModalTwo} onClose={handleModalCloseTwo}>
        <AddFoodItem handleModalCloseTwo={handleModalCloseTwo} />
      </Modal>
      <PageTitle
        headingText="Food Item"
        pageName="food"
        buttonText="Add Categories"
        buttonTextTwo="Add Food Item"
        modalOpen={handleModalOpen}
        modalOpenTwo={handleModalOpenTwo}
      />
      <FoodCategory />
    </Container>
  );
};

export default FoodItem;
