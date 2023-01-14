import { Box, Tooltip, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import myAxios from "../../../utils/myAxios";
import LoaderSource from "../../Loaders/LoaderSource";
import DeleteApplyDiscount from "../../Modals/Admin/DeleteApplyDiscount";
import EditApplyDiscount from "../../Modals/Admin/EditApplyDiscount";
import CustomDataGrid from "../../Shared/CustomDataGrid";

const ApplyDiscountList = ({
  discounts,
  applyDiscount = [],
  applyRefetch,
  categories,
  foods,
  isLoading,
}) => {
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const { data: allData, isLoading: dataIsLoading } = useQuery(
    [`apply_discount`, editId],
    async () => {
      const res = await myAxios(`/apply_discount/${editId}`);
      return res.data;
    }
  );

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 200,
      headerAlign: "center",
      align: "center",
    },

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
              <Typography component="span" key={data.id}>
                {data.food_name}
              </Typography>
            ))}
            placement="top"
          >
            <Box sx={{ height: 60, overflow: "scroll" }}>
              {row?.food?.map((data) => (
                <Typography component="span" key={data.id}>
                  {data.food_name}
                </Typography>
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
          leftPinning={["id"]}
          rightPinning={["action"]}
        />
      )}
      {Boolean(allData && editId) ? (
        <EditApplyDiscount
          editId={editId}
          discounts={discounts}
          dataIsLoading={dataIsLoading}
          allData={allData}
          handleClose={() => setEditId(null)}
          categories={categories}
          foods={foods}
        />
      ) : null}
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
