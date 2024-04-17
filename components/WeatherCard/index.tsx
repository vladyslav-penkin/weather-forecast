import { FC, memo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { WeatherContainer, WeatherImageContainer, WeatherInfoContainer, WeatherInfo, TemperatureContainer } from './styles';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { BasicCard } from '../../components/BasicCard';
import { SecondaryText } from '../../components/SecondaryText';
import { PrimaryText } from '../../components/PrimaryText';
import { WeatherDetails } from './WeatherDetails';
import { useSettings } from '../../hooks/useSettings';
import { useAnimatedDetails } from '../../hooks/useAnimatedDetails';
import { Forecast } from '../../types/Forecast';
import { calculateDaylightHours, calculateIsDay, calculateSunriseAndSunsetDate, findIcon, formatSunriseAndSunsetTime, getFormattedDescription, getIconComponent } from '../../units/helpers';

type Props = {
  weatherData: Forecast;
}

export const WeatherCard: FC<Props> = memo(({ weatherData }) => {
  const { t } = useTranslation();
  const { settings: { details, degree }, setSettings } = useSettings();
  const currentWeather = weatherData?.list[0];

  const currentDate = new Date(currentWeather?.dt_txt);
  const currentDateTime = format(currentDate, 'eee, MMM dd, yyyy');
  const { sunriseDate, sunsetDate } = calculateSunriseAndSunsetDate(weatherData.city.sunrise, weatherData.city.sunset, weatherData.city.timezone);
  const { daylightHours, daylightMinutes } = calculateDaylightHours(sunriseDate, sunsetDate); 
  const { isDay, sunriseTime, sunsetTime, currentTime } = calculateIsDay(sunriseDate, sunsetDate, currentDate);
  const { sunrise, sunset } = formatSunriseAndSunsetTime(sunriseDate, sunsetDate);

  const wind = Math.round(currentWeather?.wind.speed);
  const feelsLike = Math.round(currentWeather?.main.feels_like);
  const currentTemperature = Math.round(currentWeather?.main.temp);
  const temperatures = weatherData?.list.map((temperature) => temperature.main.temp);
  const maxTemperature = Math.round(Math.max(...temperatures)) ?? 0;
  const minTemperature = Math.round(Math.min(...temperatures)) ?? 0;
  const visibility = Math.round(currentWeather?.visibility / 100);
  const iconName = findIcon(isDay, currentWeather?.weather[0].id);
  const description = getFormattedDescription(currentWeather.weather[0].description);

  const position = ((((currentTime - sunriseTime) / (sunsetTime - sunriseTime)) * 360) / 2);
  const sunPosition = position < 0 ? 0 : position;
  const WeatherImage = getIconComponent(iconName);

  const daylightDetails = [
    { type: t('sunrise'), description: sunrise },
    { type: t('daylight'), description: `${daylightHours} ${t('hour')} ${daylightMinutes} ${t('minute')}` },
    { type: t('sunset'), description: sunset },
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
            <SecondaryText title={`${currentDateTime}`} size={12} />

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