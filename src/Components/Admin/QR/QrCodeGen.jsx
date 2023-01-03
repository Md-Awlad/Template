import { Box, Button, TextField, Typography } from "@mui/material";
import { data } from "autoprefixer";
import QRCode from "qrcode";
import { useState } from "react";
import { useStateContext } from "../../../Contexts/ContextProvider";
import fileDownloadHelper from "../../../utils/fileDownloader";
import { CustomModal, CustomModal2 } from "../../Shared/SharedStyles";
import BGIcon from "../../../image/restaurant_icons.webp";

const GenerateQR = ({ text }) => {
  const [qrImg, setQrImg] = useState();
  const [openQr, setOpenQr] = useState(false);
  const [tableNo, setTableNo] = useState("");
  const { restaurantData, currentColor } = useStateContext();
  console.log(restaurantData);
  let img;
  const generateQR = async (text) => {
    try {
      img = await QRCode.toDataURL(text);
      setQrImg(img);
    } catch (err) {
      console.error(err);
    }
  };

  const handleQr = () => {
    tableNo && setOpenQr(true);
    tableNo && fileDownloadHelper("QrImage", img);

    tableNo && generateQR(`${window.location.origin}/?table=${tableNo}`);
  };
  console.log(restaurantData);
  return (
    <>
      <CustomModal2
        center={true}
        width={400}
        open={openQr}
        onClose={() => setOpenQr(false)}
      >
        <div className="text-center">
          {restaurantData?.map((data, index) => {
            return (
              <div>
                <img
                  key={index}
                  className="w-24 h-24 inline"
                  src={data?.logo}
                  alt=""
                />
                <p className="font-semibold mb-4">{data?.name}</p>
                <p className=" mb-4">Table No: {tableNo && tableNo}</p>
                <div
                  style={{
                    borderColor: data?.color ?? currentColor,
                  }}
                  className=" p-2 border-4 border-dashed relative text-center"
                >
                  <img
                    className="w-[300px] h-[300px] text-center"
                    src={qrImg}
                    alt="qr"
                  />
                  <h6 className="mt-2 absolute bottom-2 left-16">
                    Scan Me to Place Order
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
      </CustomModal2>
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
            onClick={handleQr}
          >
            Generate Qr
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default GenerateQR;
