import { FC, memo } from 'react';
import { FlatList } from 'react-native';
import { WeatherTodayItemContainer, WeatherImageContainer, StyledView, WeatherTodayTemperatureContainer, TodayTemperatureContainer, WeatherTodayInfoContainer } from './styles';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { SecondaryText } from '../../components/SecondaryText';
import { PrimaryText } from '../../components/PrimaryText';
import { WeatherTodayInfo } from '../../components/WeatherTodayItem/WeatherTodayInfo';
import { useTheme } from '../../hooks/useTheme';
import { ForecastListItem } from '../../types/ForecastListItem';
import { FontAwesomeIcons, IoniconsIcons } from '../../types/Icons';
import { getFormattedDescription, getWeatherIcon } from '../../units/helpers';
import { View } from 'react-native';

type Props = {
  weatherInfo: ForecastListItem;
  dayType: string;
  isDay: boolean;
}

export const WeatherTodayItem: FC<Props> = memo(({ weatherInfo, dayType, isDay }) => {
  const { theme: { colors } } = useTheme();
  const { t } = useTranslation();
  const description = getFormattedDescription(weatherInfo.weather[0].description);

  const temperature = Math.round(weatherInfo.main.temp);
  const feelsLike = Math.round(weatherInfo.main.feels_like);
  const temperatureIcon = feelsLike > 15 ? FontAwesomeIcons.TEMPHIGH : FontAwesomeIcons.TEMPLOW;
  const detailedForecastInfo = [
    { title: `${Math.round(weatherInfo.wind.speed)} ${t('m/s')}`, icon: IoniconsIcons.SPEED, size: 14, color: colors.humidityColor },
    { title: `${Math.round(weatherInfo.main.pressure)} ${t('mmHg')}`, icon: IoniconsIcons.TIME, size: 14, color: colors.humidityColor },
    { title: `${Math.round(weatherInfo.main.humidity)}%`, icon: IoniconsIcons.HUMIDITY, size: 14, color: colors.humidityColor }
  ];
  const WeatherImage = getWeatherIcon(isDay, weatherInfo.weather[0].id);

  return (
    <WeatherTodayItemContainer color={colors.borderColor}>
      <SecondaryText title={t(dayType)} size={14} />

      <WeatherTodayTemperatureContainer>
        <StyledView>
          <TodayTemperatureContainer>
            <PrimaryText title={`${temperature}°`} size={24} />
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <FontAwesome5 name={temperatureIcon} size={16} color={colors.humidityColor} />
              <PrimaryText title={`${feelsLike}°`} size={16} />
            </View>
          </TodayTemperatureContainer>
          <PrimaryText title={description} size={16} />
        </StyledView>

        <WeatherImageContainer>
          <WeatherImage style={{ width: '100%', height: '100%' }} />
        </WeatherImageContainer>
      </WeatherTodayTemperatureContainer>

      <WeatherTodayInfoContainer>
        <FlatList
          scrollEnabled={false}
          horizontal
          data={detailedForecastInfo}
          renderItem={({ item: { title, icon, size, color } }) => (
            <WeatherTodayInfo title={title} icon={icon} size={size} color={color} key={title} />
          )}
          keyExtractor={(item) => item.icon}
        />
      </WeatherTodayInfoContainer>
    </WeatherTodayItemContainer>
  );
});