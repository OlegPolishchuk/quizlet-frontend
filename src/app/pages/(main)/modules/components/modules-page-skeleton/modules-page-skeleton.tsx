import { Skeleton } from '@/components/ui/skeleton.tsx';

export const ModulesPageSkeleton = () => {
  return (
    <div className={'flex flex-col gap-4'}>
      <Skeleton className={'h-[82px]'} />
      <Skeleton className={'h-[82px]'} />
      <Skeleton className={'h-[82px]'} />
    </div>
  );
};
