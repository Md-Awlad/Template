import { useEffect } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ChangePassword from "./Components/ChangePassword";
import NavLayout from "./Components/Layouts/NavLayout";
import ThemeLayout from "./Components/Layouts/ThemeLayout";
import MainLoader from "./Components/Loaders/MainLoader";
import NotFound from "./Components/NotFound/NotFound";
import { SuspenseLoader } from "./Components/Shared/SharedStyles";
import { useStateContext } from "./Contexts/ContextProvider";
import {
  CancelOrder,
  CompleteOrder,
  ConfirmedOrder,
  CustomizeFood,
  DashBoard,
  Discount,
  FoodItem,
  LandingPage,
  Login,
  MonthReport,
  Order,
  OrderSummary,
  Settings,
  Survey,
  SurveyList,
} from "./Pages";
import CartInfo from "./Pages/Frontend/CartInfo";

const App = () => {
  const { currentMode, currentUser, isLoading, orderId } = useStateContext();
  useEffect(() => {
    if (
      process.env.NODE_ENV === "production" ||
      process.env.REACT_APP_ENV === "STAGING"
    ) {
      // supress the default console functionality
      // eslint-disable-next-line no-global-assign
      console = {};
      // supress all type of consoles
      console.log = function () {};
      console.info = function () {};
      console.warn = function () {};
      console.error = function () {};
    }
  }, []);
  const routes = [
    {
      path: "",
      element: <LandingPage />,
    },
    {
      path: "cart",
      element: <CartInfo />,
    },
    // {
    //   path: "viewcart",
    //   element: <CartInfo />,
    // },
    {
      path: "ordersummary",
      // element: orderId ? <OrderSummary /> : <Navigate to="/" />,
      element: <OrderSummary />,
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
      path: "dashboard",
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
          path: "customfood",
          element: <CustomizeFood />,
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
          path: "settings",
          element: <Settings />,
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
          <SuspenseLoader>
            {isLoading ? <MainLoader /> : allRoutes}
          </SuspenseLoader>
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
