import { Controller, useFormContext } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import { CardsList } from '@/app/pages/(main)/modules/components/card-list/card-list.tsx';
import { type CreateStudySetInput } from '@/app/pages/(main)/modules/components/module-form/create-module-schema.ts';
import { Asterisk } from '@/components/ui/asterisk.tsx';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Select, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { SelectTrigger } from '@/components/ui/select.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { transformToOptions } from '@/lib/utils.ts';
import { VISIBILITY } from '@/services/folders/types.ts';

interface Props {
  className?: string;
  submitCallback: (data: CreateStudySetInput) => void;
  disabled?: boolean;
  formId: string;
}

export const ModuleForm = ({ className, formId, submitCallback, disabled }: Props) => {
  const form = useFormContext<CreateStudySetInput>();

  return (
    <form
      id={formId}
      className={twMerge('flex flex-col gap-6', className)}
      onSubmit={form.handleSubmit(submitCallback)}
    >
      <FieldGroup>
        <Controller
          name="title"
          control={form.control}
          disabled={disabled}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="module-title">
                Название папки <Asterisk />
              </FieldLabel>
              <Input
                {...field}
                id="module-title"
                aria-invalid={fieldState.invalid}
                placeholder="Новая папка"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="description"
          control={form.control}
          disabled={disabled}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="module-description">Описание</FieldLabel>
              <Input
                {...field}
                id="module-description"
                aria-invalid={fieldState.invalid}
                placeholder="Новая папка"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          key={form.watch('visibility')}
          name="visibility"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              orientation="vertical"
              data-invalid={fieldState.invalid}
              className={'w-full md:w-[50%] md:max-w-[350px]'}
            >
              <FieldLabel htmlFor={'folder-visibiliti'}>
                Видимость <Asterisk />
              </FieldLabel>

              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  id="folder-visibiliti"
                  aria-invalid={fieldState.invalid}
                  className="min-w-[120px]"
                >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>

                <SelectContent>
                  {transformToOptions(VISIBILITY).map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <p className="text-sm text-muted-foreground">
                Private — только вам. Public — видно всем участникам.
              </p>
            </Field>
          )}
        />
      </FieldGroup>

      <Separator />

      {/* --- Секция карточек (новый компонент) --- */}
      <CardsList disabled={disabled} />
    </form>
  );
};
