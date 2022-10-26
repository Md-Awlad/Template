import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useStateContext } from "../../../Contexts/ContextProvider";
import { MdModeEdit } from "react-icons/md";
import moment from "moment";
import DeleteDiscount from "../../Modals/Admin/DeleteDiscount";
import EditDiscount from "../../Modals/Admin/EditDiscount";
import { Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";

const CustomFoods = ({ customizeFood, categories, foods }) => {
  const { currentColor, currentMode } = useStateContext();
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "category",
      headerName: "Category",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Tooltip
            title={row?.categories?.map((data) => (
              <Typography key={data.id}>{data.name}</Typography>
            ))}
            placement="top"
          >
            <Box sx={{ height: 60, overflow: "scroll" }}>
              {row?.categories?.map((data) => {
                console.log(data);
                return <Typography key={data.id}>{data.name}</Typography>;
              })}
            </Box>
          </Tooltip>
        );
      },
    },
    {
      field: "food",
      headerName: "Food",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        console.log(row);
        return (
          <Tooltip
            title={row?.foods?.map((data) => (
              <Typography key={data.id}>{data.food_name}</Typography>
            ))}
            placement="top"
          >
            <Box sx={{ height: 60, overflow: "scroll" }}>
              {row?.foods?.map((data) => {
                return <Typography key={data.id}>{data.food_name}</Typography>;
              })}
            </Box>
          </Tooltip>
        );
      },
    },
    {
      field: "ingredient_name",
      headerName: "Extra Ingredients",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "price",
      headerName: "Price",
      width: 80,
      headerAlign: "center",
      align: "center",
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
        rows={customizeFood}
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
      {/* {Boolean(editId) && (
        <EditDiscount editId={editId} handleClose={() => setEditId(null)} />
      )}
      {Boolean(deleteId) && (
        <DeleteDiscount
          deleteId={deleteId}
          handleClose={() => setDeleteId(null)}
        />
      )} */}
    </div>
  );
};

export default CustomFoods;
