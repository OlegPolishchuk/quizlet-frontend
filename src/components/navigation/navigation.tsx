import { twMerge } from 'tailwind-merge';

import { NavigationList } from './navigation-list.tsx';

export const Navigation = () => {
  return (
    <aside className={twMerge('hidden md:block', 'h-[calc(100vh-50px)] bg-background')}>
      <div className={'flex h-full w-[200px] flex-col py-4'}>
        <NavigationList />

        {/*<LogoutButton className={'mt-auto mb-10 w-fit gap-4'}>Sign Out</LogoutButton>*/}
      </div>
    </aside>
  );
};
