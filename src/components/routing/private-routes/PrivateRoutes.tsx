import { FC } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, Outlet } from 'react-router-dom';

import { auth } from 'features/auth/firebaseConfig';

export const PrivateRoutes: FC = () => {
  const [user, isLoading] = useAuthState(auth);

  return !isLoading && user ? <Outlet /> : <Navigate to={'/'} />;
};
