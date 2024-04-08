import { FC, memo } from 'react';
import { DayInfoButtonContainer, DayInfoText } from './styles';
import { useTheme } from '../../hooks/useTheme';

type Props = {
  width: number;
  gap: number;
  day: string;
  dayOfWeek: string;
  isSelected: boolean;
  onPress: () => void;
};

export const DayInfoButton: FC<Props> = memo(({ width, gap, day, dayOfWeek, isSelected, onPress }) => {
  const { theme: { colors } } = useTheme();
  const color = isSelected ? colors.bgColor : colors.primaryColor;
  return (
    <DayInfoButtonContainer
      width={width}
      gap={gap}
      onPress={onPress}
    >
      <DayInfoText color={color}>{dayOfWeek}</DayInfoText>
      <DayInfoText color={color} size="16">{day}</DayInfoText>
    </DayInfoButtonContainer>
  );
});