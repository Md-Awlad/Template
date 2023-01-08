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
import { CustomDelete, CustomQRGenModal } from "../../Shared/SharedStyles";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import BGIcon from "../../../image/restaurant_icons.webp";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import CustomDataGrid from "../../Shared/CustomDataGrid";
import { useMutation, useQuery } from "@tanstack/react-query";
import { RiDeleteBin6Line } from "react-icons/ri";
import { QrCode } from "@mui/icons-material";
import myAxios from "../../../utils/myAxios";
import { toast } from "react-toastify";
const GenerateQR = ({ text }) => {
  const [qrImg, setQrImg] = useState();
  const [qrSurveyImg, setQrSurveyImg] = useState();
  const [openQr, setOpenQr] = useState(false);
  const [addTableNo, setAddTableNo] = useState("");
  const [delTabId, setDelTabId] = useState(null);
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
  const { data: QrTableData = [], refetch: QrRefetch } = useQuery(["/table"]);

  const { mutate: tableName } = useMutation(
    (payload) =>
      toast.promise(myAxios.post("/table/", payload), {
        pending: "Your Table adding ...",
        success: "Table is Successfully Done",
        error: " Table adding is Error!",
      }),
    {
      onSuccess: () => {
        setAddTableNo(" ");
        QrRefetch();
      },
    }
  );
  const handleAddTable = () => {
    const payload = { table_name: addTableNo };
    tableName(payload);
  };
  const handleQr = (table) => {
    table && setOpenQr(true);
    table && generateQR(`${window.location.origin}/?table=${table}`);
    table && generateQRSurvey(`${window.location.origin}/survey`);
  };

  const columns = [
    // {
    //   field: "id",
    //   headerName: "ID",
    //   width: 200,
    //   headerAlign: "center",
    //   align: "center",
    // },
    {
      field: "table_name",
      headerName: "Table Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,

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
            <Tooltip title="Delete Table" placement="top">
              <RiDeleteBin6Line
                onClick={() => setDelTabId(row?.id)}
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
      <Box className=" border-1 p-4 text-center">
        <Typography
          component="span"
          sx={{
            fontSize: 20,
            mb: 5,
          }}
        >
          Add Table QR Code
        </Typography>
        <Box className="  flex flex-col space-y-2 ">
          <TextField
            size="small"
            type="text"
            value={addTableNo}
            placeholder="Type your table no"
            onChange={(e) => setAddTableNo(e.target.value)}
          />
          <Button
            size="medium"
            variant="contained"
            className="border-2 "
            onClick={handleAddTable}
          >
            Add Table
          </Button>
        </Box>
      </Box>
      {/* Table */}
      <Box className="w-full ">
        <CustomDataGrid rows={QrTableData} columns={columns} />
      </Box>
      {/* QR Modal */}
      <CustomQRGenModal
        width={1000}
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
            },
          }}
        >
          <Box className="flex justify-evenly ">
            <div className="text-center overflow-x-hidden p-4  border-gray-400 border-dashed">
              <div className="w-[300px]">
                <img
                  className="w-24 h-24 inline"
                  src={restaurantData?.logo}
                  alt=""
                />
                <p className="font-semibold mb-4">{restaurantData?.name}</p>
                <p
                  style={{
                    fontFamily: "cursive",
                  }}
                  className=" mb-2 text-sm"
                >
                  Table No: {addTableNo && addTableNo}
                </p>
                <div
                  style={{
                    borderColor: restaurantData?.color ?? currentColor,
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
                    color: restaurantData?.color ?? currentColor,
                    fontFamily: "cursive",
                  }}
                  className="text-5xl font-extrabold  uppercase  mt-5"
                >
                  {" "}
                  menu
                </h1>

                <p className="justify-center text-[11px] mt-2">
                  <span>*</span>You can place an order from the comfort of your
                  own seat using this service
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
            </div>

            <Box
              sx={{
                display: "none",
                "@media print": {
                  display: "block",
                  mt: 8,
                  border: "1px dashed #9ca3af",
                },
              }}
            >
              {" "}
              <ContentCutIcon
                sx={{
                  display: "none",
                  "@media print": {
                    display: "block",
                    position: "absolute",
                    fontSize: 12,
                    marginLeft: "-6px",
                    transform: "rotate(90deg)",
                  },
                }}
              />
            </Box>

            {/* survey */}
            <div className="text-center overflow-x-hidden p-4">
              <Box className="w-[300px]">
                <img
                  className="w-24 h-24 inline"
                  src={restaurantData?.logo}
                  alt=""
                />
                <p className="font-semibold mb-[45px]">
                  {restaurantData?.name}
                </p>
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
                    borderColor: restaurantData?.color ?? currentColor,
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
                    color: restaurantData?.color ?? currentColor,
                    fontFamily: "cursive",
                  }}
                  className="text-5xl font-extrabold  uppercase  mt-5"
                >
                  {" "}
                  Survey
                </h1>
                <p className="justify-center text-[11px] mt-2">
                  <span>*</span> Your feedback is important to us and will be
                  used to improve our products and services.
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
              </Box>
            </div>
          </Box>
          <Grid
            container
            sx={{
              p: 4,
              "@media print": {
                display: "none",
              },
            }}
          >
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

      {Boolean(delTabId) && (
        <CustomDelete
          path="table"
          deleteId={delTabId}
          handleClose={() => setDelTabId(null)}
        />
      )}
    </>
  );
};

export default GenerateQR;
