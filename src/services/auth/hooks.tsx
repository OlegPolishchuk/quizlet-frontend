import { queryOptions, useQuery } from '@tanstack/react-query';

import { DEFAULT_STALE_TIME } from '@/constants/constants.ts';
import { getMe, syncUser } from '@/services/auth/requests.ts';

export const useSyncUser = () => {
  return useQuery({
    queryKey: ['syncUser'],
    queryFn: syncUser,
  });
};

export const meQueryOptions = queryOptions({
  queryKey: ['me'],
  queryFn: getMe,
  staleTime: DEFAULT_STALE_TIME,
});

export const useGetMe = () => {
  return useQuery({
    ...meQueryOptions,
    retry: false,
  });
};
