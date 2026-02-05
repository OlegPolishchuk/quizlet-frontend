import type { Visibility } from '@/services/types.ts';

export interface Folder {
  id: string;
  ownerId: string;
  title: string;
  description?: string;
  visibility: Visibility;

  sets: [];
  tags: [];

  createdAt: string;
  updatedAt: string;
}

export const VISIBILITY = {
  PRIVATE: 'Private',
  PUBLIC: 'Public',
};
