import React from 'react';
import { Outlet} from 'react-router-dom';
import { Layout } from './components/Layout';
import './custom.css';
import { ProjectsProvider } from './contexts/ProjectsContext';
import { SelectedProjectProvider } from './contexts/SelectedProjectContext';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { UserProvider } from './contexts/UserContext/UserContext';
import { ToastContainer } from 'react-toastify';

const theme = createTheme({});

const Root = () => {
    return (
      <ThemeProvider theme={theme}>
        <UserProvider>
          <ProjectsProvider>
            <SelectedProjectProvider>
              <Layout>
                <Outlet/>
                <ToastContainer/>
              </Layout>
            </SelectedProjectProvider>
          </ProjectsProvider>
        </UserProvider>
      </ThemeProvider>
    );
}

export default Root;