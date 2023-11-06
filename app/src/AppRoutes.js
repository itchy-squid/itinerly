import { Outlet } from "react-router-dom";
import Root from "./Root";
import { ItineraryView } from './views/ItineraryView';
import { ProjectsView } from './views/ProjectsView';
import { Project, ProjectOutlet } from './views/ProjectView';
import { NotFound } from "./components/NotFound/NotFound";
import { LoginView } from "./views/LoginView/LoginView";

const appRoutes = [
  {
    element: <Outlet/>,
    path: "",
    children: [
      {
        name: 'Home',
        index: true,
        element: <LoginView/>,

      },
      {
        name: 'Login',
        index: true,
        path: 'login',
        element: <LoginView/>
      },
      {
        path: "projects",
        element: <Root/>,
        children:
        [
          {
            name: 'Projects',
            index: true,
            element: <ProjectsView/>
          },
          {
            path: ':projectId',
            element: <ProjectOutlet/>,
            children: 
            [
              {
                element: <Project/>,
                index: true,
              },
              {
                name: 'Itinerary',
                path: 'itinerary',
                element: <ItineraryView/>
              }
            ]
          }
        ]
      },
      {
        element: <NotFound/>,
        path: "*"
      }
    ]
  }
]

const navRoutes = 
[
  {
    name: 'Projects',
    path: '/projects',
    type: 'root'
  }
];

export {
  appRoutes,
  navRoutes
};
