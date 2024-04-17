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
import { getCurrentTime, dayOfWeek, getDailyList } from '../../units/helpers';

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
    .filter(([_, list]) => list.some((item) => ['15:00', '3:00 PM'].includes(getCurrentTime(item.dt_txt))))
    .map(([date, list]) => ({ 
      date, 
      dayOfWeek: dayOfWeek[new Date(list[0].dt_txt).getDay()],
    })), [dailyList]);

  const [selectedDate, setSelectedDate] = useState<string>(currentDate ?? dateList.map((item) => item.date)[0]);
  const isFocused = useIsFocused();
  const navigation: NavigationProp = useNavigation();
  const { theme: { colors }, isDarkTheme } = useTheme();
  const scrollRef = useRef<ScrollView>(null);

  const sunriseDate = new Date((weatherData.city.sunrise + weatherData.city.timezone) * 1000);
  const sunsetDate = new Date((weatherData.city.sunset + weatherData.city.timezone) * 1000);
  
  const sunriseTime = sunriseDate.getHours() + sunriseDate.getMinutes() / 60;
  const sunsetTime = sunsetDate.getHours() + sunsetDate.getMinutes() / 60;
  
  const daylightHours = Math.floor(sunsetTime - sunriseTime);
  const daylightMinutes = Math.round((sunsetTime - sunriseTime - daylightHours) * 60);

  if (weatherData?.list.length === 0) return <DaysForecastScreenSkeleton />;

  const dailyInfo = [
    { title: t('sunrise'), description: getCurrentTime(`${sunriseDate}`), icon: 'sunrise' },
    { title: t('sunset'), description: getCurrentTime(`${sunsetDate}`), icon: 'sunset' },
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