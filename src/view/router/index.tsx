import { RouteObject } from 'react-router-dom';
import Main from '../pages/main';
import Review from '../pages/main/review';
import List from '../pages/main/list';
// const Main = React.lazy(() => import('../pages/main/index.js'));
// const Review = React.lazy(() => import('../pages/main/review/index.js'));

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
        // element: <div>About</div>,
        element: <List />,
      },
    ],
  },
];

export { routerConfig };
