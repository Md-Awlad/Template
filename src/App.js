import { useRoutes } from "react-router-dom";

import "./App.css";
import NavLayout from "./Components/Layouts/NavLayout";
import "react-toastify/dist/ReactToastify.css";
import ThemeLayout from "./Components/Layouts/ThemeLayout";
import { useStateContext } from "./Contexts/ContextProvider";
import {
  DashBoard,
  Profile,
  Login,
  Order,
  FoodItem,
  Settings,
  Register,
} from "./Pages";
import NotFound from "./Components/NotFound/NotFound";
import { ToastContainer } from "react-toastify";
import MainLoader from "./Components/Loaders/MainLoader";

const App = () => {
  const { currentMode, currentUser, isLoading } = useStateContext();
  // console.log(currentUser);
  // console.log(isLoading);

  const routes = [
    {
      path: "/",
      element: currentUser?.id ? <NavLayout /> : <Login />,
      children: [
        {
          path: "dashboard",
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
        // {
        //   path: "login",
        //   element: <Login />,
        // },
        {
          path: "register",
          element: <Register />,
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
