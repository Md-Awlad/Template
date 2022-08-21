import {
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useStateContext } from "../../../Contexts/ContextProvider";

const Burger = () => {
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
    { field: "id", headerName: "Id", width: 86 },
    { field: "image", headerName: "Image", width: 160 },
    { field: "name", headerName: "Food Name", width: 200 },
    { field: "price", headerName: "Price", width: 130 },
    { field: "details", headerName: "Details", width: 200 },
    { field: "extra", headerName: "Extra", width: 130 },
    {
      field: "action",
      headerName: "Action",
      width: 100,
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
          "& .MuiInput-root": { color: "#fff" },
        }}
        rows={rows}
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

export default Burger;
