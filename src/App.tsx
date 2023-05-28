import { FC, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Header } from 'components/layout/header/Header';
import { Footer } from 'components/layout/footer/Footer';
import { ErrorFallback } from 'components/common/error-fallback/ErrorFallback';
import { LoaderSection } from 'components/common/section-loader/LoaderSection';
import { PrivateRoutes } from 'components/routing/private-routes/PrivateRoutes';
import { PublicRoutes } from 'components/routing/public-routes/PublicRoutes';
const Main = lazy(() => import('pages/main/Main'));
const Landing = lazy(() => import('pages/landing/Landing'));
const NotFound = lazy(() => import('pages/not-found/NotFound'));
const Login = lazy(() => import('pages/login/Login'));
const Registration = lazy(() => import('pages/registration/Registration'));

const queryClient = new QueryClient();

const App: FC = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoaderSection className="loader-screen" />}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Header />

            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<LoaderSection className="loader-screen" />}>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route element={<PrivateRoutes />}>
                    <Route index path="/main" element={<Main />} />
                  </Route>
                  <Route element={<PublicRoutes />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/registration" element={<Registration />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>

            <Footer />
          </BrowserRouter>
        </QueryClientProvider>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
