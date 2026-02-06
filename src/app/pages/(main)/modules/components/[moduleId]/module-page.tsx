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

export const ModulePage = () => {
  const { moduleId } = useParams();

  console.log('ModulePage', moduleId);
  return (
    <div>
      <Breadcrumb className={'mb-10'}>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={ROUTES.modules}>Модули</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>ModulePage</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      FolderId = {moduleId}
    </div>
  );
};
