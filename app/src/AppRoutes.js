import { Outlet } from "react-router-dom";
import Root from "./Root";
import { Home } from "./components/Home";
import { ItineraryView } from './views/ItineraryView';
import { ProjectsView } from './views/ProjectsView';
import { ProjectView } from './views/ProjectView';
import { NotFound } from "./components/NotFound/NotFound";
import { FirebaseAuth } from "./components/FirebaseAuth";

const appRoutes = [
  {
    element: <Root/>,
    path: "",
    children: [
      {
        name: 'Home',
        index: true,
        element: <Home/>,
      },
      {
        name: 'Login',
        index: true,
        path: '/login',
        element: <FirebaseAuth/>
      },
      {
        path: "projects",
        element: <Outlet/>,
        children:
        [
          {
            name: 'Projects',
            index: true,
            element: <ProjectsView/>
          },
          {
            path: ':projectId',
            element: <Outlet/>,
            children: 
            [
              {
                element: <ProjectView/>,
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
    name: 'Home',
    path: '/',
    type: 'root'
  },
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
