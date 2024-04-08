import { FC } from 'react';
import { LocationSkeletonContainer, LocationSkeletonList } from './styles';
import { Skeleton } from '../../components/Skeleton';
import { Container } from '../../components/Container';
import { useTheme } from '../../hooks/useTheme';

export const LocationScreenSkeleton: FC = () => {
  const { theme: { colors } } = useTheme();

  return (
    <LocationSkeletonContainer color={colors.bgColor}>
      <Container>
        <Skeleton style={{ height: 48, borderRadius: 8, marginTop: 20 }} />

        <LocationSkeletonList>
          <Skeleton style={{ height: 104, borderRadius: 15 }} />
          <Skeleton style={{ height: 104, borderRadius: 15 }} />
          <Skeleton style={{ height: 104, borderRadius: 15 }} />
        </LocationSkeletonList>
      </Container>
    </LocationSkeletonContainer>
  );
};