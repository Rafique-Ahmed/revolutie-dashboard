// src/routes/RouteBuilder.tsx
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AnimatedLayout } from '../components/layout/AnimatedLayout';
import { allRoutes } from './index';

interface RouteConfig {
  path: string;
  element: React.ReactNode;
  children?: RouteConfig[];
}

export const RouteBuilder = () => {
  const location = useLocation();

  const renderRoutes = (routes: RouteConfig[]) => {
    return routes.map((route, index) => {
      if (route.children) {
        return (
          <Route key={index} path={route.path} element={route.element}>
            {renderRoutes(route.children)}
          </Route>
        );
      }
      return <Route key={index} path={route.path} element={route.element} />;
    });
  };

  return (
    <AnimatePresence mode="wait">
      <AnimatedLayout key={location.pathname}>
        <Routes location={location}>
          {renderRoutes(allRoutes)}
        </Routes>
      </AnimatedLayout>
    </AnimatePresence>
  );
};
