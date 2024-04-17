import { FC, memo } from 'react';
import { View } from 'react-native';
import { ForecastContainer, HourlyForecastInfoContainer } from './styles';
import { useTranslation } from 'react-i18next';
import { SecondaryText } from '../../SecondaryText';
import { PrimaryText } from '../../PrimaryText';
import { WeatherIcon } from '../../WeatherIcon';
import { ForecastListItem } from '../../../types/ForecastListItem';
import { formatTime, monthOfYear } from '../../../units/helpers';

type Props = {
  weatherInfo: ForecastListItem;
  isDay: boolean;
  nearestData: string;
}

export const HourlyForecastInfo: FC<Props> = memo(({ weatherInfo: { dt_txt, weather, main: { temp, humidity } }, isDay, nearestData }) => {
  const { t } = useTranslation();
  const currentDateTime = new Date(dt_txt);
  const nearestTime = formatTime(new Date(nearestData));
  const currentDate = new Date(dt_txt).getDate();
  const nearestDate = new Date(nearestData).getDate();
  const formatedTime = formatTime(currentDateTime);
  const isNewDay = formatedTime === '00:00'; 
  const isNow = formatedTime === nearestTime && currentDate === nearestDate;
  return (
    <HourlyForecastInfoContainer>
      <View style={{ minHeight: 20 }}>
        {isNewDay && !isNow && (
          <SecondaryText
            style={{ paddingBottom: 4 }}
            title={`${new Date(dt_txt).getDate()} ${monthOfYear[new Date(dt_txt).getMonth() + 1]}`}
            size={12}
          />
        )}
      </View>
      <WeatherIcon iconId={weather[0].id} isDay={isDay} humidity={humidity} />
      <ForecastContainer>
        <SecondaryText title={isNow ? t('currentHour') : formatedTime} size={13} />
        <View style={{ paddingTop: 5 }}>
          <PrimaryText title={`${Math.round(temp)}°`} size={16} />
        </View>
      </ForecastContainer>
    </HourlyForecastInfoContainer>
  );
});