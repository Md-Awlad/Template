import { Button, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useStateContext } from "../../Contexts/ContextProvider";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import myAxios from "../../utils/myAxios";

const OrderList = () => {
  const { currentColor, currentMode } = useStateContext();
  const [anchorEl, setAnchorEl] = useState(false);
  const [rows, setRows] = useState([]);

  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 130 },
    { field: "order_type", headerName: "Customer Name", width: 230 },
    { field: "phone", headerName: "Mobile", width: 200 },
    { field: "order", headerName: "Order Item", width: 250 },
    { field: "price", headerName: "Amount", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (data) => {
        const onClick = (e) => {
          e.stopPropagation();
          setAnchorEl(e.currentTarget);
        };

        return (
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={onClick}
          >
            <BsThreeDots className="text-gray-900 dark:text-neutral -ml-3" />
          </Button>
        );
      },
    },
  ];

  const { data: orders = [], refetch: orderRefetch } = useQuery(
    ["food"],
    async () => {
      const res = await myAxios("/food/");
      return res.data;
    }
  );

  return (
    <div style={{ height: 510, width: "100%" }}>
      <DataGrid
        sx={{
          "& .MuiDataGrid-columnHeader": { backgroundColor: `${currentColor}` },
          color: "#fff",
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
        rows={orders}
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
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        // onClose={handleClose}
        onClick={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
        // onClick={() => handleEditModalOpen(rows?.id)}

        // sx={{
        //   display: "flex",
        //   justifyContent: "space-between",
        // }}
        >
          <BiEdit className="text-dark-color dark:text-neutral text-sm cursor-pointer" />
          <p className="text-sm font-medium  pl-2">Edit</p>
        </MenuItem>
        <MenuItem>
          <RiDeleteBin6Line className="text-dark-color dark:text-neutral text-sm cursor-pointer" />
          <p className="text-sm font-medium pl-2">Delete</p>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default OrderList;
