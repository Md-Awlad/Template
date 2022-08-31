import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useStateContext } from "../../Contexts/ContextProvider";
import DeleteDiscount from "../Modals/DeleteDiscount";
import { MdModeEdit } from "react-icons/md";
import EditDiscount from "../Modals/EditDiscount";
import moment from "moment";

const DiscountList = ({ discounts }) => {
  const { currentColor, currentMode } = useStateContext();
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const columns = [
    { field: "id", headerName: "ID", width: 130 },
    { field: "notice", headerName: "Notice", width: 230 },
    { field: "amount", headerName: "Amount", width: 230 },
    { field: "condition", headerName: "Conditional Amount", width: 200 },
    {
      field: "expired_at",
      headerName: "Expired Date",
      width: 200,
      valueGetter: ({ value }) => moment(value).format("LLL"),
    },
    {
      field: "is_fixed",
      headerName: "Status",
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
              className="text-red-300 dark:text-neutral text-xl cursor-pointer"
            />
          </div>
        );
      },
    },
  ];

  return (
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
        rows={discounts}
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
      {Boolean(editId) && (
        <EditDiscount editId={editId} handleClose={() => setEditId(null)} />
      )}
      {Boolean(deleteId) && (
        <DeleteDiscount
          deleteId={deleteId}
          handleClose={() => setDeleteId(null)}
        />
      )}
    </div>
  );
};

export default DiscountList;
