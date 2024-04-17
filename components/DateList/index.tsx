import { FC, memo } from 'react';
import { FlatList, View } from 'react-native';
import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { DateListAnimatedBox, DateListContainer } from './styles';
import { DayInfoButton } from '../../components/DayInfoButton';
import { useTheme } from '../../hooks/useTheme';
import { DateList as DateListType } from '../../types/DateList';

type Props = {
  dateList: DateListType[];
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  currentIndex: number;
};

export const DateList: FC<Props> = memo(({ dateList, selectedDate, setSelectedDate, currentIndex }) => {
  const { theme: { colors } } = useTheme();

  const dateCardWidth = 45;
  const dateCardGap = 10;
  const positionLeft = useSharedValue((currentIndex * (dateCardWidth + dateCardGap)) || 0);
  const animatedStyle = useAnimatedStyle(() => ({
    left: withSpring(positionLeft.value, {
      duration: 1000,
      dampingRatio: 1,
      stiffness: 100,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    }),
  }), [positionLeft.value]);

  const handlePress = (date: string, index: number, value: number, gap: number) => {
    setSelectedDate(date);
    positionLeft.value = index * (value + gap);
  };

  const dateListItem = ({ item: { date, dayOfWeek }, index }: { item: DateListType, index: number }) => {
    const isSelected = date === selectedDate;

    return (
      <DayInfoButton 
        width={dateCardWidth} 
        gap={dateCardGap}
        day={`${new Date(date).getDate()}`}
        dayOfWeek={dayOfWeek.slice(0, 2)}
        isSelected={isSelected}
        onPress={() => handlePress(date, index, dateCardWidth, dateCardGap)}
      />
    );
  };
  
  return (
    <DateListContainer>
      <View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={dateList}
          extraData={selectedDate}
          renderItem={dateListItem}
          keyExtractor={(item) => item.date}
        />
        <DateListAnimatedBox style={animatedStyle} color={colors.activeColor} />
      </View>
    </DateListContainer>
  );
});