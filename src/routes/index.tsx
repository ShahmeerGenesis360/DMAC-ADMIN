import { useRoutes } from "react-router-dom";
import { MainLayout } from "../layout";
import { Dashboard, TopWallet } from "../pages";
import PublicRoute from "./publicRoute";

export default function Routes(): JSX.Element | null {
  return useRoutes([
    {
      path: "/",
      element: <PublicRoute component={MainLayout} />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "/top-wallet",
          element: <TopWallet />,
        }
      ],
    }
  ]);
}
