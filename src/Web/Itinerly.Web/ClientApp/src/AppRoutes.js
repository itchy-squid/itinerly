import { Counter } from "./components/Counter";
import { Home } from "./components/Home";
import { ItineraryView } from './views/ItineraryView';

export const AppRoutes = [
    {
        index: true,
        name: 'Home',
        element: <Home />,
        exact: true,
        inNavMenu: true 
    },
    {
        path: '/counter',
        name: 'Counter',
        element: <Counter />,
        exact: true,
        inNavMenu: true 
    },
    {
        path: '/itinerary',
        name: 'Itinerary',
        element: <ItineraryView />,
        inNavMenu: true 
    }
];
