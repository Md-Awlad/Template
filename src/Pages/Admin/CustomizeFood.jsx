import { Container, Modal } from "@mui/material";
import { useState } from "react";
import PageTitle from "../../Components/PageTitle/PageTitle";
import { useQuery } from "@tanstack/react-query";
import myAxios from "../../utils/myAxios";
import AddCustomFood from "../../Components/Modals/Admin/AddCustomFood";
import CustomFoods from "../../Components/Admin/CustomFood/CustomFoods";

const CustomizeFood = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleModalOpen = (e) => {
    setOpenModal(true);
  };
  const handleModalClose = (e) => {
    setOpenModal(false);
  };

  const {
    data: customizeFood = [],
    refetch: foodRefetch,
    isLoading,
    isError,
  } = useQuery(["customizeFood"], async () => {
    const res = await myAxios("/customize_food/");
    return res.data;
  });

  const { data: foods = [] } = useQuery(["food"], async () => {
    const res = await myAxios("/food/");
    return res.data;
  });

  const { data: categories = [] } = useQuery(["category"], async () => {
    const res = await myAxios("/category/");
    return res.data;
  });

  return (
    <Container>
      <Modal open={openModal} onClose={handleModalClose}>
        <AddCustomFood
          customizeFood={customizeFood}
          categories={categories}
          foods={foods}
          foodRefetch={foodRefetch}
          handleModalClose={handleModalClose}
        />
      </Modal>
      <PageTitle
        headingText="Customize Food"
        pageName="Custom Foods"
        buttonText="Add Custom Food"
        modalOpen={handleModalOpen}
      />
      <CustomFoods
        customizeFood={customizeFood}
        categories={categories}
        foods={foods}
        isLoading={isLoading}
        isError={isError}
      />
    </Container>
  );
};

export default CustomizeFood;
