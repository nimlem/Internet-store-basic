import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import { SHOP_ROUTE } from '../untils/consts';
import { Context } from '../index';
import styles from './styles.module.css';

const AppRouter = () => {
    const { user } = useContext(Context)
    
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({ path, Component }) =>

                <Route key={path} path={path} element={<Component />} />
            )}
            {publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            <Route path="*" element={<Navigate to={SHOP_ROUTE} />} />
        </Routes>
    );
};

export default AppRouter;