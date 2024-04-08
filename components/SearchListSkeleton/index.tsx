import { FC } from 'react';
import { SearchListSkeletons } from './styles';
import { Skeleton } from '../../components/Skeleton';

export const SearchListSkeleton: FC = () => {
  return (
    <SearchListSkeletons>
      <Skeleton style={{ height: 40, borderRadius: 10 }} />
      <Skeleton style={{ height: 40, borderRadius: 10 }} />
      <Skeleton style={{ height: 40, borderRadius: 10 }} />
      <Skeleton style={{ height: 40, borderRadius: 10 }} />
    </SearchListSkeletons>
  );
};