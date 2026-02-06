import type { MouseEvent } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { File, MoreVertical } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import { DeleteModuleModal } from '@/app/pages/(main)/modules/components/delete-module-modal/delete-module-modal.tsx';
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
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item.tsx';
import { Typography } from '@/components/ui/typography.tsx';
import { ROUTES } from '@/constants/constants.ts';
import { formatDate } from '@/lib/utils.ts';
import type { ModuleListItem } from '@/services/module/types.ts';

interface Props {
  module: ModuleListItem;
  className?: string;
}

export const ModuleCard = ({ module, className }: Props) => {
  const navigate = useNavigate();

  const [openDropdown, setOpenDropdown] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleEditLinkClick = () => {
    navigate(ROUTES.updateModule + '/' + module.id);
  };

  const handleShowDeleteModal = (e: MouseEvent) => {
    /**/
    e.stopPropagation();

    setOpenDeleteModal(true);
  };

  return (
    <>
      <Item variant="outline" className={className}>
        <div className={'flex flex-col gap-2 flex-1'}>
          <div className={'flex items-center gap-4'}>
            <Typography variant={'muted'}>{formatDate(module.createdAt)}</Typography>
            <Typography variant={'muted'}>
              Количество карточек: {module.cardsCount}
            </Typography>
          </div>

          <div className={'flex items-center gap-2'}>
            <ItemMedia variant="icon">
              <File />
            </ItemMedia>

            <ItemContent>
              <ItemTitle>{module.title}</ItemTitle>
              <ItemDescription>{module.description}</ItemDescription>
            </ItemContent>
          </div>
        </div>

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

              <DropdownMenuItem onClick={handleShowDeleteModal}>
                <DeleteButton className={'w-full justify-between'}>Удалить</DeleteButton>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ItemActions>
      </Item>

      <DeleteModuleModal
        module={module}
        open={openDeleteModal}
        onOpenChange={setOpenDeleteModal}
      />
    </>
  );
};
