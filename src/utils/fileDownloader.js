import { toast } from "react-toastify";
import { staticAxios } from "./myAxios";

const fileDownloadHelper = async (fileTitle, fileURL) => {
  const extention = fileURL?.split(".")?.pop();
  const fileName = `${fileTitle}.${extention}`;
  try {
    const response = await staticAxios({
      url: fileURL,
      method: "GET",
      responseType: "blob", // important
    });
    const url = window.URL.createObjectURL(response.data);
    const link = window.document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
  } catch (error) {
    toast.error("Error downloading document");
  }
};
export default fileDownloadHelper;
