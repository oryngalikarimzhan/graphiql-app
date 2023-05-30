import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoutes: FC<{
  isAuthorized: boolean;
}> = ({ isAuthorized }) => {
  return isAuthorized ? <Outlet /> : <Navigate to={'/'} />;
};
