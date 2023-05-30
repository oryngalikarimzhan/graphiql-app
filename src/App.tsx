import { FC, lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthState } from 'react-firebase-hooks/auth';

import { Header } from 'components/layout/header/Header';
import { Footer } from 'components/layout/footer/Footer';
import { ErrorFallback } from 'components/common/error-fallback/ErrorFallback';
import { LoaderSection } from 'components/common/section-loader/LoaderSection';
import { PrivateRoutes } from 'components/routing/private-routes/PrivateRoutes';
import { PublicRoutes } from 'components/routing/public-routes/PublicRoutes';
import { useUserAuthStore } from 'features/auth/userAuthStore';
import { auth } from 'features/auth/firebaseConfig';

const Main = lazy(() => import('pages/main/Main'));
const Landing = lazy(() => import('pages/landing/Landing'));
const NotFound = lazy(() => import('pages/not-found/NotFound'));
const Login = lazy(() => import('pages/login/Login'));
const Registration = lazy(() => import('pages/registration/Registration'));

const queryClient = new QueryClient();

const App: FC = () => {
  const [user, isLoading] = useAuthState(auth);

  const setUser = useUserAuthStore((state) => state.setUser);

  useEffect(() => {
    if (!isLoading) {
      setUser(user);
    }
  }, [setUser, user, isLoading]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoaderSection className="loader-screen" />}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Header />

            {isLoading ? (
              <LoaderSection className="loader-screen" />
            ) : (
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Suspense fallback={<LoaderSection className="loader-screen" />}>
                  <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route element={<PrivateRoutes isAuthorized={!!user} />}>
                      <Route index path="/main" element={<Main />} />
                    </Route>
                    <Route element={<PublicRoutes isAuthorized={!!user} />}>
                      <Route path="/login" element={<Login />} />
                      <Route path="/registration" element={<Registration />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </ErrorBoundary>
            )}

            <Footer />
          </BrowserRouter>
        </QueryClientProvider>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
