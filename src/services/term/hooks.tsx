import { queryOptions, useQuery } from '@tanstack/react-query';

import { findTerm } from '@/services/term/requests.ts';

export const findTermQueryOptions = (term: string) => {
  return queryOptions({
    queryKey: ['term', term],
    queryFn: () => findTerm(term),
  });
};

export const useFindTerm = (term: string) => {
  return useQuery({
    ...findTermQueryOptions(term),
  });
};
