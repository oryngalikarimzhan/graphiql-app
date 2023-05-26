import { FC } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, Outlet } from 'react-router-dom';

import { auth } from 'features/auth/firebaseConfig';

export const RedirectRoutes: FC = () => {
  const [user, isLoading] = useAuthState(auth);

  if (isLoading) return null;

  return !isLoading && user ? <Navigate to={'/'} /> : <Outlet />;
};
