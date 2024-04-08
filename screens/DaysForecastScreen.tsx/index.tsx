import { FC, useEffect, useMemo, useState } from 'react';
import { DaysForecastContainer } from './styles';
import { ScrollView } from 'react-native';
import { useIsFocused, ParamListBase, useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { DateList } from '../../components/DateList';
import { WeatherTodayList } from '../../components/WeatherTodayList';
import { WeatherDailyList } from '../../components/WeatherDailyList';
import { DaysForecastScreenSkeleton } from '../DaysForecastScreenSkeleton';
import { useTheme } from '../../hooks/useTheme';
import { DailyList } from '../../types/DailyList';
import { DateList as DateListType } from '../../types/DateList';
import { Forecast } from '../../types/Forecast';
import { getCurrentTime, dayOfWeek, getDailyList, getTwoDigitsTime } from '../../units/helpers';

interface ParamList {
  weatherData: Forecast;
  currentDate: string;
  currentIndex: number;
};

type DaysForecastScreenRouteProp = Readonly<{
  key: string;
  name: keyof ParamList;
  path?: string;
}> & Readonly<{
  params: Readonly<ParamList>;
}>

type NavigationProp = StackNavigationProp<ParamListBase, 'DaysForecastScreen'>;

export const DaysForecastScreen: FC = () => {
  const route = useRoute<DaysForecastScreenRouteProp>();
  let { weatherData, currentDate, currentIndex = 0 } = route.params;
  const { t } = useTranslation();

  const dailyList: DailyList = useMemo(() => getDailyList(weatherData as Forecast), [weatherData]);
  const dateList: DateListType[] = useMemo(() => Object.entries(dailyList)
    .filter(([_, list]) => list.some((item) => getCurrentTime(item.dt_txt) === '15:00'))
    .map(([date, list]) => ({ 
      date, 
      dayOfWeek: dayOfWeek[new Date(list[0].dt_txt).getDay()],
    })), [dailyList]);

  const [selectedDate, setSelectedDate] = useState<string>(currentDate ?? dateList.map((item) => item.date)[0]);
  const isFocused = useIsFocused();
  const navigaiton: NavigationProp = useNavigation();
  const { theme: { colors }, isDarkTheme } = useTheme();

  const sunriseDate = getCurrentTime(`${new Date(weatherData.city.sunrise * 1000)}`);
  const sunsetDate = getCurrentTime(`${new Date(weatherData.city.sunset * 1000)}`);
  const sunriseTime = getTwoDigitsTime(`${new Date(weatherData.city.sunrise * 1000)}`);
  const sunsetTime = getTwoDigitsTime(`${new Date(weatherData.city.sunset * 1000)}`);
  const currentTime = getTwoDigitsTime(`${new Date(weatherData.list[0].dt_txt)}`);
  const [daylightHours, daylightMinutes] = (sunsetTime - sunriseTime).toFixed(2).split('.');
  const isDay = currentTime >= sunriseTime && currentTime <= sunsetTime;

  useEffect(() => {
    if (!isFocused) navigaiton.goBack();
  }, [isFocused]);

  if (weatherData?.list.length === 0) return <DaysForecastScreenSkeleton />;

  const dailyInfo = [
    { title: t('sunrise'), description: sunriseDate, icon: 'sunrise' },
    { title: t('sunset'), description: sunsetDate, icon: 'sunset' },
    { title: t('daylight'), description: `${daylightHours} ${t('hour')} ${daylightMinutes} ${t('minute')}`, icon: 'daylight' },
  ];

  return (
    <DaysForecastContainer color={isDarkTheme ? colors.bgColor : colors.card}>
      <DateList
        dateList={dateList}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        currentIndex={currentIndex}
      />
      <ScrollView>
        <WeatherTodayList
          dailyList={dailyList}
          selectedDate={selectedDate}
          isDay={isDay}
        />
        <WeatherDailyList dailyInfo={dailyInfo} />
      </ScrollView>
    </DaysForecastContainer>
  );
};