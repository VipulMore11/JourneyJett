import React from 'react';
import BaseLayout from "../../layout/baselayout"
import Home from "../../pages/Home"
import Place from "../../pages/Place"
import Explore from '../../pages/Explore';
import Discorver from '../../pages/Discorver';
import Events from '../../pages/Events';
import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import Hello from "../../pages/Hello"

const routesConfig = [
  {
    path: '', // Use an empty string for the root route
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/places/:id',
        element: <Place />,
      },
      {
        path: '/explore',
        element: <Explore />,
      },
      {
        path: '/discover',
        element: <Discorver/>,
      },
      {
        path: '/events',
        element: <Discorver/>,
      },
      {
        path: '/hello',
        element: <Hello/>,
      },
    ],
  },
  {
    path: '/login',
    element: <Login/>,
  },
  {
    path: '/signup',
    element: <Register/>,
  },
];

export default routesConfig;
