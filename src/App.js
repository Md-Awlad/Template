import { lazy } from "react";
import { useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import NotFound from "./Components/NotFound/NotFound";
import { SuspenseLoader } from "./Components/Shared/SharedStyles";
import React from "react";
import Home from "./Pages/Frontend/Home";
import NavLayout from "./global/NavLayout";
import Login from "./Components/Frontend/Login";
const DashBoard = lazy(() => import("./Pages/Admin/Dashboard"));

const App = () => {
  const routes = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "*",
      element: <NotFound />,
    },

    {
      path: "",
      element: <NavLayout />,
      children: [
        {
          path: "dashboard",
          element: <DashBoard />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ];
  const allRoutes = useRoutes(routes);

  return (
    <div>
      <div className="overflow-hidden">
        <SuspenseLoader>{allRoutes}</SuspenseLoader>
      </div>
      <ToastContainer
        position="top-right"
        // limit={3}
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{
          marginTop: "50px",
        }}
      />
    </div>
  );
};

export default App;
