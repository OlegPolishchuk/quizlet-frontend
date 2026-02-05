import type { Term } from '@/services/term/types.ts';

export interface Module {
  id: string;
  ownerId: string;
  folderId?: string;
  title: string;
  description: string;
  terms: Term[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}
