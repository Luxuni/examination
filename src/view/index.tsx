import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './tailwind/main.css';
import { Provider } from 'react-redux';
import store from './hooks/store';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
}
