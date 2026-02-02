import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react';

export const SsoVerifyPage = () => {
  return (
    <>
      <AuthenticateWithRedirectCallback />

      {/* Required for sign-up flows
      Clerk's bot sign-up protection is enabled by default */}
      <div id="clerk-captcha" />
    </>
  );
};
