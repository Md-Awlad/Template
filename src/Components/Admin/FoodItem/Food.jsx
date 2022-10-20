import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useStateContext } from "../../../Contexts/ContextProvider";
import { MdModeEdit } from "react-icons/md";
import EditFood from "../../Modals/Admin/EditFood";
import DeleteFood from "../../Modals/Admin/DeleteFood";
import { Box, Tooltip } from "@mui/material";

const Food = ({ category, foodRefetch }) => {
  const { currentColor, currentMode } = useStateContext();
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const food = category?.foodItems_category?.map((a) => a);
  const columns = [
    {
      field: "id",
      headerName: "Id",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "image",
      headerName: "Image",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div>
            <img
              className="w-14 h-14 object-contain"
              src={params?.row?.image}
              alt=""
            />
          </div>
        );
      },
    },
    {
      field: "food_name",
      headerName: "Food Name",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "price",
      headerName: "Size & Price",
      width: 250,
      headerAlign: "center",
      align: "center",
      renderCell: ({ value }) => {
        return (
          <Tooltip
            title={Object.keys(value).map((key, index) => {
              return (
                <div key={index} className="flex justify-between w-32">
                  <h2>size: {key}</h2>
                  <h2>Price: {value[key]}</h2>
                </div>
              );
            })}
            placement="top"
          >
            <div className="overflow-y-auto h-12 w-full mt-7">
              {Object.keys(value).map((key, index) => {
                return (
                  <div key={index} className="flex gap-5">
                    <h2>size: {key}</h2>
                    <h2>Price: {value[key]}</h2>
                  </div>
                );
              })}
            </div>
          </Tooltip>
        );
      },
    },
    {
      field: "discount_price",
      headerName: "Discount Price",
      width: 208,
      headerAlign: "center",
      align: "center",
      renderCell: ({ value }) => {
        if (value) {
          return (
            <Tooltip
              title={Object.keys(value)?.map((key, index) => {
                return (
                  <div key={index} className="flex justify-between w-36">
                    <h2>size: {key}</h2>
                    <h2>Price: {value[key]}</h2>
                  </div>
                );
              })}
              placement="top"
            >
              <div className="overflow-y-auto h-12 w-full mt-7">
                {Object.keys(value)?.map((key, index) => {
                  return (
                    <div key={index} className="grid grid-cols-2">
                      <h2>size: {key}</h2>
                      <h2>Price: {value[key]}</h2>
                    </div>
                  );
                })}
              </div>
            </Tooltip>
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
    { field: "review", headerName: "Review", width: 130, align: "center" },
    {
      field: "is_recommended",
      headerName: "Recommended",
      width: 130,
      headerAlign: "center",
      align: "center",
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
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Box className="flex gap-5 items-center">
            <Tooltip title="Edit Food" placement="top">
              <MdModeEdit
                onClick={() => setEditId(row?.id)}
                className="text-gray-600 dark:text-neutral text-xl cursor-pointer"
              />
            </Tooltip>
            <Tooltip title="Delete Food" placement="top">
              <RiDeleteBin6Line
                onClick={() => setDeleteId(row?.id)}
                className="text-red-400 dark:text-neutral text-xl cursor-pointer"
              />
            </Tooltip>
          </Box>
        );
      },
    },
  ];
  return (
    <>
      <div style={{ height: 510, width: "100%" }}>
        <DataGrid
          sx={{
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