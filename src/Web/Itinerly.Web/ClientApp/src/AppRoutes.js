import { Home } from "./components/Home";
import { Layout } from "./components/Layout";
import { ItineraryView } from './views/ItineraryView';
import { ProjectsView } from './views/ProjectsView';
import { ProjectView } from './views/ProjectView';

export const AppRoutes = [
    {
        // index: true,
        path: '/',
        name: 'Home',
        element: (<Layout><Home /></Layout>),
        exact: true,
        inNavMenu: true 
    },
    {
        path: '/projects',
        name: 'Projects',
        element: (<Layout><ProjectsView /></Layout>),
        exact: true,
        inNavMenu: true 
    },
    {
        path: '/projects/:id',
        name: 'Project',
        element: (<Layout><ProjectView /></Layout>),
        inNavMenu: false 
    },
    {
        path: '/itinerary',
        name: 'Itinerary',
        element: (<Layout><ItineraryView /></Layout>),
        exact: true,
        inNavMenu: true 
    }
];
