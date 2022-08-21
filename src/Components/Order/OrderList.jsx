import { Button, IconButton, Menu, MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers";
import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import {
  HiOutlineArrowNarrowDown,
  HiOutlineArrowNarrowUp,
} from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { useStateContext } from "../../Contexts/ContextProvider";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const OrderList = () => {
  const { currentColor, currentMode } = useStateContext();
  const [showArrow, setShowArrow] = useState(true);
  const [anchorEl, setAnchorEl] = useState(false);
  const [platform, setPlatform] = useState([]);
  const [searchText, setSearchText] = useState("");
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
    { field: "name", headerName: "Customer Name", width: 230 },
    { field: "mobile", headerName: "Mobile", width: 200 },
    { field: "order", headerName: "Order Item", width: 250 },
    { field: "amount", headerName: "Amount", width: 200 },
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

export default OrderList;
