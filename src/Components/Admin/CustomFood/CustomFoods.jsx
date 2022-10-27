import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useStateContext } from "../../../Contexts/ContextProvider";
import { MdModeEdit } from "react-icons/md";
import { Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import EditCustomFood from "../../Modals/Admin/EditCustomFood";
import DeleteCustomFood from "../../Modals/Admin/DeleteCustomFood";

const CustomFoods = ({ customizeFood }) => {
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
    </div>
  );
};

export default CustomFoods;
