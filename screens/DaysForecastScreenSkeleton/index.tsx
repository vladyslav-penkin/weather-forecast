import { FC } from 'react';
import { DaysForecastSkeletonContainer, DaysForecastSkeletonList } from './styles';
import { FlatList } from 'react-native';
import { Skeleton } from '../../components/Skeleton';
import { Container } from '../../components/Container';
import { useTheme } from '../../hooks/useTheme';

export const DaysForecastScreenSkeleton: FC = () => {
  const { theme: { colors } } = useTheme();
  return (
    <DaysForecastSkeletonContainer color={colors.bgColor}>
      <Container>
        <DaysForecastSkeletonList>
          <FlatList
            style={{ minHeight: 56 }}
            showsHorizontalScrollIndicator={false}
            data={[0, 1, 2, 3, 4, 5, 6]}
            horizontal
            renderItem={({ item }) => <Skeleton style={{ width: 45, height: 56, marginHorizontal: 5, borderRadius: 10 }} />}
            keyExtractor={(item) => String(item)}
          />
          
          <FlatList
            style={{ marginTop: 10 }}
            showsVerticalScrollIndicator={false}
            data={[0, 1, 2, 3]}
            renderItem={({ item }) => <Skeleton style={{ height: 200, borderRadius: 15, marginVertical: 5 }} />}
            keyExtractor={(item) => String(item)}
          />
        </DaysForecastSkeletonList>
      </Container>
    </DaysForecastSkeletonContainer>
  );
};