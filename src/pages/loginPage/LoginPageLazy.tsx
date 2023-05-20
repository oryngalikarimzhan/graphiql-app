import { lazy } from 'react';

export const LoginPageLazy = lazy(() => import('./LoginPage'));

export const LoginPageDemoLazy = lazy(() =>
  new Promise((resolve) => {
    setTimeout(resolve, 5000);
  }).then(() => import('./LoginPage'))
);
