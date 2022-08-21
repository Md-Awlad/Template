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
import { DataGrid } from "@mui/x-data-grid";

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
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Customer Name", width: 230 },
    { field: "mobile", headerName: "Mobile", width: 150 },
    { field: "order", headerName: "Order Item", width: 200 },
    { field: "amount", headerName: "Amount", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (data) => {
        // console.log(data);
        const onClick = (e) => {
          e.stopPropagation();
          setAnchorEl(e.currentTarget);
          // setEditBranchId(data);
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

  function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }
  const requestSearch = (searchValue) => {
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = platform.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setRows(filteredRows);
  };

  return (
    <div>
      <Box>
        <TextField
          inputProps={{
            style: { color: currentMode === "Dark" ? "#fff" : "#000" },
          }}
          variant="standard"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            requestSearch(e.target.value);
          }}
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <SearchIcon
                sx={{
                  color: currentMode === "Dark" ? "#fff" : "#000",
                }}
                fontSize="small"
                color="action"
              />
            ),
            endAdornment: (
              <IconButton
                title="Clear"
                aria-label="Clear"
                size="small"
                style={{
                  visibility: searchText ? "visible" : "hidden",
                  borderRadius: "57%",
                  paddingRight: "1px",
                  margin: "0",
                  fontSize: "1.25rem",
                }}
                onClick={(e) => {
                  setSearchText("");
                  setRows(platform);
                }}
              >
                <ClearIcon
                  sx={{
                    color: currentMode === "Dark" ? "#fff" : "#000",
                  }}
                  fontSize="small"
                  color="action"
                />
              </IconButton>
            ),
          }}
          sx={{
            borderColor: "",
            width: { xs: 1, sm: "auto" },
            m: (theme) => theme.spacing(1, 0.5, 1.5),
            "& .MuiSvgIcon-root": {
              mr: 0.5,
            },
            "& .MuiInput-underline:before": {
              borderBottom: 1,
              borderColor: "divider",
            },
          }}
        />
      </Box>
      <div className="dark:text-neutral" style={{ height: 510, width: "100%" }}>
        {/* {branchIsLoading ? (
                <QueryLoader />
              ) : branchError ? (
                <Alert
                  severity="error"
                  sx={{
                    width: 1,
                  }}
                >
                  <AlertTitle>Branch Error!</AlertTitle>
                  There was an error fetching your branches.
                </Alert>
              ) : ( */}
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
          }}
          rows={rows}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[5]}
          // checkboxSelection
          // disableSelectionOnClick
        />
        {/* )} */}
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
    </div>
  );
};

export default OrderList;
