export const BASE_URL: string = 'http://localhost:4200';

export const ROUTES = {
  signIn: '/sign-in',
  ssoVerify: '/sso-verify',
  ssoSync: '/sso-sync',

  /* Folders */
  folders: '/folders',
  createFolder: '/create-folder',
  updateFolder: '/update-folder',

  /* Modules (карточки) */
  modules: '/modules',
  createModule: '/create-module',
  updateModule: '/update-module',
};

export const DEFAULT_STALE_TIME = 60 * 60 * 1000;
export const DEFAULT_DATE_FORMAT = 'DD.MM.YYYY';
