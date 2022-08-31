import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import DeleteOrder from "../Modals/DeleteOrder";
import myAxios from "../../utils/myAxios";
import { useStateContext } from "../../Contexts/ContextProvider";
import DeleteDiscount from "../Modals/DeleteDiscount";

const DiscountList = ({ discounts }) => {
  const { currentColor, currentMode } = useStateContext();
  const [deleteId, setDeleteId] = useState(null);

  const columns = [
    { field: "id", headerName: "ID", width: 130 },
    { field: "notice", headerName: "Notice", width: 230 },
    { field: "amount", headerName: "Amount", width: 230 },
    { field: "condition", headerName: "Condition", width: 200 },
    { field: "expired_at ", headerName: "Expired Date", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: ({ row }) => {
        return (
          <RiDeleteBin6Line
            // onClick={() => setDeleteId(row?.id)}
            className="text-red-400 dark:text-neutral text-xl cursor-pointer"
          />
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
