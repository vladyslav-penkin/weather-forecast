import { FC, memo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { WeatherContainer, WeatherImageContainer, WeatherInfoContainer, WeatherInfo, TemperatureContainer } from './styles';
import { useTranslation } from 'react-i18next';
import { BasicCard } from '../../components/BasicCard';
import { SecondaryText } from '../../components/SecondaryText';
import { PrimaryText } from '../../components/PrimaryText';
import { WeatherDetails } from './WeatherDetails';
import { useSettings } from '../../hooks/useSettings';
import { useAnimatedDetails } from '../../hooks/useAnimatedDetails';
import { Forecast } from '../../types/Forecast';
import { findIcon, getCurrentTime, getFormattedDescription, getIconComponent } from '../../units/helpers';

type Props = {
  weatherData: Forecast;
}

export const WeatherCard: FC<Props> = memo(({ weatherData }) => {
  const { t } = useTranslation();
  const { settings: { details, degree }, setSettings } = useSettings();
  const currentWeather = weatherData?.list[0];

  const currentTime = new Date(currentWeather?.dt_txt);
  const currentDate = String(currentTime).split(' ').slice(0, 4).join(' ');
  const sunriseDate = new Date((weatherData.city.sunrise + weatherData.city.timezone) * 1000);
  const sunsetDate = new Date((weatherData.city.sunset + weatherData.city.timezone) * 1000);

  const sunriseTime = sunriseDate.getHours() + sunriseDate.getMinutes() / 60;
  const sunsetTime = sunsetDate.getHours() + sunsetDate.getMinutes() / 60
  const currentHour = currentTime.getHours() + currentTime.getMinutes() / 60;
  const daylightHours = Math.floor(sunsetTime - sunriseTime);
  const daylightMinutes = Math.round((sunsetTime - sunriseTime - daylightHours) * 60);
  const isDay = currentHour >= sunriseTime && currentHour <= sunsetTime;

  const wind = Math.round(currentWeather?.wind.speed);
  const feelsLike = Math.round(currentWeather?.main.feels_like);
  const currentTemperature = Math.round(currentWeather?.main.temp);
  const temperatures = weatherData?.list.map((temperature) => temperature.main.temp);
  const maxTemperature = Math.round(Math.max(...temperatures)) ?? 0;
  const minTemperature = Math.round(Math.min(...temperatures)) ?? 0;
  const visibility = Math.round(currentWeather?.visibility / 100);
  const iconName = findIcon(isDay, currentWeather?.weather[0].id);
  const description = getFormattedDescription(currentWeather.weather[0].description);

  const position = ((((currentHour - sunriseTime) / (sunsetTime - sunriseTime)) * 360) / 2);
  const sunPosition = position < 0 ? 0 : position;
  const WeatherImage = getIconComponent(iconName);

  const daylightDetails = [
    { type: t('sunrise'), description: getCurrentTime(`${sunriseDate}`) },
    { type: t('daylight'), description: `${daylightHours} ${t('hour')} ${daylightMinutes} ${t('minute')}` },
    { type: t('sunset'), description: getCurrentTime(`${sunsetDate}`) },
  ];

  const temperatureDetails = [
    { type: t('visibility'), description: `${visibility}%` },
    { type: t('minMaxTemp'), description: `${minTemperature} ${maxTemperature}` },
    { type: t('sea'), description: `${currentWeather?.main.sea_level}` },
  ];

  const forecastDetails = [
    { type: t('humidity'), description: `${currentWeather?.main.humidity}%` },
    { type: t('pressure'), description: `${currentWeather?.main.pressure} ${t('mmHg')}` },
    { type: t('wind'), description: `${wind} ${t('m/s')}` },
  ];
  const animatedStyle = useAnimatedDetails(details);

  return (
    <BasicCard>
      <TouchableOpacity onPress={() => setSettings(prev => ({ ...prev, details: !details }))}>
        <WeatherContainer>
          <WeatherInfoContainer>
            <SecondaryText title={`${currentDate}`} size={12} />

            <WeatherInfo>
              <TemperatureContainer>
                <PrimaryText title={`${currentTemperature}`} size={60} />
                <PrimaryText title={degree ? '°F' : '°C'} size={24} />
              </TemperatureContainer>
              <View>
                <PrimaryText title={description} />
                <PrimaryText title={`${t('feelsTemp')} ${feelsLike}°`} />
              </View>
            </WeatherInfo>
          </WeatherInfoContainer>

          <WeatherImageContainer>
            <WeatherImage style={{ minWidth: '100%', minHeight: '100%' }} />
          </WeatherImageContainer>
        </WeatherContainer>

        <WeatherDetails
          isNight={!isDay}
          sunPosition={sunPosition}
          daylightDetails={daylightDetails}
          temperatureDetails={temperatureDetails}
          forecastDetails={forecastDetails}
          animatedStyle={animatedStyle}
        />
      </TouchableOpacity>
    </BasicCard>
  );
});