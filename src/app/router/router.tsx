import { createBrowserRouter, Outlet } from 'react-router';
import { ClerkProvider } from '@clerk/react-router';

import App from '@/app/App.tsx';
import { SignInPage } from '@/app/pages/auth/sign-in-page.tsx';
import { SsoSyncPage } from '@/app/pages/auth/sso-sync-page.tsx';
import { SsoVerifyPage } from '@/app/pages/auth/sso-verify-page.tsx';
import { ProtectedRoute } from '@/app/router/protected-route.tsx';
import { ROUTES } from '@/constants/constants.ts';

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file');
}

export const router = createBrowserRouter([
  {
    element: (
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <Outlet />
      </ClerkProvider>
    ),
    children: [
      // --- Публичные маршруты ---
      { path: ROUTES.signIn, element: <SignInPage /> },
      {
        path: ROUTES.ssoVerify,
        element: <SsoVerifyPage />,
      },
      {
        path: ROUTES.ssoSync,
        element: <SsoSyncPage />,
      },

      // --- Приватные маршруты (сгруппированы) ---
      {
        element: <ProtectedRoute />,
        children: [{ path: '/', element: <App /> }],
      },
    ],
  },
]);
