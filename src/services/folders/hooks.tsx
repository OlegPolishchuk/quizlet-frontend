import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  createNewFolder,
  deleteFolder,
  getFolderById,
  getPrivateFolders,
  updateFolder,
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

export const useUpdateFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFolder,
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

export const getCurrentFolderQueryOptions = (folderId: string) => {
  return queryOptions({
    queryKey: ['folder', folderId],
    queryFn: () => getFolderById(folderId),
  });
};

export const useGetFolderById = (folderId: string) => {
  return useQuery({
    ...getCurrentFolderQueryOptions(folderId),
  });
};
