import { Outlet } from "react-router-dom";
import Root from "./Root";
import { Home } from "./components/Home";
import { Layout } from "./components/Layout";
import { ItineraryView } from './views/ItineraryView';
import { ProjectsView } from './views/ProjectsView';
import { ProjectView } from './views/ProjectView';

const appRoutes = [
  {
    element: <Root/>,
    path: "",
    children: [
      {
        index: true,
        element: <Home/>,
        name: 'Home'
      },
      {
        path: "projects",
        element: <Outlet/>,
        children:
        [
          {
            index: true,
            element: <ProjectsView/>,
            name: 'Projects'
          },
          {
            path: ":projectId",
            element: <ProjectView/>
          }
        ]
      },
      {
        path: 'itinerary',
        element: <Outlet/>,
        children: [
          {
            index: true,
            element: <ItineraryView/>,
            name: 'Itinerary'
          }
        ]
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
