export const BASE_URL: string = 'http://localhost:4200';

export const ROUTES = {
  signIn: '/sign-in',
  ssoVerify: '/sso-verify',
  ssoSync: '/sso-sync',

  modules: '/modules',

  folders: '/folders',
  createFolder: '/create-folder',
  updateFolder: '/update-folder',
};

export const DEFAULT_STALE_TIME = 60 * 60 * 1000;
