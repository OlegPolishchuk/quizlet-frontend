import type { Term } from '@/services/term/types.ts';

export interface Module {
  id: string;
  ownerId: string;
  folderId?: string;
  title: string;
  description: string;
  cards: Term[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ModuleListItem extends Exclude<Module, 'cards'> {
  cardsCount: number;
}
