import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  IconButton,
  InputBase,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import { useStateContext } from "../../../Contexts/ContextProvider";
import LoaderSource from "../../Loaders/LoaderSource";
import DeleteConfirmOrder from "../../Modals/Admin/DeleteConfirmOrder";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const CompleteOrderList = ({ completes, isLoading, isError }) => {
  const { currentMode } = useStateContext();
  const [deleteId, setDeleteId] = useState();
  const ordersDescending = [...completes].sort((a, b) => b.id - a.id);
  const [search, setNewSearch] = useState("");

  // <---search--->
  const filtered = !search
    ? ordersDescending
    : ordersDescending.filter((item) =>
        item.customer_name?.toLowerCase()?.includes(search?.toLowerCase())
      );

  return (
    <Fragment>
      {isLoading ? (
        <LoaderSource />
      ) : isError ? (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Could not get Complete Orders
        </Alert>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              alignItems: "center",
              my: 2,
            }}
          >
            <Box
              component="form"
              sx={{
                px: "2px",
                display: "flex",
                alignItems: "center",
                width: { md: 500, xs: 200 },
                border: "1px solid #ccc",
                borderRadius: 2,
              }}
              type="search"
              value={search}
              onChange={(e) => setNewSearch(e.target.value)}
            >
              <IconButton
                type="button"
                aria-label="search"
                sx={{ color: currentMode === "Light" ? "#000" : "#fff" }}
              >
                <SearchIcon />
              </IconButton>
              <InputBase
                sx={{
                  ml: 1,
                  flex: 1,
                  color: currentMode === "Light" ? "#000" : "#fff",
                }}
                placeholder="Search by Item Name
                "
                // inputProps={{ "aria-label": "search google maps" }}
              />
            </Box>
            <Typography className="dark:text-neutral" variant="h6">
              Orders Complete : {completes.length ? completes.length : "00"}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "grid",
              justifyItems: { xs: "center" },
              gridTemplateColumns: {
                md: "repeat(3,1fr)",
                sm: "repeat(2,1fr)",
                xs: "repeat(1,1fr)",
              },
              width: "100%",
              gap: 2,
            }}
          >
            {filtered?.map((item) => {
              return (
                <Paper
                  key={item.id}
                  className="space-y-1 dark:bg-secondary-dark-bg dark:text-neutral"
                  sx={{
                    width: 1,
                    px: 1,
                    py: 1,
                    boxShadow: "0px 0px 5px 0px rgb(0 0 0 / 20%)",
                    border: "1px solid #ccc",
                  }}
                >
                  <Box
                    sx={{ height: 300, overflowY: "scroll", px: 1 }}
                    className="space-y-2"
                  >
                    <Box className="flex justify-between flex-wrap items-center">
                      <Typography sx={{ fontSize: 14 }}>
                        Order ID :{" "}
                        <Typography
                          component={"span"}
                          sx={{ fontSize: 14, fontWeight: 500 }}
                          variant="h6"
                        >
                          {item?.id}
                        </Typography>
                      </Typography>
                      {item?.table && (
                        <Typography sx={{ fontSize: 14 }}>
                          Table No:{" "}
                          <Typography
                            component={"span"}
                            sx={{ fontSize: 15, fontWeight: 500 }}
                          >
                            {item?.table}
                          </Typography>
                        </Typography>
                      )}
                    </Box>

                    <Box>
                      <Typography sx={{ fontSize: 14 }}>
                        Order Type :{" "}
                        <Typography
                          component={"span"}
                          sx={{ fontSize: 14, fontWeight: 500 }}
                          variant="h6"
                        >
                          {`${
                            item?.order_type === "takeaway"
                              ? "Takeaway"
                              : item?.order_type === "dine_in" && "Dine In"
                          }`}
                        </Typography>
                      </Typography>
                      <Typography sx={{ fontSize: 14 }}>
                        Name :{" "}
                        <Typography
                          component={"span"}
                          sx={{ fontSize: 14, fontWeight: 500 }}
                        >
                          {item?.customer_name}
                        </Typography>
                      </Typography>
                      <Typography
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          fontSize: 14,
                        }}
                      >
                        {/* <FaPhoneAlt /> */}
                        Phone :
                        <Typography
                          component={"span"}
                          sx={{ fontSize: 14, fontWeight: 500 }}
                        >
                          {item?.customer_phone}
                        </Typography>
                      </Typography>
                      <Typography
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          fontSize: 14,
                        }}
                      >
                        Email :
                        <Typography
                          component={"span"}
                          sx={{ fontSize: 14, fontWeight: 500 }}
                        >
                          {item?.customer_mail}
                        </Typography>
                      </Typography>
                    </Box>
                    {/* <--- order Items ---> */}
                    <TableContainer
                      sx={{
                        borderTopLeftRadius: "4px",
                        borderTopRightRadius: "4px",
                      }}
                    >
                      <Table aria-label="customized table">
                        <TableHead
                          sx={{
                            "& .MuiTableCell-head": {
                              bgcolor:
                                currentMode === "Dark"
                                  ? " #4b5563 !important "
                                  : "#e5e7eb !important",
                              color:
                                currentMode === "Dark"
                                  ? "#fff !important"
                                  : "#000 !important",
                            },
                          }}
                        >
                          <TableRow>
                            <StyledTableCell sx={{ width: 150 }}>
                              Items&Size
                            </StyledTableCell>
                            <StyledTableCell sx={{ width: 150 }}>
                              Extra
                            </StyledTableCell>
                            <StyledTableCell>Quantity</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {item?.order_items.map((row, index) => (
                            <StyledTableRow
                              key={index}
                              sx={{
                                bgcolor:
                                  currentMode === "Dark"
                                    ? " #33373E !important "
                                    : "#e5e7eb !important",
                                color:
                                  currentMode === "Dark"
                                    ? "#fff !important"
                                    : "#000 !important",
                              }}
                            >
                              <StyledTableCell
                                component="th"
                                scope="row"
                                sx={{
                                  width: 150,
                                  color:
                                    currentMode === "Dark"
                                      ? "#fff !important"
                                      : "#000 !important",
                                }}
                              >
                                {row?.food_name}
                                {`(${row?.price})`}
                              </StyledTableCell>

                              <StyledTableCell
                                component="th"
                                scope="row"
                                sx={{
                                  maxWidth: 150,
                                  color:
                                    currentMode === "Dark"
                                      ? "#fff !important"
                                      : "#000 !important",
                                }}
                              >
                                {row?.extra?.map(
                                  (extra, index) =>
                                    `${extra?.name}  ${
                                      row?.extra?.length - 1 === index
                                        ? ""
                                        : ","
                                    } `
                                )}
                              </StyledTableCell>
                              <StyledTableCell
                                component="th"
                                scope="row"
                                align="center"
                                sx={{
                                  color:
                                    currentMode === "Dark"
                                      ? "#fff !important"
                                      : "#000 !important",
                                }}
                              >
                                {row.quantity}
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    {/* <---- amount ----> */}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      px: 1,
                    }}
                  >
                    <Typography
                      sx={{ fontSize: 18, fontWeight: 500 }}
                      variant="h6"
                    >
                      Total Amount:
                    </Typography>
                    <Typography
                      sx={{ fontSize: 18, fontWeight: 500 }}
                      variant="h6"
                    >
                      {item?.price}
                    </Typography>
                  </Box>
                  {/* <--action Button--> */}
                  <Button
                    sx={{
                      width: 1,
                      mt: 2,
                    }}
                    color="error"
                    onClick={() => setDeleteId(item.id)}
                    variant="contained"
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </Paper>
              );
            })}
          </Box>
        </>
      )}
      {Boolean(deleteId) && (
        <DeleteConfirmOrder
          deleteId={deleteId}
          handleClose={() => setDeleteId(null)}
        />
      )}
    </Fragment>
  );
};

export default CompleteOrderList;
