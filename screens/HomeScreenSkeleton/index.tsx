import { FC } from 'react';
import { HomeSkeletonContainer, HomeSkeletonHeader, HomeSkeletonList } from './styles';
import { Skeleton } from '../../components/Skeleton';
import { Container } from '../../components/Container';
import { useTheme } from '../../hooks/useTheme';
import { FlatList, View } from 'react-native';

export const HomeScreenSkeleton: FC = () => {
  const { theme: { colors } } = useTheme();
  return (
    <HomeSkeletonContainer color={colors.bgColor}>
      <Container>
        <HomeSkeletonHeader>
          <Skeleton style={{ width: 100, height: 30, borderRadius: 15, marginTop: 20 }} />
          <Skeleton style={{ width: 100, height: 30, borderRadius: 15, marginTop: 20 }} />
        </HomeSkeletonHeader>
        <Skeleton style={{ height: 207, borderRadius: 15, marginTop: 20 }} />

        <HomeSkeletonList>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={[0, 1, 2, 3, 4, 5, 6]}
            horizontal
            renderItem={({ item }) => <Skeleton style={{ width: 45, height: 60, marginHorizontal: 5, borderRadius: 10 }} />}
            keyExtractor={(item) => String(item)}
          />
          <FlatList
            showsVerticalScrollIndicator={false}
            data={[0, 1, 2, 3]}
            renderItem={({ item }) => <Skeleton style={{ height: 60, borderRadius: 15, marginVertical: 5 }} />}
            keyExtractor={(item) => String(item)}
          />
        </HomeSkeletonList>
      </Container>
    </HomeSkeletonContainer>
  );
};