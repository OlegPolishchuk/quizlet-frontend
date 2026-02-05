import { FormProvider, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { twMerge } from 'tailwind-merge';

import {
  type CreateStudySetInput,
  CreateStudySetSchema,
} from '@/app/pages/(main)/modules/components/module-form/create-module-schema.ts';
import { ModuleForm } from '@/app/pages/(main)/modules/components/module-form/module-form.tsx';
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
import { Typography } from '@/components/ui/typography.tsx';
import { ROUTES } from '@/constants/constants.ts';
import { useCreateModule } from '@/services/module/hooks.tsx';

export const CreateModulePage = () => {
  const navigate = useNavigate();
  const createModuleMutation = useCreateModule();

  const form = useForm<CreateStudySetInput>({
    resolver: zodResolver(CreateStudySetSchema),
    defaultValues: {
      title: '',
      description: '',
      visibility: 'PRIVATE',
      definitionLang: 'en',
      termLang: 'en',
      cards: [
        { term: '', definition: '' },
        { term: '', definition: '' },
      ],
    },
  });

  const handleSubmit = (data: CreateStudySetInput) => {
    createModuleMutation.mutate(data, {
      onSuccess: () => {
        navigate(ROUTES.modules);
      },
    });
  };

  const isLoading = createModuleMutation.isPending;
  const disabled = isLoading || !form.formState.isDirty;

  return (
    <>
      <Breadcrumb className={'mb-10'}>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={ROUTES.modules}>Модули</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Новый модуль</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <FormProvider {...form}>
        <Card className={twMerge('mx-auto w-full')}>
          <CardHeader className={'text-center'}>
            <CardTitle>Новый модуль</CardTitle>
            <CardDescription>
              Создайте модуль с карточками для изучения и запоминания материала.
            </CardDescription>
          </CardHeader>

          <CardContent className={'mb-6'}>
            <ModuleForm submitCallback={handleSubmit} formId={'create_module_form'} />

            <div className={'mt-5 text-destructive'}>
              {form.formState.errors.cards?.root && (
                <Typography variant={'small'}>
                  {form.formState.errors?.cards.root.message}
                </Typography>
              )}
            </div>
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
                form="create_module_form"
                disabled={disabled}
                loading={isLoading}
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
