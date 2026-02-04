import { FormProvider, useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { twMerge } from 'tailwind-merge';

import {
  createFolderBodySchema,
  type CreateFolderSchema,
} from '@/app/pages/(main)/folders/components/folder-form/create-folder-schema.ts';
import { FolderForm } from '@/app/pages/(main)/folders/components/folder-form/folder-form.tsx';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb.tsx';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field } from '@/components/ui/field.tsx';
import { ROUTES } from '@/constants/constants.ts';
import { useGetFolderById, useUpdateFolder } from '@/services/folders/hooks.tsx';

export const UpdateFolderPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const folderId = params.folderId as string;

  const folderRequest = useGetFolderById(folderId);
  const updateFolderMutation = useUpdateFolder();
  const folder = folderRequest.data?.data;

  const form = useForm<CreateFolderSchema>({
    resolver: zodResolver(createFolderBodySchema),
    defaultValues: {
      title: '',
      description: '',
      visibility: 'PRIVATE',
    },
    values: folder
      ? {
          title: folder.title,
          description: folder.description,
          visibility: folder.visibility,
        }
      : undefined,
  });

  if (!folder) return null;

  const handleSubmit = (data: CreateFolderSchema) => {
    updateFolderMutation.mutate(
      { ...data, folderId },
      {
        onSuccess: () => {
          navigate(ROUTES.folders);
        },
      },
    );
  };

  const isLoading = updateFolderMutation.isPending;
  const disabled = isLoading || !form.formState.isDirty;

  return (
    <>
      <Breadcrumb className={'mb-10'}>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={ROUTES.folders}>Папки</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{folder.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <FormProvider {...form}>
        <Card className={twMerge('mx-auto w-full')}>
          <CardHeader className={'text-center'}>
            <CardTitle>Редактирование папки</CardTitle>
            <CardDescription>
              Измените название, описание или настройки видимости для «{folder.title}»
            </CardDescription>
          </CardHeader>

          <CardContent className={'mb-6'}>
            <FolderForm submitCallback={handleSubmit} formId={'update-folder-form'} />
          </CardContent>

          <CardFooter>
            <Field orientation="horizontal" className={'justify-end'}>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                disabled={isLoading}
              >
                Отмена
              </Button>
              <Button
                type="submit"
                form="update-folder-form"
                disabled={disabled}
                loading={isLoading}
              >
                Сохранить изменения
              </Button>
            </Field>
          </CardFooter>
        </Card>
      </FormProvider>
    </>
  );
};
