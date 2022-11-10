import { Container, Modal } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import FoodCategory from "../../Components/Admin/FoodItem/FoodCategory";
import AddCategory from "../../Components/Modals/Admin/AddCategory";
import AddFoodItem from "../../Components/Modals/Admin/AddFoodItem";
import PageTitle from "../../Components/PageTitle/PageTitle";
import { useStateContext } from "../../Contexts/ContextProvider";
import myAxios from "../../utils/myAxios";

const FoodItem = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalTwo, setOpenModalTwo] = useState(false);
const {categories,categoryIsLoading, categoryIsError,categoryRefetch}=useStateContext()
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

  // const {
  //   data: categories = [],
  //   isLoading,
  //   isError,
  //   refetch: categoryRefetch,
  // } = useQuery(["category"], async () => {
  //   const res = await myAxios("/category/");
  //   return res.data;
  // });

  const { refetch: foodRefetch } = useQuery(["food"], async () => {
    const res = await myAxios("/food/");
    return res.data;
  });

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
        isLoading={categoryIsLoading}
        isError={categoryIsError}
        customizeFood={customizeFood}
      />
    </Container>
  );
};

export default FoodItem;
