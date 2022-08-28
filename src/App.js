import { useRoutes } from "react-router-dom";

import "./App.css";
import NavLayout from "./Components/Layouts/NavLayout";

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

const App = () => {
  const { currentMode, currentUser } = useStateContext();
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
        {
          path: "login",
          element: <Login />,
        },
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
          {/* {isLoading ? <MainLoader /> : allRoutes} */}
          {allRoutes}
        </div>
      </div>
    </ThemeLayout>
  );
};

export default App;
