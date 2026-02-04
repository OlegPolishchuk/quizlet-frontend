import type { MouseEvent } from 'react';
import { toast } from 'sonner';

import { DeleteButton } from '@/components/buttons/delete-button.tsx';
import { Button } from '@/components/ui/button.tsx';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';
import { Field } from '@/components/ui/field.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { extractAxiosError } from '@/lib/utils.ts';
import { useDeleteFolder } from '@/services/folders/hooks.tsx';
import type { Folder } from '@/services/folders/types.ts';

interface Props {
  folder: Folder;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DeleteFolderModal = ({ folder, open, onOpenChange }: Props) => {
  const deleteNoteMutation = useDeleteFolder();
  const disabled = deleteNoteMutation.isPending;

  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();

    deleteNoteMutation.mutate(folder.id, {
      onSuccess: () => {
        onOpenChange(false);
      },
      onError: err => {
        onOpenChange(false);
        const { message } = extractAxiosError(err);
        toast.success(message);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className={'max-h-[90%]'}>
        <DialogHeader>
          <DialogTitle>Удалить папку</DialogTitle>
          <DialogDescription>Вы действительно хотите удалить папку?</DialogDescription>
        </DialogHeader>

        <Separator className={'h-[1px] bg-border'} />

        <DialogFooter>
          <Field orientation="horizontal" className={'min-h-[38px] justify-end'}>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={disabled}>
                Отменить
              </Button>
            </DialogClose>

            <DeleteButton disabled={disabled} onClick={handleSubmit}>
              Удалить
            </DeleteButton>
          </Field>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
