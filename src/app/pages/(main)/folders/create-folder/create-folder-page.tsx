import { FormProvider, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { twMerge } from 'tailwind-merge';

import type { CreateFolderSchema } from '@/app/pages/(main)/folders/components/folder-form/create-folder-schema.ts';
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
import { useCreateFolder } from '@/services/folders/hooks.tsx';

export const CreateFolderPage = () => {
  const navigate = useNavigate();
  const createFolderMutation = useCreateFolder();

  const form = useForm<CreateFolderSchema>({
    defaultValues: {
      title: '',
      description: '',
      visibility: 'PRIVATE',
    },
  });

  const handleSubmit = (data: CreateFolderSchema) => {
    createFolderMutation.mutate(data, {
      onSuccess: () => {
        navigate(ROUTES.folders);
      },
    });
  };

  const disabled = createFolderMutation.isPending;

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
            <BreadcrumbPage>Новая папка</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <FormProvider {...form}>
        <Card className={twMerge('mx-auto w-full')}>
          <CardHeader className={'text-center'}>
            <CardTitle>Новая папка</CardTitle>
            <CardDescription>
              Создайте папку, чтобы группировать проекты и быстрее находить нужное.
            </CardDescription>
          </CardHeader>

          <CardContent className={'mb-6'}>
            <FolderForm submitCallback={handleSubmit} formId={'profile_form_password'} />
          </CardContent>

          <CardFooter>
            <Field orientation="horizontal" className={'justify-end'}>
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                disabled={disabled}
              >
                Сбросить
              </Button>
              <Button
                type="submit"
                form="profile_form_password"
                disabled={disabled}
                loading={disabled}
              >
                Создать
              </Button>
            </Field>
          </CardFooter>
        </Card>
      </FormProvider>
    </>
  );
};
