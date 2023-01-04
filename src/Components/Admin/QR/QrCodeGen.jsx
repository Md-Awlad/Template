import {
  Box,
  Button,
  Grid,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import QRCode from "qrcode";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useStateContext } from "../../../Contexts/ContextProvider";
import { CustomQRGenModal } from "../../Shared/SharedStyles";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import BGIcon from "../../../image/restaurant_icons.webp";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import CustomDataGrid from "../../Shared/CustomDataGrid";
import { useMutation, useQuery } from "@tanstack/react-query";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { QrCode } from "@mui/icons-material";
import myAxios from "../../../utils/myAxios";
import { toast } from "react-toastify";
const GenerateQR = ({ text }) => {
  const [qrImg, setQrImg] = useState();
  const [qrSurveyImg, setQrSurveyImg] = useState();
  const [openQr, setOpenQr] = useState(false);
  const [tableNo, setTableNo] = useState("");
  const { restaurantData, currentColor } = useStateContext();
  let menuQrImg;
  let surveyQrImg;
  const generateQR = async (text) => {
    try {
      menuQrImg = await QRCode.toDataURL(text);
      setQrImg(menuQrImg);
    } catch (err) {
      console.error(err);
    }
  };
  const generateQRSurvey = async (text) => {
    try {
      surveyQrImg = await QRCode.toDataURL(text);
      setQrSurveyImg(surveyQrImg);
    } catch (err) {
      console.error(err);
    }
  };
  const { mutate: tableName } = useMutation(
    (payload) => toast.promise(myAxios.post("/table/", payload)),
    {
      pending: "Your table adding ...",
      success: "Thank you table is Successfully Done",
      error: " table added is Error!",
    },
    {
      onSuccess: ({ data }) => {},
    }
  );

  const handleAddTable = () => {
    const payload = { table_name: tableNo };
    tableName(payload);
  };
  const handleQr = (table) => {
    table && setOpenQr(true);
    table && generateQR(`${window.location.origin}/?table=${table}`);
    table && generateQRSurvey(`${window.location.origin}/survey`);
  };
  const { data: QrTableData = [] } = useQuery(["/table"]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "table_name",
      headerName: "Table Name",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Box className="flex gap-5 items-center">
            <Tooltip title="Generate Qr" placement="top">
              <QrCode
                onClick={() => handleQr(row?.table_name)}
                className="text-gray-600 dark:text-neutral text-xl cursor-pointer"
              />
            </Tooltip>
            <Tooltip title="Delete Discount" placement="top">
              <RiDeleteBin6Line
                // onClick={() => setDeleteId(row?.id)}
                className="text-red-400 dark:text-neutral text-xl cursor-pointer"
              />
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      <CustomQRGenModal
        // center={true}
        width={900}
        open={openQr}
        onClose={() => setOpenQr(false)}
      >
        <Box
          ref={componentRef}
          sx={{
            backgroundImage: `url(${BGIcon})`,
            width: 1,
            "@media print": {
              paddingBottom: 9,

              // "@page": {
              //   size: "A4",
              // },
            },
          }}
        >
          <Box className="flex justify-evenly ">
            <div className="text-center overflow-x-hidden p-4  border-gray-400 border-dashed">
              {restaurantData?.map((data, index) => {
                return (
                  <div key={index} className="w-[300px]">
                    <img className="w-24 h-24 inline" src={data?.logo} alt="" />
                    <p className="font-semibold mb-4">{data?.name}</p>
                    <p
                      style={{
                        fontFamily: "cursive",
                      }}
                      className=" mb-2 text-sm"
                    >
                      Table No: {tableNo && tableNo}
                    </p>
                    <div
                      style={{
                        borderColor: data?.color ?? currentColor,
                      }}
                      className=" pb-3 border-4 border-dashed relative text-center"
                    >
                      <img
                        className="w-[300px] h-[300px] text-center"
                        src={qrImg}
                        alt="qr"
                      />
                      <h6
                        style={{
                          fontFamily: "cursive",
                        }}
                        className=" absolute bottom-2 font-medium left-28"
                      >
                        Scan Me
                      </h6>
                    </div>
                    <h1
                      style={{
                        color: data?.color ?? currentColor,
                        fontFamily: "cursive",
                      }}
                      className="text-5xl font-extrabold  uppercase  mt-5"
                    >
                      {" "}
                      menu
                    </h1>

                    <p className="justify-center text-[11px] mt-2">
                      <span>*</span>You can place an order from the comfort of
                      your own seat using this service
                    </p>
                    <div className="flex justify-end mt-14">
                      <div>
                        <p className="text-[10px] font-medium text-gray-400">
                          Powered by
                        </p>
                        <img
                          className="w-20 h-3 mb-2"
                          src="https://cdn.nexisltd.com/nexis-website/images/logo.svg"
                          alt="Nexis LTD."
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-1 border-dashed border-gray-400"></div>
            {/* <ContentCutIcon
              sx={{
                fontSize: 12,
                marginLeft: "-7px",
                transform: "rotate(90deg)",
              }}
            /> */}

            {/* servey */}
            <div className="text-center overflow-x-hidden p-4">
              {restaurantData?.map((data, index) => {
                return (
                  <div key={index}>
                    <img className="w-24 h-24 inline" src={data?.logo} alt="" />
                    <p className="font-semibold mb-[45px]">{data?.name}</p>
                    <p
                      style={{
                        fontFamily: "cursive",
                      }}
                      className=" mb-2 text-sm"
                    >
                      {/* Table No: {tableNo && tableNo} */}
                    </p>
                    <div
                      style={{
                        borderColor: data?.color ?? currentColor,
                      }}
                      className=" pb-3 border-4 border-dashed relative text-center"
                    >
                      <img
                        className="w-[300px] h-[300px] text-center"
                        src={qrSurveyImg}
                        alt="qr"
                      />
                      <h6
                        style={{
                          fontFamily: "cursive",
                        }}
                        className=" absolute bottom-2 font-medium left-28"
                      >
                        Scan Me
                      </h6>
                    </div>
                    <h1
                      style={{
                        color: data?.color ?? currentColor,
                        fontFamily: "cursive",
                      }}
                      className="text-5xl font-extrabold  uppercase  mt-5"
                    >
                      {" "}
                      Survey
                    </h1>
                    <div className="flex justify-end mt-14">
                      <div>
                        <p className="text-[10px] font-medium text-gray-400">
                          Powered by
                        </p>
                        <img
                          className="w-20 h-3 mb-2"
                          src="https://cdn.nexisltd.com/nexis-website/images/logo.svg"
                          alt="Nexis LTD."
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Box>
          <Grid container>
            <Grid
              item
              xs={12}
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "end",
                gap: 2,
                "@media print": {
                  display: "none",
                },
              }}
            >
              <Button variant="outlined" onClick={handlePrint}>
                <LocalPrintshopIcon sx={{ marginRight: "2px" }} /> Print
              </Button>
              <Button variant="outlined" onClick={() => setOpenQr(false)}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CustomQRGenModal>
      <Box className=" border-1 p-4 text-center">
        <Typography
          sx={{
            fontSize: 20,
            mb: 5,
          }}
        >
          Table QR Code
        </Typography>
        <Box className="  flex flex-col space-y-2 ">
          <TextField
            size="small"
            type="text"
            placeholder="Type your table no"
            onChange={(e) => setTableNo(e.target.value)}
          />
          <Button
            size="medium"
            variant="contained"
            className="border-2 "
            onClick={handleAddTable}
          >
            Add{" "}
          </Button>
        </Box>
      </Box>
      <Box className="w-full p-4">
        <CustomDataGrid rows={QrTableData} columns={columns} />
      </Box>
    </>
  );
};

export default GenerateQR;
