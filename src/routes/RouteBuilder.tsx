// src/routes/RouteBuilder.tsx
import React from 'react';
import { RouteObject, Routes, Route, useLocation } from 'react-router-dom';

interface RouteBuilderProps {
  routes?: RouteObject[]; // ✅ Make routes optional
}

export const RouteBuilder: React.FC<RouteBuilderProps> = ({ routes = [] }) => {
  const location = useLocation();

  // Recursive function to render routes
  const renderRoutes = (routesArray: RouteObject[]): React.ReactNode => {
    // ✅ Check if routesArray exists and is an array
    if (!routesArray || !Array.isArray(routesArray)) {
      return null;
    }

    return routesArray.map((route, index) => {
      // ✅ Check if route exists
      if (!route) {
        return null;
      }

      if (route.children && route.children.length > 0) {
        return (
          <Route key={route.path || index} path={route.path} element={route.element}>
            {renderRoutes(route.children)}
          </Route>
        );
      }
      return <Route key={route.path || index} path={route.path} element={route.element} />;
    });
  };

  // ✅ Only render if routes exist
  if (!routes || routes.length === 0) {
    return null;
  }

  return <Routes location={location}>{renderRoutes(routes)}</Routes>;
};

export default RouteBuilder;
