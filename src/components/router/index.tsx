import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import * as React from 'react';

const Home = React.lazy(() => import('../../pages/home'));
const Persona = React.lazy(() => import('../../pages/persona'));
const Personas = React.lazy(() => import('../../pages/personas'));

const Router: React.FC = () => {
  // Utils
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/personas",
      element: <Personas />,
    },
    {
      path: "/personas/crear",
      element: <Persona />,
    },    
    {
      path: "/personas/:id",
      element: <Persona />,
    },
  ]);

  // Render
  return <RouterProvider router={router} />;
};

export default Router;