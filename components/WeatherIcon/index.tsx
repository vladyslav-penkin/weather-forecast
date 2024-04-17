import { FC, memo } from 'react';
import { Card, CardBackground, Humidity } from './styles';
import { useTheme } from '../../hooks/useTheme';
import { findIcon, getIconComponent } from '../../units/helpers';

type Props = {
  humidity?: number;
  iconId: number;
  isDay: boolean;
}

export const WeatherIcon: FC<Props> = memo(({ iconId, isDay, humidity }) => {
  const { theme: { colors } } = useTheme();
  const iconName = findIcon(isDay, iconId);
  const IconComponent = getIconComponent(iconName);
  return (
    <Card>
      <CardBackground
        colors={colors.cardColors}
        locations={[0, 1]}
        start={{ x: 0.5, y: 0.5 }}
      />
      <IconComponent style={{ maxWidth: 48, maxHeight: 48 }} />
      {humidity !== undefined && <Humidity bgColor={colors.bgColor} color={colors.humidityColor}>{`${humidity ?? 0}%`}</Humidity>}
    </Card>
  );
});