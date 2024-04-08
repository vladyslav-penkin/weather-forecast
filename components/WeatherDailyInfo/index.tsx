import { FC, memo } from 'react';
import { View } from 'react-native';
import { WeatherDailyInfoContainer } from './styles';
import { PrimaryText } from '../../components/PrimaryText';
import { SecondaryText } from '../../components/SecondaryText';
import { getDailyIconComponent } from '../../units/helpers';

interface Props {
  title: string;
  description: string;
  icon: string;
}

export const WeatherDailyInfo: FC<Props> = memo(({ title, description, icon }) => {
  const Icon = getDailyIconComponent(icon);
  return (
    <WeatherDailyInfoContainer>
      <Icon style={{ width: 24, height: 24 }} />
        <View style={{ display: 'flex', gap: 2 }}>
          <SecondaryText title={title} size={12} />
          <PrimaryText title={description} size={16} />
        </View>
    </WeatherDailyInfoContainer>
  );
});