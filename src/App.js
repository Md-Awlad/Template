import { Navigate, useRoutes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ChangePassword from "./Components/ChangePassword";
import NavLayout from "./Components/Layouts/NavLayout";
import ThemeLayout from "./Components/Layouts/ThemeLayout";
import MainLoader from "./Components/Loaders/MainLoader";
import NotFound from "./Components/NotFound/NotFound";
import { useStateContext } from "./Contexts/ContextProvider";
import {
  CancelOrder,
  CompleteOrder,
  ConfirmedOrder,
  DashBoard,
  Discount,
  FoodItem,
  LandingPage,
  Login,
  MonthReport,
  Order,
  OrderSummary,
  Survey,
  SurveyList,
} from "./Pages";
import CartInfo from "./Pages/Frontend/CartInfo";

const App = () => {
  const { currentMode, currentUser, isLoading, orderId } = useStateContext();

  const routes = [
    {
      path: "",
      element: <Navigate to="home" />,
    },
    {
      path: "home",
      element: <LandingPage />,
    },
    {
      path: "cart",
      element: <CartInfo />,
    },
    {
      path: "ordersummary",
      element: orderId ? <OrderSummary /> : <Navigate to="/" />,
    },
    {
      path: "survey",
      element: <Survey />,
    },
    {
      path: "confirmed",
      element: <ConfirmedOrder />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "admin",
      element: <Navigate to="dashboard" />,
    },
    {
      path: "dashboard",
      element: currentUser?.id ? <NavLayout /> : <Login />,
      children: [
        {
          index: true,
          element: <DashBoard />,
        },
        {
          path: "fooditem",
          element: <FoodItem />,
        },
        {
          path: "order",
          element: <Order />,
        },
        {
          path: "completeOrder",
          element: <CompleteOrder />,
        },
        {
          path: "cancelorder",
          element: <CancelOrder />,
        },
        {
          path: "discount",
          element: <Discount />,
        },
        {
          path: "change-password",
          element: <ChangePassword />,
        },
        {
          path: "report",
          element: <MonthReport />,
        },
        {
          path: "surveylist",
          element: <SurveyList />,
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
    <ThemeLayout>
      <div className={currentMode === "Dark" ? "dark" : ""}>
        <div className="overflow-hidden">
          {isLoading ? <MainLoader /> : allRoutes}
          {/* {allRoutes} */}
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
    </ThemeLayout>
  );
};

export default App;
