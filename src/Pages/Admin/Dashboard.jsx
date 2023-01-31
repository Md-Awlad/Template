import { useLocation } from "react-router-dom";

const DashBoard = () => {
  const { pathname } = useLocation();
  return (
    <div className="md:flex justify-between mb-5 py-2 px-4 rounded-md shadow items-center bg-white">
      <div className="">
        <h2 className="text-3xl  font-semibold capitalize">
          Welcome <span className="text-gray-600">!</span>
        </h2>
        <p className="text-sm my-2 font-medium capitalize">
          {pathname.replace("/", "")}
        </p>
      </div>
    </div>
  );
};
export default DashBoard;
