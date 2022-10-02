import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useStateContext } from "../../../Contexts/ContextProvider";
import { MdModeEdit } from "react-icons/md";
import moment from "moment";
import DeleteDiscount from "../../Modals/Admin/DeleteDiscount";
import EditDiscount from "../../Modals/Admin/EditDiscount";

const DiscountList = ({ discounts }) => {
  const { currentColor, currentMode } = useStateContext();
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "notice",
      headerName: "Notice",
      width: 230,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "is_fixed",
      headerName: "Fixed",
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
      field: "condition",
      headerName: "Conditional Amount",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "expired_at",
      headerName: "Expired Date",
      width: 200,
      headerAlign: "center",
      align: "center",
      valueGetter: ({ value }) => moment(value).format("LLL"),
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      headerAlign: "center",
      align: "center",
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
