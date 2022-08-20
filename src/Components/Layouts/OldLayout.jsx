import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useStateContext } from "../../Contexts/ContextProvider";
import Footer from "../Footer";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

const NavLayout = () => {
  const { activeMenu, themeSettings } = useStateContext();
  return (
    <div className="flex relative dark:bg-main-dark-bg ">
      <div className="fixed right-4 bottom-4" style={{ zIndex: "100" }}>
        {/* <button
          type="button"
          onClick={() => setThemeSettings(true)}
          style={{ background: currentColor, borderRadius: "50%" }}
          className="text-3xl text-neutral p-3 hover:drop-shadow-xl hover:bg-light-gray"
        >
          <FiSettings />
        </button> */}
      </div>
      {/* {activeMenu ? (
        <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
          <Sidebar />
        </div>
      ) : (
        <div className="w-0 lg:w-20 fixed sidebar dark:bg-secondary-dark-bg bg-white">
          <Sidebar />
        </div>
      )} */}
      <div
        className={`fixed sidebar dark:bg-secondary-dark-bg bg-white ${
          activeMenu ? "w-72" : "w-0 lg:w-20"
        }`}
      >
        <Sidebar />
      </div>
      <Box
        className={
          activeMenu
            ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen lg:ml-72"
            : "bg-main-bg dark:bg-main-dark-bg  min-h-screen flex-2 "
        }
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <div className="fixed md:static bg-white dark:bg-main-dark-bg navbar w-full ">
          <Navbar />
        </div>
        <Box
          // className={!activeMenu ? "md:ml-10 lg:ml-0" : ""}
          sx={{ flexGrow: 1, ml: !activeMenu ? { md: 10 } : 0 }}
        >
          {/* {themeSettings && <ThemeSettings />} */}
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </div>
  );
};

export default NavLayout;
