import { atom } from '@reatom/core';

type AuthToken = string | null;

const authTokenAtom = atom<AuthToken>(null);
const setToken = (token: AuthToken) => {
  authTokenAtom.set(token);
};

export const authStore = {
  authTokenAtom,
  setToken,
};
