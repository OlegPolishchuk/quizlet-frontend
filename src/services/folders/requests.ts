import type { CreateFolderSchema } from '@/app/pages/(main)/folders/components/folder-form/create-folder-schema.ts';
import type { Folder } from '@/services/folders/types.ts';
import { api } from '@/services/instance.ts';
import type { ListResponse } from '@/services/types.ts';

export const createNewFolder = (foolderData: CreateFolderSchema) => {
  return api.post<Folder>('/folders', foolderData);
};

export const getPrivateFolders = () => {
  return api.get<ListResponse<Folder>>('/folders/');
};

export const deleteFolder = (folderId: string) => {
  return api.delete<ListResponse<Folder>>(`/folders/${folderId}`);
};
