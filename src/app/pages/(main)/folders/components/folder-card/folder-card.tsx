import { useState } from 'react';
import { useNavigate } from 'react-router';
import { FolderIcon, MoreVertical } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import { DeleteButton } from '@/components/buttons/delete-button.tsx';
import { EditButton } from '@/components/buttons/edit-button.tsx';
import { Button } from '@/components/ui/button.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item.tsx';
import type { Folder } from '@/services/folders/types.ts';

import { DeleteFolderModal } from '../delete-folder-modal/delete-folder-modal.tsx';

interface Props {
  folder: Folder;
  className?: string;
}

export const FolderCard = ({ folder, className }: Props) => {
  const navigate = useNavigate();

  const [openDropdown, setOpenDropdown] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleEditLinkClick = () => {
    navigate('/');
  };

  return (
    <>
      <Item variant="outline" className={className}>
        <ItemMedia variant="icon">
          <FolderIcon />
        </ItemMedia>

        <ItemContent>
          <ItemTitle>{folder.title}</ItemTitle>
        </ItemContent>

        <ItemActions>
          <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
            <DropdownMenuTrigger asChild className={'data-[state=open]:text-destructive'}>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className={'w-full'}>
              <DropdownMenuItem onClick={handleEditLinkClick}>
                <EditButton className={twMerge('w-full justify-between')}>
                  Редактировать
                </EditButton>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setOpenDeleteModal(true)}>
                <DeleteButton className={'w-full justify-between'}>Удалить</DeleteButton>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ItemActions>
      </Item>

      <DeleteFolderModal
        folder={folder}
        open={openDeleteModal}
        onOpenChange={setOpenDeleteModal}
      />
    </>
  );
};
