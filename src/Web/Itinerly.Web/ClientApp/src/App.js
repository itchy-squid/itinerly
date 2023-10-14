import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AppRoutesV2 } from "./AppRoutes";

const router = createBrowserRouter(AppRoutesV2);

export const App = () => {
  return <RouterProvider router={router}/>;
}