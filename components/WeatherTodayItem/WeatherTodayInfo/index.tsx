import { FC, memo } from 'react';
import { WeatherTodayInfoContainer } from './styles';
import { Ionicons } from '@expo/vector-icons';
import { SecondaryText } from '../../SecondaryText';
import { IoniconsIcons } from '../../../types/Icons';

type Props = {
  title: string;
  size: number;
  color: string;
  icon: IoniconsIcons;
};

export const WeatherTodayInfo: FC<Props> = memo(({ title, size, color, icon }) => (
  <WeatherTodayInfoContainer>
    <Ionicons name={icon} size={+size} color={color} />
    <SecondaryText title={title} size={size} />
  </WeatherTodayInfoContainer>
));