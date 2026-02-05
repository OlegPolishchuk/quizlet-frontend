import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { createModule, getModules } from '@/services/module/requests.ts';

export const getModulesQueryOptions = (userId: string) => {
  return queryOptions({
    queryKey: ['modules', userId],
    queryFn: getModules,
  });
};

export const useGetModules = (userId: string) => {
  return useQuery({
    ...getModulesQueryOptions(userId),
    retry: false,
  });
};

export const useCreateModule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createModule,
    onSuccess: res => {
      const useId = res.data.ownerId;

      queryClient.invalidateQueries(getModulesQueryOptions(useId));
    },
  });
};
