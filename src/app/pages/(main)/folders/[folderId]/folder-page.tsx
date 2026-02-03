import { Link, useParams } from 'react-router';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb.tsx';
import { ROUTES } from '@/constants/constants.ts';

export const FolderPage = () => {
  const { folderId } = useParams();

  console.log('folderId', folderId);
  return (
    <div>
      <Breadcrumb className={'mb-10'}>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={ROUTES.folders}>Папки</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Новая папка</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      FolderId = {folderId}
    </div>
  );
};
