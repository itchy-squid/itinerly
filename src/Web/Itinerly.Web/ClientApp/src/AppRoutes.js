import { Home } from "./components/Home";
import { ItineraryView } from './views/ItineraryView';
import {ProjectsView} from './views/ProjectsView';

export const AppRoutes = [
    {
        index: true,
        name: 'Home',
        element: <Home />,
        exact: true,
        inNavMenu: true 
    },
    {
        path: '/projects',
        name: 'Projects',
        element: <ProjectsView />,
        inNavMenu: true 
    },
    {
        path: '/itinerary',
        name: 'Itinerary',
        element: <ItineraryView />,
        inNavMenu: true 
    }
];
