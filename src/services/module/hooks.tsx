import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { createModule, getModules } from '@/services/module/requests.ts';

export const getModulesQueryOptions = () => {
  return queryOptions({
    queryKey: ['modules'],
    queryFn: getModules,
  });
};

export const useGetModules = () => {
  return useQuery({
    ...getModulesQueryOptions(),
    retry: false,
  });
};

export const useCreateModule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createModule,
    onSuccess: () => {
      queryClient.invalidateQueries(getModulesQueryOptions());
    },
  });
};
