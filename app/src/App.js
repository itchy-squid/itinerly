import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { appRoutes } from "./AppRoutes";
import { UserProvider } from "./contexts/UserContext";
import { ProjectsProvider } from "./contexts/ProjectsContext";
import { SelectedProjectProvider } from "./contexts/SelectedProjectContext";

const router = createBrowserRouter(appRoutes);

export const App = () => {
  return (
    <UserProvider>
      <ProjectsProvider>
        <SelectedProjectProvider>
          <RouterProvider router={router}/>
        </SelectedProjectProvider>
      </ProjectsProvider>
    </UserProvider>
  );
}