import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useStateContext } from "../../../Contexts/ContextProvider";
import { MdModeEdit } from "react-icons/md";
import { Alert, AlertTitle } from "@mui/material";
import { Box } from "@mui/system";
import EditCustomFood from "../../Modals/Admin/EditCustomFood";
import DeleteCustomFood from "../../Modals/Admin/DeleteCustomFood";
import LoaderSource from "../../Loaders/LoaderSource";

const CustomFoods = ({ customizeFood, isLoading, isError }) => {
  const { currentColor, currentMode } = useStateContext();
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

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

  return (
    <Box style={{ height: 510, width: "100%" }}>
      {isLoading ? (
        <LoaderSource />
      ) : isError ? (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Could not get Customize Food..!
        </Alert>
      ) : (
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
          isLoading={isLoading}
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
      )}
      {Boolean(editId) && (
        <EditCustomFood editId={editId} handleClose={() => setEditId(null)} />
      )}
      {Boolean(deleteId) && (
        <DeleteCustomFood
          deleteId={deleteId}
          handleClose={() => setDeleteId(null)}
        />
      )}
    </Box>
  );
};

export default CustomFoods;
