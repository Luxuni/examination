import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import store from './hooks/store';
import { routerConfig } from './router';
import './tailwind/main.css';

const root = document.getElementById('root');
const router = createBrowserRouter(routerConfig, { basename: '/index.html' });
if (root) {
  createRoot(root).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
  );
}
