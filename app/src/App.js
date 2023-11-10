import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { appRoutes } from "./AppRoutes";
import { UserProvider } from "./contexts/UserContext";
import { ProjectsProvider } from "./contexts/ProjectsContext";
import { SelectedProjectProvider } from "./contexts/SelectedProjectContext";
import { Provider } from "react-redux";
import { store } from "./state/store";

const router = createBrowserRouter(appRoutes);

export const App = () => {
  return (
    <Provider store={store}>
      <UserProvider>
        <ProjectsProvider>
          <SelectedProjectProvider>
            <RouterProvider router={router}/>
          </SelectedProjectProvider>
        </ProjectsProvider>
      </UserProvider>
    </Provider>
  );
}