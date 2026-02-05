import { Skeleton } from '@/components/ui/skeleton.tsx';

export const FoldersPageSkeleton = () => {
  return (
    <div className={'flex flex-col gap-4'}>
      <Skeleton className={'h-[62px]'} />
      <Skeleton className={'h-[62px]'} />
      <Skeleton className={'h-[62px]'} />
    </div>
  );
};
