import { useAuth } from '@clerk/clerk-react';
import { LogOut } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface Props {
  className?: string;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const LogoutButton = ({ children, className, onClick }: Props) => {
  const { signOut } = useAuth();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    signOut();

    if (onClick) onClick(e);
  };

  return (
    <button
      className={twMerge(
        'group flex cursor-pointer items-center justify-center gap-2 border-none outline-none',
        'disabled:cursor-not-allowed',
        'hover:text-destructive',
        'transition-all',
        className,
      )}
      onClick={handleClick}
    >
      <LogOut className={'transition-all group-hover:text-destructive'} />
      {children}
    </button>
  );
};
