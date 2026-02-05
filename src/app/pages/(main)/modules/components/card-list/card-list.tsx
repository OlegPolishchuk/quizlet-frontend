import { useFieldArray, useFormContext } from 'react-hook-form';
import { Plus, PlusIcon } from 'lucide-react';

import { CardItem } from '@/app/pages/(main)/modules/components/module-card-form/module-card-form.tsx';
import type { CreateStudySetInput } from '@/app/pages/(main)/modules/components/module-form/create-module-schema.ts';
import { Button } from '@/components/ui/button';

export const CardsList = ({ disabled }: { disabled?: boolean }) => {
  const { control } = useFormContext<CreateStudySetInput>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'cards',
  });

  const handleAddCard = () => {
    append({ term: '', definition: '' });
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Карточки</h3>

        <Button onClick={handleAddCard} className={'rounded-full w-[40px] h-[40px]'}>
          <PlusIcon />
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {fields.map((field, index) => (
          <CardItem
            key={field.id} // Важно! field.id генерируется RHF
            index={index}
            control={control}
            onRemove={() => remove(index)}
            disabled={disabled}
          />
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full py-8 border-dashed border-2 hover:border-primary hover:bg-accent/50 transition-colors"
        onClick={handleAddCard}
        disabled={disabled}
      >
        <Plus className="mr-2 h-5 w-5" />
        Добавить карточку
      </Button>
    </div>
  );
};
