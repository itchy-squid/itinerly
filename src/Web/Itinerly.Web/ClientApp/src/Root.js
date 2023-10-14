import React from 'react';
import { BrowserRouter, Outlet, Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';
import { Layout } from './components/Layout';
import './custom.css';
import { ProjectsProvider } from './contexts/ProjectsContext';
import { SelectedProjectProvider } from './contexts/SelectedProjectContext';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';

const theme = createTheme({});

const Root = () => {
    return (
      <ThemeProvider theme={theme}>
        <ProjectsProvider>
          <SelectedProjectProvider>
            <Layout>
              <Outlet/>
            </Layout>
          </SelectedProjectProvider>
        </ProjectsProvider>
      </ThemeProvider>
    );
}

export default Root;