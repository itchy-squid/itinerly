import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { appRoutes } from "./AppRoutes";

const router = createBrowserRouter(appRoutes);

export const App = () => {
  return <RouterProvider router={router}/>;
}