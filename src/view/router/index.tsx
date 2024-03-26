import { RouteObject } from 'react-router-dom';
import Main from '../pages/main';
import Review from '../pages/main/review';

const routerConfig: RouteObject[] = [
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '',
        element: <Review />,
      },
      {
        path: 'about',
        element: <div>About</div>,
      }
    ],
  },
];

export { routerConfig };
