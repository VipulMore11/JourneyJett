import React from 'react';
import BaseLayout from "../../layout/baselayout"
import Home from "../../pages/Home"
import Place from "../../pages/Place"
import Explore from '../../pages/Explore';

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
      // Add more routes as needed
    ],
  },
];

export default routesConfig;
