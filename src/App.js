import { Navigate, useRoutes, useSearchParams } from "react-router-dom";

import "./App.css";
import NavLayout from "./Components/Layouts/NavLayout";
import "react-toastify/dist/ReactToastify.css";
import ThemeLayout from "./Components/Layouts/ThemeLayout";
import { useStateContext } from "./Contexts/ContextProvider";
import {
  DashBoard,
  Login,
  Order,
  FoodItem,
  Register,
  Discount,
  CompleteOrder,
  LandingPage,
  OrderSummary,
  Survey,
  SurveyList,
  ConfirmedOrder,
  MonthReport,
  CancelOrder,
  CustomizeFood,
} from "./Pages";
import NotFound from "./Components/NotFound/NotFound";
import { ToastContainer } from "react-toastify";
import MainLoader from "./Components/Loaders/MainLoader";
import CartInfo from "./Pages/Frontend/CartInfo";
import ChangePassword from "./Components/ChangePassword";
import Test from "./Pages/Frontend/Test";

const App = () => {
  const [searchParams] = useSearchParams();
  const { currentMode, currentUser, isLoading, orderId, activeMenu } =
    useStateContext();

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
      path: "viewcart",
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
      path: "/dashboard",
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
