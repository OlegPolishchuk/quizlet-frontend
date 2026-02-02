import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@clerk/clerk-react';

import { ROUTES } from '@/constants/constants.ts';

export const ProtectedRoute = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return <p>Loading...</p>;
  if (!isSignedIn) return <Navigate to={ROUTES.signIn} replace />;

  return <Outlet />;
};
