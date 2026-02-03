import React from 'react';
import { clsx } from 'clsx';
import { Menu } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import { useTheme } from '@/app/providers/theme-provider.tsx';
import { LogoutButton } from '@/components/buttons/logout-button.tsx';
import { ThemeSwitcher } from '@/components/theme-switcher/theme-switcher.tsx';
import { Button } from '@/components/ui/button.tsx';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import { NavigationList } from './navigation-list';

interface Props {
  className?: string;
}

export const NavigationMobile = ({ className }: Props) => {
  const [open, setOpen] = React.useState(false);
  const { theme } = useTheme();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Drawer direction={'left'} open={open} onOpenChange={() => setOpen(prev => !prev)}>
      <DrawerTrigger className={clsx('md:hidden', className)}>
        <Menu />
      </DrawerTrigger>

      <DrawerContent
        className={twMerge(
          'border-r',
          theme === 'dark' && 'border-sidebar-accent-foreground',
        )}
      >
        <DrawerHeader>
          <DrawerTitle hidden>Mobile Navigation</DrawerTitle>
          <DrawerDescription hidden>This is Aside Mobile Navigation</DrawerDescription>
          <ThemeSwitcher className={'mx-auto w-fit'} />
        </DrawerHeader>

        <NavigationList className={'w-full'} clickCallback={handleClose} />

        <DrawerFooter>
          <LogoutButton className={'mb-10 w-fit gap-4'}>Выйти</LogoutButton>

          <DrawerClose asChild>
            <Button variant="outline">Закрыть</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
