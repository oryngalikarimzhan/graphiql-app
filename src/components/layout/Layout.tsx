import { FC, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import { Header } from './header/Header';
import { Footer } from './footer/Footer';
import { ErrorFallback } from '../common/error-fallback/ErrorFallback';
import { LoaderSection } from '../common/section-loader/LoaderSection';

export const Layout: FC = () => {
  return (
    <>
      <Header />

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<LoaderSection className="loader-screen" />}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>

      <Footer />
    </>
  );
};
