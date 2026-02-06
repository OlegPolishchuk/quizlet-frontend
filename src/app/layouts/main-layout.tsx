import { type ReactNode } from 'react';
import { reatomComponent } from '@reatom/react';

import { Header } from '@/components/header/header.tsx';
import { Navigation } from '@/components/navigation/navigation.tsx';

export const MainLayout = reatomComponent(({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <Navigation />

      <div className={'container flex'}>
        <main className={'w-full'}>{children}</main>
      </div>
    </>
  );
});
