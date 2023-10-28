import { Outlet } from "react-router-dom";
import Root from "./Root";
import { Home } from "./components/Home";
import { ItineraryView } from './views/ItineraryView';
import { ProjectsView } from './views/ProjectsView';
import { ProjectView } from './views/ProjectView';
import { NotFound } from "./components/NotFound/NotFound";

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
            path: ":projectId",
            element: <ProjectView/>,
            children:
            [
              {
                name: 'Itinerary',
                path: 'itinerary',
                element: <ItineraryView/>,
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

function flattenRoutes(routes, parentPath = '') {
  let flatRoutes = [];

  routes
  .forEach(route => {
    const fullPath = route.path ? `${parentPath}/${route.path}` : parentPath;
    
    // Push current route to the flat model
    if(route.index) {
      flatRoutes.push({path: fullPath, name: route.name});
    }

    // If this route has children, recurse and add them to the flat model
    if (route.children && route.children.length) {
      flatRoutes = flatRoutes.concat(flattenRoutes(route.children, fullPath));
    }
  });

  return flatRoutes;
}

const navRoutes = flattenRoutes(appRoutes);

export {
  appRoutes,
  navRoutes
};
