import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './hooks/store';
import './tailwind/main.css';
import { StyleProvider } from '@ant-design/cssinjs';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <Provider store={store}>
      <StyleProvider hashPriority="high">
        <App />
      </StyleProvider>
    </Provider>,
  );
}
