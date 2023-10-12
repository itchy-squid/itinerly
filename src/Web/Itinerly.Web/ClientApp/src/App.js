import React from 'react';
import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';
import { Layout } from './components/Layout';
import './custom.css';
import { ProjectsProvider } from './contexts/ProjectsContext';
import { SelectedProjectProvider } from './contexts/SelectedProjectContext';

const router = createBrowserRouter(
  createRoutesFromElements(
    AppRoutes.map((route, idx) => 
    {
      const { element, path, exact } = route;
      return <Route key={idx} path={path} exact={exact} element={element} />;
    })
  )
);

const App = () => {
    return (
        <ProjectsProvider>
          <SelectedProjectProvider>
            <RouterProvider router={router}>
              <Layout>
              </Layout>
            </RouterProvider>
          </SelectedProjectProvider>
        </ProjectsProvider>
    );
}

export default App;