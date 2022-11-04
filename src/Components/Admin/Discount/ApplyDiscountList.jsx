import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdModeEdit } from "react-icons/md";
import { Box, Tooltip, Typography } from "@mui/material";
import EditApplyDiscount from "../../Modals/Admin/EditApplyDiscount";
import DeleteApplyDiscount from "../../Modals/Admin/DeleteApplyDiscount";
import LoaderSource from "../../Loaders/LoaderSource";
import CustomDataGrid from "../../Shared/CustomDataGrid";

const ApplyDiscountList = ({
  applyDiscount,
  applyRefetch,
  categories,
  foods,
  isLoading,
}) => {
  console.log(applyDiscount);
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
    // {
    //   field: "category",
    //   headerName: "Category",
    //   width: 200,
    //   headerAlign: "center",
    //   align: "center",
    //   renderCell: ({ row }) => {
    //     return (
    //       <Box sx={{ height: 60, overflow: "scroll" }}>
    //         {row?.category?.map((data) => {
    //           console.log(data);
    //           return <Typography key={data.id}>{data.name}</Typography>;
    //         })}
    //       </Box>
    //     );
    //   },
    // },
    {
      field: "food",
      headerName: "Food",
      width: 350,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Tooltip
            title={row?.food?.map((data) => (
              <Typography key={data.id}>{data.food_name}</Typography>
            ))}
            placement="top"
          >
            <Box sx={{ height: 60, overflow: "scroll" }}>
              {row?.food?.map((data) => (
                <Typography key={data.id}>{data.food_name}</Typography>
              ))}
            </Box>
          </Tooltip>
        );
      },
    },
    {
      field: "is_active",
      headerName: "Active",
      width: 200,
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
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Box className="flex gap-5 items-center">
            <Tooltip title="Edit Apply Discount" placement="top">
              <MdModeEdit
                onClick={() => setEditId(row?.id)}
                className="text-gray-600 dark:text-neutral text-xl cursor-pointer"
              />
            </Tooltip>
            <Tooltip title="Apply Discount Deleted" placement="top">
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
      {isLoading ? (
        <LoaderSource />
      ) : (
        <CustomDataGrid
          rows={applyDiscount}
          applyRefetch={applyRefetch}
          columns={columns}
        />
      )}
      {Boolean(editId) && (
        <EditApplyDiscount
          editId={editId}
          handleClose={() => setEditId(null)}
          categories={categories}
          foods={foods}
        />
      )}
      {Boolean(deleteId) && (
        <DeleteApplyDiscount
          deleteId={deleteId}
          handleClose={() => setDeleteId(null)}
        />
      )}
    </div>
  );
};

export default ApplyDiscountList;
/*
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
  rows={applyDiscount}
  applyRefetch={applyRefetch}
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
*/
