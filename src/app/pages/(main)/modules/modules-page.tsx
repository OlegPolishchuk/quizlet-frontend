import { Link } from 'react-router';
import { FolderCode, PlusIcon } from 'lucide-react';

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

export const ModulesPage = () => {
  const modules = [];

  return (
    <div className={'flex flex-col gap-6'}>
      <div className={'flex items-center justify-between'}>
        <Typography tag={'h1'} variant={'p'}>
          Модули:
        </Typography>

        <Link to={ROUTES.createModule} className={'ml-auto'}>
          <CreateButton>Создать модуль</CreateButton>
        </Link>
      </div>

      {!modules?.length && (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FolderCode />
            </EmptyMedia>
            <EmptyTitle>Модулей пока нет</EmptyTitle>
            <EmptyDescription>
              Создайте модуль с карточками для изучения новых тем и эффективного
              запоминания материала.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div className="flex gap-2">
              <Link to={ROUTES.createModule}>
                <Button variant={'link'}>
                  <PlusIcon />
                  Создать модуль
                </Button>
              </Link>
            </div>
          </EmptyContent>
        </Empty>
      )}
    </div>
  );
};
