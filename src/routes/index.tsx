import { useRoutes } from "react-router-dom";
import { AuthLayout, MainLayout } from "../layout";
import { Dashboard, Login, TopWallet } from "../pages";
import PrivateRoute from "./privateRoute";
import PublicRoute from "./publicRoute";

export default function Routes(): JSX.Element | null {
  return useRoutes([
    {
      path: "/",
      element: <PrivateRoute navLink='/' component={MainLayout} />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "top-wallet",
          element: <TopWallet />,
        }
      ],
    },
    {
      path: "/login",
      element: <PublicRoute component={AuthLayout} />,
      children: [
        {
          index: true,
          element: <Login />,
        }
      ],
    }
  ]);
}
