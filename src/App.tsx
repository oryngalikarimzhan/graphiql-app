import { FC, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ErrorFallback } from 'components/common/error-fallback/ErrorFallback';
import { LoaderSection } from 'components/common/section-loader/LoaderSection';
import { Layout } from 'components/layout/Layout';
import { PrivateRoutes } from 'components/auth/PrivateRoutes';
import { AuthProvider } from 'components/auth/AuthProvider';
import { PublicRoutes } from 'components/auth/PublicRoutes';

const Studio = lazy(() => import('pages/playground/Playground'));
const Landing = lazy(() => import('pages/landing/Landing'));
const NotFound = lazy(() => import('pages/not-found/NotFound'));
const SignIn = lazy(() => import('pages/sign-in/SignIn'));
const SignUp = lazy(() => import('pages/sign-up/SignUp'));

const queryClient = new QueryClient();

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route element={<PrivateRoutes />}>
          <Route index path="/playground" element={<Studio />} />
        </Route>
        <Route element={<PublicRoutes />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

const App: FC = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoaderSection className="loader-screen" />}>
        <BrowserRouter>
          <AuthProvider>
            <QueryClientProvider client={queryClient}>
              <AppRoutes />
            </QueryClientProvider>
          </AuthProvider>
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
