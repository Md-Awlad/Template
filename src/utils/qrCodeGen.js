import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import QRCode from "qrcode";
import { useState } from "react";
import { CustomModal } from "../Components/Shared/SharedStyles";

const GenerateQR = ({ text }) => {
  const [qrImg, setQrImg] = useState();
  const [openQr, setOpenQr] = useState(false);
  const [tableNo, setTableNo] = useState("");

  let img;
  
  const generateQR = async (tex) => {
    try {
      img = await QRCode.toDataURL(tex);
      setQrImg(img);
    } catch (err) {
      console.error(err);
    }
  };

  const handleQr = () => {
    setOpenQr(true);

    generateQR(`${window.location.origin}/?table=${tableNo}`);
  };
  console.log(window.location.origin);
  console.log(tableNo);
  return (
    <>
      <div className=" w-full border-2  flex justify-center items-center h-screen">
        <CustomModal open={openQr} onClose={() => setOpenQr(false)}>
          <div>
            <img className="w-100 h-100" src={qrImg} alt="qr" />
          </div>
        </CustomModal>

        <Box className="   ">
          <TextField
            size="small"
            type="text"
            onChange={(e) => setTableNo(e.target.value)}
          />
          <Button
            sx={{
              display: "block",
            }}
            size="medium"
            variant="contained"
            className="border-2 "
            onClick={handleQr}
          >
            Generate
          </Button>
        </Box>
      </div>
    </>
  );
};

export default GenerateQR;
