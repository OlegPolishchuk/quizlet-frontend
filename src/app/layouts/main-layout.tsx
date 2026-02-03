import { type ReactNode } from 'react';
import { reatomComponent } from '@reatom/react';

import { Header } from '@/components/header/header.tsx';

export const MainLayout = reatomComponent(({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main className={'container'}>{children}</main>
    </>
  );
});
