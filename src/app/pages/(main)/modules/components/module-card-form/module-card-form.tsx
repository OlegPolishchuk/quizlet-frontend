import { useState } from 'react';
import { type Control, Controller } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { Mic, Trash2 } from 'lucide-react';

import type { CreateStudySetInput } from '@/app/pages/(main)/modules/components/module-form/create-module-schema';
import { Button } from '@/components/ui/button';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useDebounceCallback } from '@/lib/hooks/use-debounce-callback.tsx';
import { speakWord } from '@/lib/utils.ts';
import { findTermQueryOptions } from '@/services/term/hooks.tsx';

interface CardItemProps {
  index: number;
  control: Control<CreateStudySetInput>;
  onRemove: () => void;
  disabled?: boolean;
}

export const CardItem = ({ index, control, onRemove, disabled }: CardItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSetSearch = useDebounceCallback((value: string) => {
    const trimmed = value.trim();
    setSearchTerm(trimmed);
    if (!trimmed) setIsOpen(false);
  }, 500);

  const handleChangeTerm = (
    event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
    fieldOnChange: (...event: unknown[]) => void,
  ) => {
    fieldOnChange(event);
    debouncedSetSearch(event.target.value);
    setIsOpen(true);
  };

  const termQuery = useQuery({
    ...findTermQueryOptions(searchTerm),
    enabled: searchTerm.length > 0,
  });
  const foundedTerm = termQuery.data?.data[0];
  const showPopover = isOpen && !!foundedTerm?.word;

  const currentWord = foundedTerm?.word;
  const pronounce: string = (
    foundedTerm?.phonetics[0].text ||
    foundedTerm?.phonetics[1]?.text ||
    '-'
  ).replaceAll('/', '');

  const handleTermFocus = () => {
    if (foundedTerm) {
      setIsOpen(true);
    }
  };

  console.log('***********************');
  console.log('showPopover =>', showPopover);
  console.log('isOpen =>', isOpen);
  console.log('currentWord =>', currentWord);

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg bg-card text-card-foreground shadow-sm relative group">
      <div className="flex justify-between items-center border-b pb-2 mb-2">
        <span className="text-sm font-medium text-muted-foreground">{index + 1}</span>
        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={onRemove}
          disabled={disabled}
          className="h-8 w-8 text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* TERM */}
        <Controller
          control={control}
          name={`cards.${index}.term`}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="w-full">
              <FieldLabel className="text-xs text-muted-foreground uppercase">
                Термин
              </FieldLabel>
              <Input
                {...field}
                onChange={e => handleChangeTerm(e, field.onChange)}
                onFocus={handleTermFocus}
                placeholder="Введите термин"
                className="font-medium"
                autoComplete="off"
              />

              {foundedTerm && (
                <div className={'flex items-center gap-1'}>
                  [{pronounce}]
                  {currentWord && (
                    <Button variant={'ghost'} onClick={() => speakWord(currentWord)}>
                      <Mic />
                    </Button>
                  )}
                </div>
              )}
            </Field>
          )}
        />

        {/* DEFINITION */}
        <Controller
          control={control}
          name={`cards.${index}.definition`}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="w-full">
              <FieldLabel className="text-xs text-muted-foreground uppercase">
                Определение
              </FieldLabel>
              <Input
                {...field}
                placeholder="Введите определение"
                className="font-medium"
              />
              <div className="h-4">
                {fieldState.invalid && (
                  <span className="text-xs text-destructive">
                    {fieldState.error?.message}
                  </span>
                )}
              </div>
            </Field>
          )}
        />
      </div>
    </div>
  );
};
