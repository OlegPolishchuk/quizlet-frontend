import { NavLink } from 'react-router';
import { File, FolderOpenDot } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface Props {
  className?: string;
  listClassName?: string;
  clickCallback?: () => void;
}

export const NavigationList = ({ listClassName, className, clickCallback }: Props) => {
  const linkClassName =
    'text-sm w-full px-4 md:px-0 py-4 flex items-center gap-4 hover:text-primary transition-all border-b! ';
  const activeClassName = twMerge(linkClassName, 'text-primary border-primary');

  const handleCLick = () => {
    if (clickCallback) {
      clickCallback();
    }
  };

  return (
    <nav className={className}>
      <ul className={listClassName}>
        <li>
          <NavLink
            to="/modules"
            className={({ isActive }) => (isActive ? activeClassName : linkClassName)}
            onClick={handleCLick}
          >
            <File />
            Модули
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/folders"
            className={({ isActive }) => (isActive ? activeClassName : linkClassName)}
            onClick={handleCLick}
          >
            <FolderOpenDot />
            Папки
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
