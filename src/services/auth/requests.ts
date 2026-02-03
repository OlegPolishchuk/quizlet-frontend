import type { User } from '@/services/auth/types.ts';
import { api } from '@/services/instance.ts';

export const syncUser = () => {
  return api.get<User>('/auth/sync');
};

export const getMe = () => {
  return api.get<User>('/profile/me');
};
