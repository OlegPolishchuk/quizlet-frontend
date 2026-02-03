import { useAuth } from '@clerk/clerk-react';
import { LogOutIcon, UserIcon } from 'lucide-react';

import { Avatar, AvatarImage } from '@/components/ui/avatar.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import { useGetMe } from '@/services/auth/hooks.tsx';

export const Header = () => {
  const { data } = useGetMe();
  const { signOut } = useAuth();

  const user = data?.data;

  return (
    <header className={'py-2 border-b'}>
      <div className={'container flex items-center justify-end'}>
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className={''}>
                <AvatarImage src={user.imageUrl} alt="@shadcn" />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={'w-full'}>
              <DropdownMenuGroup>
                <DropdownMenuLabel className={'flex items-center gap-3 border-b py-3'}>
                  <Avatar>
                    <AvatarImage src={user.imageUrl} alt="@shadcn" />
                  </Avatar>

                  <div>
                    <p className={'text-[14px] text-foreground'}>
                      {user.firstName ?? ''} {user.lastName ?? ''}
                    </p>

                    <p className={'text-muted-foreground text-[12px]'}>{user.email}</p>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuItem className={'h-[45px] border-b'}>
                  <div className={'w-[32px] flex justify-center'}>
                    <UserIcon />
                  </div>
                  <span className={'text-[12px]'}>Profile</span>
                </DropdownMenuItem>

                <DropdownMenuItem className={'h-[45px]'} onSelect={() => signOut()}>
                  <div className={'w-[32px] flex justify-center'}>
                    <LogOutIcon />
                  </div>
                  <span className={'text-[12px]'}>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Skeleton className={'rounded-full w-[32px] h-[32px]'} />
        )}
      </div>
    </header>
  );
};
