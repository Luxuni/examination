import { Spin } from 'antd';
import React, { Suspense } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { selectusername } from './features/userSlice';
import { useAppSelector, useCodeMessage, useDarkReader } from './hooks';
import { routerConfig } from './router';
const router = createBrowserRouter(routerConfig, { basename: '/index.html' });
const App: React.FC = () => {
  useCodeMessage();
  useDarkReader();
  const username = useAppSelector(selectusername)?.label ?? '';
  return (
    <div className="h-screen p-4 overflow-scroll bg-[var(--vscode-notebook-editorBackground)] App">
      <Suspense
        fallback={
          <div className="h-full w-full flex items-center justify-center">
            <Spin size="large" />
          </div>
        }
      >
        <h2 className="text-2xl font-black text-center my-4">Hi!{username}</h2>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
};

export default App;
