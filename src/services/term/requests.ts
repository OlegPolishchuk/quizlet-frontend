import { api } from '@/services/instance.ts';
import type { Term } from '@/services/term/types.ts';

export const findTerm = (term: string) => {
  return api.get<Term[]>(`/terms/${term}`);
};
