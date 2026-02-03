import { Link } from 'react-router';
import { FolderCode, PlusIcon } from 'lucide-react';

import { FolderCard } from '@/app/pages/(main)/folders/components/folder-card/folder-card.tsx';
import { CreateButton } from '@/components/buttons/create-button.tsx';
import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty.tsx';
import { Typography } from '@/components/ui/typography.tsx';
import { ROUTES } from '@/constants/constants.ts';
import { useGetPrivateFolders } from '@/services/folders/hooks.tsx';

export const FoldersPage = () => {
  const foldersRequest = useGetPrivateFolders();
  const folders = foldersRequest.data?.data.items ?? [];

  return (
    <div className={'flex flex-col gap-6'}>
      <div className={'flex items-center justify-between'}>
        <Typography tag={'h1'} variant={'p'}>
          Папки:
        </Typography>

        <Link to={ROUTES.createFolder} className={'ml-auto'}>
          <CreateButton>Создать папку</CreateButton>
        </Link>
      </div>

      {!folders.length && (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FolderCode />
            </EmptyMedia>
            <EmptyTitle>Папок пока нет</EmptyTitle>
            <EmptyDescription>
              Создайте папку, чтобы группировать проекты и быстрее находить нужное.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div className="flex gap-2">
              <Link to={ROUTES.createFolder}>
                <Button variant={'link'}>
                  <PlusIcon />
                  Создать папку
                </Button>
              </Link>
            </div>
          </EmptyContent>
        </Empty>
      )}

      <div className={'flex flex-col gap-4'}>
        {folders.map(folder => (
          <Link key={folder.id} to={`${ROUTES.folders}/${folder.id}`}>
            <FolderCard folder={folder} />
          </Link>
        ))}
      </div>
    </div>
  );
};
