import { useSignIn } from '@clerk/clerk-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { ROUTES } from '@/constants/constants.ts';

export const SignInPage = () => {
  const { signIn, isLoaded } = useSignIn();

  const handleSignIn = async () => {
    if (!isLoaded) return;

    try {
      await signIn.authenticateWithRedirect({
        strategy: 'oauth_google',
        // Куда Clerk вернет пользователя для обработки токена
        redirectUrl: ROUTES.ssoVerify,
        // Куда перенаправить пользователя после успешного входа
        redirectUrlComplete: ROUTES.ssoSync,
      });
    } catch (err) {
      console.error('Ошибка входа:', err);
    }
  };

  return (
    <main className={'flex items-center justify-center h-screen'}>
      <Card>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
        </CardHeader>

        <CardContent>
          <button
            className="cursor-pointer px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
            onClick={handleSignIn}
          >
            <img
              className="w-6 h-6"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              loading="lazy"
              alt="google logo"
            />
            <span>Login with Google</span>
          </button>
        </CardContent>
      </Card>
    </main>
  );
};
