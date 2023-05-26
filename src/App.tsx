import { FC, lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import { Header } from 'components/layout/header/Header';
import { Footer } from 'components/layout/footer/Footer';
import { SpinnerLoader } from 'components/common/spinner-loader/SpinnerLoader';
import { ErrorFallback } from 'components/common/error-fallback/ErrorFallback';

const Main = lazy(() => import('pages/main/Main'));
const Landing = lazy(() => import('pages/landing/Landing'));
const NotFound = lazy(() => import('pages/not-found/NotFound'));
const Login = lazy(() => import('pages/login/Login'));
const Registration = lazy(() => import('pages/registration/Registration'));

const App: FC = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Header />

      <Suspense fallback={<SpinnerLoader />}>
        <Routes>
          <Route path="/" element={<Navigate to="/welcome" replace />} />
          <Route index path="/main" element={<Main />} />
          <Route path="/welcome" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Footer />
    </ErrorBoundary>
  );
};

export default App;
