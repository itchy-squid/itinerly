import React from 'react';
import { Outlet} from 'react-router-dom';
import { Layout } from './components/Layout';
import './custom.css';
import { ProjectsProvider } from './contexts/ProjectsContext';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { UserProvider } from './contexts/UserContext/UserContext';
import { ToastContainer } from 'react-toastify';

const theme = createTheme({
  typography: {
    h3: {
      fontFamily: 'Quicksand, sans-serif',
    },
    h5: {
      fontFamily: '"Satisfy", sans-serif',
    },
    body: {
      fontFamily: 'Quicksand, sans-serif',
    }
  }
});

const Root = () => {
    return (
      <ThemeProvider theme={theme}>
        <UserProvider>
          <ProjectsProvider>
            <Layout>
              <Outlet/>
              <ToastContainer/>
            </Layout>
          </ProjectsProvider>
        </UserProvider>
      </ThemeProvider>
    );
}

export default Root;