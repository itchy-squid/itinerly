import React from 'react';
import { Outlet} from 'react-router-dom';
import { Layout } from './components/Layout';
import './custom.css';
import { ProjectsProvider } from './contexts/ProjectsContext';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { UserProvider } from './contexts/UserContext/UserContext';
import { ToastContainer } from 'react-toastify';
import { LinkBehavior } from './components/LinkBehavior';
import { SelectedProjectProvider } from './contexts/SelectedProjectContext';

const theme = createTheme({
  components: {
    MuiDivider: {
      defaultProps: {
        variant: 'middle',
      },
    },
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          minHeight: '49px !important',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: '49px !important',
        },
      },
    },
  },
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