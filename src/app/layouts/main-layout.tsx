import { type ReactNode } from 'react';
import { reatomComponent } from '@reatom/react';

import { Header } from '@/components/header/header.tsx';
import { Navigation } from '@/components/navigation/navigation.tsx';

export const MainLayout = reatomComponent(({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />

      <div className={'container flex'}>
        <Navigation />

        <main className={'w-full py-6 md:pl-6'}>{children}</main>
      </div>
    </>
  );
});
