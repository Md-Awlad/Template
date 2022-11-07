import {
  Alert,
  AlertTitle,
  Box,
  Button,
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
import React, { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
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
  const [deleteId, setDeleteId] = useState();

  return (
    <div>
      {isLoading ? (
        <LoaderSource />
      ) : isError ? (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Could not get Complete Orders
        </Alert>
      ) : (
        <>
          <Typography
            className="dark:text-neutral"
            sx={{ display: "flex", justifyContent: "flex-end", my: 2 }}
            variant="h6"
          >
            Orders Complete : {completes.length ? completes.length : "00"}
          </Typography>
          <Box
            sx={{
              display: "grid",
              justifyItems: { xs: "center" },
              gridTemplateColumns: {
                md: "repeat(3,1fr)",
                sm: "repeat(2,1fr)",
                xs: "repeat(1,1fr)",
              },
              gap: 2,
              // position: "relative",
            }}
          >
            {completes?.map((item) => (
              <Paper
                key={item.id}
                className="space-y-1 dark:bg-secondary-dark-bg dark:text-neutral"
                sx={{
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
                  <Box className="flex justify-between items-center">
                    <Typography
                      sx={{ fontSize: 14, fontWeight: 500 }}
                      variant="h6"
                    >
                      Order ID :{" "}
                      <Typography
                        component={"span"}
                        sx={{ fontSize: 14, fontWeight: 600 }}
                        variant="h6"
                      >
                        {item?.id}
                      </Typography>
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} variant="h6">
                      Table No:{" "}
                      <Typography
                        component={"span"}
                        sx={{ fontSize: 15, fontWeight: 600 }}
                        variant="h6"
                      >
                        {item?.table}
                      </Typography>
                    </Typography>
                  </Box>

                  <Box>
                    <Typography sx={{ fontSize: 14 }} variant="h6">
                      Order Type :{" "}
                      <Typography
                        component={"span"}
                        sx={{ fontSize: 15, fontWeight: 600 }}
                        variant="h6"
                      >
                        {`${
                          item?.order_type === "takeaway"
                            ? "Takeaway"
                            : item?.order_type === "dine_in" && "Dine In"
                        }`}
                      </Typography>
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} variant="h6">
                      Name :{" "}
                      <Typography
                        component={"span"}
                        sx={{ fontSize: 15, fontWeight: 600 }}
                        variant="h6"
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
                      variant="h6"
                    >
                      <FaPhoneAlt />

                      <Typography
                        component={"span"}
                        sx={{ fontSize: 14, fontWeight: 600 }}
                        variant="h6"
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
                        fontWeight: 500,
                      }}
                      variant="h6"
                    >
                      <MdEmail />
                      <Typography
                        component={"span"}
                        sx={{ fontSize: 14, fontWeight: 600 }}
                        variant="h6"
                      >
                        {item?.customer_mail}
                      </Typography>
                    </Typography>
                  </Box>
                  {/* <--- order Items ---> */}
                  <TableContainer>
                    <Table aria-label="customized table">
                      <TableHead
                        sx={{
                          "& .MuiTableCell-head": {
                            bgcolor: "#696969 !important",
                          },
                        }}
                      >
                        <TableRow>
                          <StyledTableCell>Items</StyledTableCell>
                          <StyledTableCell>Extra</StyledTableCell>
                          <StyledTableCell>Quantity</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {item?.order_items.map((row) => (
                          <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                              {row.food_name}
                            </StyledTableCell>

                            <StyledTableCell component="th" scope="row">
                              {row?.extra?.map(
                                (extra, index) =>
                                  `${extra?.name}  ${
                                    row?.extra?.length - 1 === index ? "" : ","
                                  } `
                              )}
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                              {row.quantity}
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {/* <---- amount ----> */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
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
                      {item?.price} ৳
                    </Typography>
                  </Box>
                </Box>
                {/* <--action Button--> */}
                <Box>
                  <Button
                    sx={{
                      width: 1,
                      mt: 2,
                    }}
                    color="error"
                    variant="contained"
                    onClick={() => setDeleteId(item.id)}
                  >
                    Remove
                  </Button>
                </Box>
              </Paper>
            ))}
          </Box>
        </>
      )}
      {Boolean(deleteId) && (
        <DeleteConfirmOrder
          deleteId={deleteId}
          handleClose={() => setDeleteId(null)}
        />
      )}
    </div>
  );
};

export default CompleteOrderList;
