import { Container } from "@mui/material";
import { Box } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import AddCustomFood from "../../Components/Modals/Admin/AddCustomFood";
import DeleteCustomFood from "../../Components/Modals/Admin/DeleteCustomFood";
import EditCustomFood from "../../Components/Modals/Admin/EditCustomFood";
import PageTitle from "../../Components/PageTitle/PageTitle";
import CustomDataGrid from "../../Components/Shared/CustomDataGrid";
import { CustomModal } from "../../Components/Shared/SharedStyles";
import myAxios from "../../utils/myAxios";

const CustomizeFood = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const handleModalOpen = (e) => {
    setOpenModal(true);
  };
  const handleModalClose = (e) => {
    setOpenModal(false);
  };
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "ingredient_name",
      headerName: "Extra Ingredients",
      width: 350,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "price",
      headerName: "Price",
      width: 250,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "action",
      headerName: "Action",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Box className="flex gap-5 items-center">
            <MdModeEdit
              onClick={() => setEditId(row?.id)}
              className="text-gray-600 dark:text-neutral text-xl cursor-pointer"
            />
            <RiDeleteBin6Line
              onClick={() => setDeleteId(row?.id)}
              className="text-red-400 dark:text-neutral text-xl cursor-pointer"
            />
          </Box>
        );
      },
    },
  ];
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
      <CustomModal open={openModal} onClose={handleModalClose}>
        <AddCustomFood
          customizeFood={customizeFood}
          categories={categories}
          foods={foods}
          foodRefetch={foodRefetch}
          handleModalClose={handleModalClose}
        />
      </CustomModal>
      <PageTitle
        headingText="Customize Food"
        pageName="Custom Foods"
        buttonText="Add Custom Food"
        modalOpen={handleModalOpen}
      />
      {/* <CustomFoods
        customizeFood={customizeFood}
        categories={categories}
        foods={foods}
        isLoading={isLoading}
        isError={isError}
      /> */}
      <CustomDataGrid
        rows={customizeFood}
        isLoading={isLoading}
        columns={columns}
      />
      {Boolean(editId) && (
        <EditCustomFood editId={editId} handleClose={() => setEditId(null)} />
      )}
      {Boolean(deleteId) && (
        <DeleteCustomFood
          deleteId={deleteId}
          handleClose={() => setDeleteId(null)}
        />
      )}
    </Container>
  );
};

export default CustomizeFood;
