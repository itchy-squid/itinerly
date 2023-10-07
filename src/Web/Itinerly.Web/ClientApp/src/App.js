import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';
import { Layout } from './components/Layout';
import './custom.css';

const App = () => {
    return (
        <Layout>
            <Routes>
                {AppRoutes.map((route, index) => {
                    const { element, path, exact, ...rest } = route;
                    return <Route key={index} path={path} exact={exact} {...rest} element={element} />;
                })}
            </Routes>
        </Layout>
    );
}

export default App;