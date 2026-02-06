import { NavLink } from 'react-router';
import { File, FolderOpenDot } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export const Navigation = () => {
  const linkClassName =
    'text-sm w-full px-1 py-1 flex items-center gap-2 hover:text-primary transition-all border-b-[2px] border-transparent';
  const activeClassName = twMerge(linkClassName, 'text-primary border-primary');

  return (
    <nav className={'container flex justify-center mb-10!'}>
      <ul className={'flex items-center gap-10'}>
        <li>
          <NavLink
            to="/modules"
            className={({ isActive }) => (isActive ? activeClassName : linkClassName)}
          >
            <File className={'w-[16px]'} />
            Модули
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/folders"
            className={({ isActive }) => (isActive ? activeClassName : linkClassName)}
          >
            <FolderOpenDot className={'w-[16px]'} />
            Папки
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
