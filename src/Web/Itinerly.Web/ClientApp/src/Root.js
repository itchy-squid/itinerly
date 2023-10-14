import React from 'react';
import { BrowserRouter, Outlet, Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';
import { Layout } from './components/Layout';
import './custom.css';
import { ProjectsProvider } from './contexts/ProjectsContext';
import { SelectedProjectProvider } from './contexts/SelectedProjectContext';

const Root = () => {
    return (
        <ProjectsProvider>
          <SelectedProjectProvider>
            <Layout>
              <Outlet/>
            </Layout>
          </SelectedProjectProvider>
        </ProjectsProvider>
    );
}

export default Root;