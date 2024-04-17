import { FC, useEffect, useMemo, useRef, useState } from 'react';
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
import { getCurrentTime, dayOfWeek, getDailyList, formatSunriseAndSunsetTime, calculateSunriseAndSunsetDate, calculateDaylightHours, formatTime } from '../../units/helpers';
import { differenceInMinutes } from 'date-fns';

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

  const dailyList: DailyList = useMemo(() => getDailyList(weatherData as Forecast), [weatherData]);
  const dateList: DateListType[] = useMemo(() => Object.entries(dailyList)
    .filter(([_, list]) => list.some((item) => {
      const hour = new Date(item.dt_txt).getHours().toString().padStart(2, '0');
      const minute = new Date(item.dt_txt).getMinutes().toString().padStart(2, '0');

      return `${hour}:${minute}` === '15:00';
    }))
    .map(([date, list]) => ({ 
      date, 
      dayOfWeek: dayOfWeek[new Date(list[0].dt_txt).getDay()],
    })), [dailyList]);

  const [selectedDate, setSelectedDate] = useState<string>(currentDate ?? dateList.map((item) => item.date)[0]);
  const isFocused = useIsFocused();
  const navigation: NavigationProp = useNavigation();
  const { theme: { colors }, isDarkTheme } = useTheme();
  const { t } = useTranslation();
  const scrollRef = useRef<ScrollView>(null);

  const { sunriseDate, sunsetDate } = calculateSunriseAndSunsetDate(weatherData.city.sunrise, weatherData.city.sunset, weatherData.city.timezone);
  const { daylightHours, daylightMinutes }  = calculateDaylightHours(sunriseDate, sunsetDate);
  const { sunrise, sunset } = formatSunriseAndSunsetTime(sunriseDate, sunsetDate);

  const dailyInfo = [
    { title: t('sunrise'), description: sunrise, icon: 'sunrise' },
    { title: t('sunset'), description: sunset, icon: 'sunset' },
    { title: t('daylight'), description: `${daylightHours} ${t('hour')} ${daylightMinutes} ${t('minute')}`, icon: 'daylight' },
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ x: 5, y: 5, animated: true });
    }
  }, [selectedDate]);

  useEffect(() => {
    if (!isFocused) navigation.goBack();
  }, [isFocused]);

  if (weatherData?.list.length === 0) return <DaysForecastScreenSkeleton />;

  return (
    <DaysForecastContainer color={isDarkTheme ? colors.bgColor : colors.card}>
      <DateList
        dateList={dateList}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        currentIndex={currentIndex}
      />
      <ScrollView showsVerticalScrollIndicator={false} ref={scrollRef}>
        <WeatherTodayList
          dailyList={dailyList}
          selectedDate={selectedDate}
          sunrise={weatherData.city.sunrise}
          sunset={weatherData.city.sunset}
          timezone={weatherData.city.timezone}
        />
        <WeatherDailyList dailyInfo={dailyInfo} />
      </ScrollView>
    </DaysForecastContainer>
  );
};