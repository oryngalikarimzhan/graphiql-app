import { ReactNode, Suspense } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import { LoaderSection } from 'components/common/section-loader/LoaderSection';
import { ErrorFallback } from 'components/common/error-fallback/ErrorFallback';

export const QueryBoundary = ({ children }: { children: ReactNode }) => (
  <QueryErrorResetBoundary>
    {({ reset }) => (
      <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
        <Suspense
          fallback={
            <div style={{ flex: 1, height: '100%' }}>
              <LoaderSection />
            </div>
          }
        >
          {children}
        </Suspense>
      </ErrorBoundary>
    )}
  </QueryErrorResetBoundary>
);
