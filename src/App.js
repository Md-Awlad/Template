import { lazy, useEffect } from "react";
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
const CancelOrder = lazy(() => import("./Pages/Admin/CancelOrder"));
const CompleteOrder = lazy(() => import("./Pages/Admin/CompleteOrder"));
const CustomizeFood = lazy(() => import("./Pages/Admin/CustomizeFood"));
const DashBoard = lazy(() => import("./Pages/Admin/Dashboard"));
const Discount = lazy(() => import("./Pages/Admin/Discount"));
const FoodItem = lazy(() => import("./Pages/Admin/FoodItem"));
const Login = lazy(() => import("./Pages/Admin/Login"));
const MonthReport = lazy(() => import("./Pages/Admin/MonthReport"));
const Order = lazy(() => import("./Pages/Admin/Order"));
const Settings = lazy(() => import("./Pages/Admin/Settings"));
const SurveyList = lazy(() => import("./Pages/Admin/SurveyList"));
const CartInfo = lazy(() => import("./Pages/Frontend/CartInfo"));
const ConfirmedOrder = lazy(() => import("./Pages/Frontend/ConfirmedOrder"));
const LandingPage = lazy(() => import("./Pages/Frontend/LandingPage"));
const OrderSummary = lazy(() => import("./Pages/Frontend/OrderSummary"));
const Survey = lazy(() => import("./Pages/Frontend/Survey"));

const App = () => {
  const {
    currentMode,
    currentUser: { id: userId = null },
    restaurantIsLoading,
    orderId,
    isLoading,
  } = useStateContext();
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
      path: "login",
      element: Boolean(userId) ? <NavLayout /> : <Login />,
    },
    {
      path: "*",
      element: <NotFound />,
    },

    {
      path: "dashboard",
      element: Boolean(userId) ? <NavLayout /> : <Navigate to="/login" />,
      children: [
        {
          path: "",
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
            {restaurantIsLoading ? <MainLoader /> : allRoutes}
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
