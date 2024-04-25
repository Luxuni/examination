import { RouteObject } from 'react-router-dom';
import Main from '../pages/main';
import ProblemTable from '../pages/main/problem_table';
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
        path: 'table',
        element: <ProblemTable />,
        id: 'problem_table',
      },
    ],
  },
];

export { routerConfig };
