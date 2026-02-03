import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  createNewFolder,
  deleteFolder,
  getPrivateFolders,
} from '@/services/folders/requests.ts';

export const folderQueryOptions = queryOptions({
  queryKey: ['folders'],
  queryFn: getPrivateFolders,
});

export const useGetPrivateFolders = () => {
  return useQuery({
    ...folderQueryOptions,
    retry: false,
  });
};

export const useCreateFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNewFolder,
    onSuccess: () => {
      queryClient.invalidateQueries(folderQueryOptions);
    },
  });
};

export const useDeleteFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFolder,
    onSuccess: () => {
      queryClient.invalidateQueries(folderQueryOptions);
    },
  });
};
