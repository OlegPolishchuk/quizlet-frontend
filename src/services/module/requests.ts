import { type CreateStudySetInput } from '@/app/pages/(main)/modules/components/module-form/create-module-schema.ts';
import { api } from '@/services/instance.ts';
import type { Module, ModuleListItem } from '@/services/module/types.ts';
import type { ListResponse } from '@/services/types.ts';

export const getModules = () => {
  return api.get<ListResponse<ModuleListItem>>('/modules');
};

export const createModule = (data: CreateStudySetInput) => {
  return api.post<Module>('/modules', data);
};
