import { RouterProvider } from 'react-router';

import { router } from '@/app/router/router.tsx';

export const RoutesProvider = () => {
  return <RouterProvider router={router} />;
};
