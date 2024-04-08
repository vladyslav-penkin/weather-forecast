import { FC, memo } from 'react';
import { View } from 'react-native';
import { ForecastContainer, StyledView } from './styles';
import { SecondaryText } from '../../SecondaryText';
import { PrimaryText } from '../../PrimaryText';
import { WeatherIcon } from '../../WeatherIcon';
import { ForecastListItem } from '../../../types/ForecastListItem';
import { getCurrentTime, monthOfYear } from '../../../units/helpers';
import { useTranslation } from 'react-i18next';

type Props = {
  weatherInfo: ForecastListItem;
  isDay: boolean;
  nearestData: string;
}

export const HourlyForecastInfo: FC<Props> = memo(({ weatherInfo: { dt_txt, weather, main: { temp, humidity } }, isDay, nearestData }) => {
  const { t } = useTranslation();
  const currentTime = getCurrentTime(dt_txt);
  const nearestTime = getCurrentTime(nearestData);
  const currentDate = new Date(dt_txt).getDate();
  const nearestDate = new Date(nearestData).getDate();
  const isNewDay = currentTime === '00:00'; 
  const isNow = currentTime === nearestTime && currentDate === nearestDate;
  return (
    <StyledView>
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
        <SecondaryText title={isNow ? t('currentHour') : currentTime} size={13} />
        <View style={{ paddingTop: 5 }}>
          <PrimaryText title={`${Math.round(temp)}°`} size={16} />
        </View>
      </ForecastContainer>
    </StyledView>
  );
});