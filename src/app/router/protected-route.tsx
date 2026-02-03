import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@clerk/clerk-react';

import { MainLayout } from '@/app/layouts/main-layout.tsx';
import { Spinner } from '@/components/ui/spinner.tsx';
import { ROUTES } from '@/constants/constants.ts';

export const ProtectedRoute = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded)
    return (
      <div className={'flex items-center justify-center h-screen'}>
        <Spinner className={'scale-200'} />
      </div>
    );
  if (!isSignedIn) return <Navigate to={ROUTES.signIn} replace />;

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};
