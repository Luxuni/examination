import React from 'react';
import App from '../App';

const routerConfig = [
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'about',
    element: <div>About</div>,
  },
];

export { routerConfig };
