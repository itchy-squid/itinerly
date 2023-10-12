import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';
import { Layout } from './components/Layout';
import './custom.css';
import { ProjectsProvider } from './contexts/ProjectsContext';

const App = () => {
    return (
        <ProjectsProvider>
            <Layout>
                <Routes>
                    {AppRoutes.map((route, idx) => {
                        const { element, path, exact, ...rest } = route;
                        return <Route key={idx} path={path} exact={exact} {...rest} element={element} />;
                    })}
                </Routes>
            </Layout>
        </ProjectsProvider>
    );
}

export default App;