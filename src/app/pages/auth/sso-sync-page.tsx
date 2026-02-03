import { Navigate } from 'react-router';

import { Spinner } from '@/components/ui/spinner.tsx';
import { useSyncUser } from '@/services/auth/hooks.tsx';

export const SsoSyncPage = () => {
  const { data, isPending } = useSyncUser();

  if (isPending) {
    return (
      <div className={'flex items-center justify-center h-screen'}>
        <Spinner className={'scale-200'} />
      </div>
    );
  }

  if (data?.data.id) {
    return <Navigate to={'/'} replace />;
  }

  return null;
};
