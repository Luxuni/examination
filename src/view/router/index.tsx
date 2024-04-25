import { RouteObject } from 'react-router-dom';
import Main from '../pages/main';
import List from '../pages/main/list';
import Review from '../pages/main/review';

const routerConfig: RouteObject[] = [
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '',
        element: <Review />,
        id: 'review',
      },
      {
        path: 'about',
        element: <List />,
        id: 'list',
      },
    ],
  },
];

export { routerConfig };
