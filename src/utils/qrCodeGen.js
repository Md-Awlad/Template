import QRCode from "qrcode";
import { useState } from "react";

const GenerateQR = ({ text }) => {
  const [state, setstate] = useState();
  let img;
  var max_table_no = 20;

  const tabledata = [
    {
      base_url: "nexisltd.com/?table_no=2",
    },
    {
      base_url: "nexisltd.com/?table_no=2",
    },
    {
      base_url: "nexisltd.com/?table_no=2",
    },
    {
      base_url: "nexisltd.com/?table_no=2",
    },
  ];

  const generateQR = async (tex) => {
    try {
      img = await QRCode.toDataURL(tex);
      setstate(img);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div className="w-full border-2 flex justify-items-center h-screen">
        <button
          className="border-2 "
          onClick={() => generateQR("https://nexisltd.com/")}
        >
          click
        </button>
        <img className="w-100 h-100" src={state} alt="qr" />
      </div>
    </>
  );
};

export default GenerateQR;
