import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useStateContext } from "../../../Contexts/ContextProvider";
import { MdModeEdit } from "react-icons/md";
import EditFood from "../../Modals/Admin/EditFood";
import DeleteFood from "../../Modals/Admin/DeleteFood";

const Food = ({ category, foodRefetch }) => {
  const { currentColor, currentMode } = useStateContext();
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const food = category?.foodItems_category?.map((a) => a);
  const columns = [
    { field: "id", headerName: "Id", width: 100 },
    {
      field: "image",
      headerName: "Image",
      width: 200,
      renderCell: (params) => {
        return (
          <div>
            <img className="w-14 h-14" src={params?.row?.image} alt="" />
          </div>
        );
      },
    },
    { field: "food_name", headerName: "Food Name", width: 200 },
    {
      field: "price",
      headerName: "Size & Price",
      width: 250,
      renderCell: ({ value }) => {
        return (
          <div className="overflow-y-auto h-12 w-full">
            {Object.keys(value).map((key) => {
              return (
                <div className="grid grid-cols-2">
                  <h2>size:{key}</h2>
                  <h2>Price:{value[key]}</h2>
                </div>
              );
            })}
          </div>
        );
      },
    },
    {
      field: "discount_price",
      headerName: "Discount Price",
      width: 208,
      renderCell: ({ value }) => {
        if (value) {
          return (
            <div className="overflow-y-auto h-12 w-full">
              {Object.keys(value).map((key) => {
                return (
                  <div className="grid grid-cols-2">
                    <h2>size:{key}</h2>
                    <h2>Price:{value[key]}</h2>
                  </div>
                );
              })}
            </div>
          );
        } else {
          return (
            <div className="grid grid-cols-2">
              <h2>0</h2>
            </div>
          );
        }
      },
    },
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
        return (
          <div className="flex gap-5 items-center">
            <MdModeEdit
              onClick={() => setEditId(row?.id)}
              className="text-gray-600 dark:text-neutral text-xl cursor-pointer"
            />
            <RiDeleteBin6Line
              onClick={() => setDeleteId(row?.id)}
              className="text-red-400 dark:text-neutral text-xl cursor-pointer"
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
          rows={food}
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
          categories={food}
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
