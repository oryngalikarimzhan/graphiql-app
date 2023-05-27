import { FC } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, Outlet } from 'react-router-dom';

import { auth } from 'features/auth/firebaseConfig';
import { LoaderSection } from 'components/common/section-loader/LoaderSection';

export const PrivateRoutes: FC = () => {
  const [user, isLoading] = useAuthState(auth);

  if (isLoading) return <LoaderSection className="loader-screen" />;

  return !isLoading && user ? <Outlet /> : <Navigate to={'/'} />;
};
