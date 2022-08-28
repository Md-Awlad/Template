import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import { useStateContext } from "../../../Contexts/ContextProvider";
import { MdModeEdit } from "react-icons/md";
import DeleteFood from "../../Modals/DeleteFood";
import EditFood from "../../Modals/EditFood";

const Food = ({ category, foodRefetch }) => {
  const { currentColor, currentMode } = useStateContext();
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const { data: { foodItems_category = [] } = {} } = useQuery([
    `category/${category}/`,
  ]);
  console.log(foodItems_category);

  const columns = [
    { field: "id", headerName: "Id", width: 100 },
    {
      field: "image",
      headerName: "Image",
      width: 200,
      renderCell: (params) => {
        return (
          <div>
            <img src={params.row.image} alt={Image} />
          </div>
        );
      },
    },
    { field: "food_name", headerName: "Food Name", width: 200 },
    { field: "price", headerName: "Price", width: 130 },
    { field: "food_detail", headerName: "Details", width: 208 },
    { field: "review", headerName: "Review", width: 130 },
    {
      field: "is_recommended",
      headerName: "Recommended",
      width: 130,
      renderCell: (params) => {
        return (
          <div
            className={`${
              params?.value === true
                ? "bg-green-200 text-green-900"
                : "bg-yellow-200 text-yellow-700"
            } px-5 rounded-md font-medium   `}
          >
            <p>{params?.value === true ? "true" : "false"}</p>
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: ({ row }) => {
        // const onClick = (e) => {
        //   e.stopPropagation();
        //   setOpenModal(e.currentTarget);
        // };
        return (
          <div className="flex gap-5 items-center">
            <MdModeEdit
              onClick={() => setEditId(row?.id)}
              className="text-dark-color dark:text-neutral text-xl cursor-pointer"
            />
            <RiDeleteBin6Line
              onClick={() => setDeleteId(row?.id)}
              className="text-dark-color dark:text-neutral text-xl cursor-pointer"
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div style={{ height: 510, width: "100%" }}>
        <DataGrid
          sx={{
            "& .MuiDataGrid-columnHeader": { backgroundColor: "#FFC446" },
            color: currentMode === "Dark" ? "#fff" : "#000",
            "& .MuiIconButton-root": {
              color: "unset !important",
            },
            "& .MuiTablePagination-toolbar": {
              color: currentMode === "Dark" ? "#fff" : "#000",
            },
            "& .MuiDataGrid-row:hover": {
              bgcolor: currentMode === "Dark" ? `${currentColor}10` : "",
            },
            "& .MuiDataGrid-selectedRowCount": {
              visibility: "hidden",
            },
            "& .MuiDataGrid-cell:focus-within": {
              outline: "none",
            },
            "& .MuiInput-root": {
              color: currentMode === "Dark" ? "#fff" : "#000",
            },
          }}
          rows={foodItems_category}
          columns={columns}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          components={{ Toolbar: GridToolbar }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
              printOptions: {
                disableToolbarButton: true,
              },
              csvOptions: {
                disableToolbarButton: true,
              },
            },
          }}
          // checkboxSelection
          // disableSelectionOnClick
        />
      </div>
      {Boolean(editId) && (
        <EditFood
          editId={editId}
          handleModalClose={() => setEditId(null)}
          categories={foodItems_category}
          foodRefetch={foodRefetch}
        />
      )}
      {Boolean(deleteId) && (
        <DeleteFood deleteId={deleteId} handleClose={() => setDeleteId(null)} />
      )}
    </>
  );
};

export default Food;
