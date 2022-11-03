import { Container, Modal } from "@mui/material";
import { useState } from "react";
import PageTitle from "../../Components/PageTitle/PageTitle";
import { useQuery } from "@tanstack/react-query";
import myAxios from "../../utils/myAxios";
import FoodCategory from "../../Components/Admin/FoodItem/FoodCategory";
import AddFoodItem from "../../Components/Modals/Admin/AddFoodItem";
import AddCategory from "../../Components/Modals/Admin/AddCategory";

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

  const {
    data: categories = [],
    isLoading,
    isError,
    refetch: categoryRefetch,
  } = useQuery(["category"], async () => {
    const res = await myAxios("/category/");
    return res.data;
  });

  const { data: foods = [], refetch: foodRefetch } = useQuery(
    ["food"],
    async () => {
      const res = await myAxios("/food/");
      return res.data;
    }
  );

  const { data: customizeFood = [] } = useQuery(["customizeFood"], async () => {
    const res = await myAxios("/customize_food/");
    return res.data;
  });

  return (
    <Container>
      <Modal open={openModal} onClose={handleModalClose}>
        <AddCategory
          categoryRefetch={categoryRefetch}
          handleModalClose={handleModalClose}
        />
      </Modal>
      <Modal open={openModalTwo} onClose={handleModalCloseTwo}>
        <AddFoodItem
          foodRefetch={foodRefetch}
          handleModalCloseTwo={handleModalCloseTwo}
          categories={categories}
          customizeFood={customizeFood}
        />
      </Modal>
      <PageTitle
        headingText="Food Item"
        pageName="food"
        buttonText="Add Categories"
        buttonTextTwo="Add Food Item"
        modalOpen={handleModalOpen}
        modalOpenTwo={handleModalOpenTwo}
      />
      <FoodCategory
        categories={categories}
        isLoading={isLoading}
        isError={isError}
        customizeFood={customizeFood}
      />
    </Container>
  );
};

export default FoodItem;
