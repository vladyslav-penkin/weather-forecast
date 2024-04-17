import { FC, useEffect, useState } from 'react';
import { HomeBackground, HomeScreenButtonContainer } from './styles';
import { useTranslation } from 'react-i18next';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase, useIsFocused, useNavigation } from '@react-navigation/native';
import { UNITS_IMPERIAL, UNITS_METRIC, getWeatherData } from '../../api/requests';
import { Container } from '../../components/Container';
import { WeatherCard } from '../../components/WeatherCard';
import { BasicBanner } from '../../components/BasicBanner';
import { DailyForecastList } from '../../components/DailyForecastList';
import { HourlyForecastList } from '../../components/HourlyForecastList';
import { MoveToButton } from '../../components/MoveToButton';
import { HomeScreenSkeleton } from '../../screens/HomeScreenSkeleton';
import { useTheme } from '../../hooks/useTheme';
import { useSettings } from '../../hooks/useSettings';
import { useLocations } from '../../hooks/useLocations';
import { Forecast } from '../../types/Forecast';
import { MaterialIcons as Icon, IoniconsIcons } from '../../types/Icons';
import { CityInfo } from '../../types/CityInfo';

interface ParamList {
  setShowTemp: React.Dispatch<React.SetStateAction<boolean>>;
  setCityInfo: React.Dispatch<React.SetStateAction<CityInfo | null>>;
};

type HomeScreenRouteProp = Readonly<{
  key: string;
  name: keyof ParamList;
  path?: string;
}> & Readonly<{
  params: Readonly<ParamList>;
}>

type NavigationProp = StackNavigationProp<ParamListBase, 'Weather'>;

interface Props {
  route: HomeScreenRouteProp;
}

export const HomeScreen: FC<Props> = ({ route: { params: { setShowTemp, setCityInfo } }}): JSX.Element => {
  const [weatherData, setWeatherData] = useState<Forecast | null>(null);
  const { settings: { degree } } = useSettings();
  const isScreenFocused = useIsFocused();
  const { t, i18n } = useTranslation();
  const { currentLocation } = useLocations();
  const { theme: { colors } } = useTheme();
  const navigation: NavigationProp = useNavigation();
  const [{ isLoading, isError, shouldReload, isEmpty }, setState] = useState({
    isLoading: false, isError: false, shouldReload: false, isEmpty: false,
  });

  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [prevDegree, setPrevDegree] = useState<boolean>(degree);
  const [prevLanguage, setPrevLanguage] = useState<string>(i18n.language);
  const isChanged = i18n.language !== prevLanguage || degree !== prevDegree;
  const updateState = (newState: object) => {
    setState((prev) => ({ ...prev, ...newState }));
  };

  const fetchData = async () => {
    updateState({ isLoading: true, isError: false });
    setCityInfo(null);
    try {
      if (currentLocation !== null) {
        const data = await getWeatherData(currentLocation.id, i18n.language, degree ? UNITS_IMPERIAL : UNITS_METRIC, currentLocation.lat, currentLocation.lon);
        setWeatherData(data);
        setCityInfo({ ...data.city, dt_txt: data.list[0].dt_txt, temp: data.list[0].main.temp, weatherId: data.list[0].weather[0].id });
        updateState({ isEmpty: false });
      } else {
        updateState({ isEmpty: true });
      }
    } catch {
      updateState({ isError: true });
    } finally {
      updateState({ isLoading: false });
    }
  };

  useEffect(() => {
    if (isChanged && isScreenFocused) {
      fetchData();
      setPrevDegree(degree);
      setPrevLanguage(i18n.language);
    }
  }, [isScreenFocused]);

  useEffect(() => {
    fetchData();
  }, [currentLocation]);

  useEffect(() => {
    if (shouldReload) {
      fetchData();
      updateState({ shouldReload: false });
    }
  }, [shouldReload]);

  useEffect(() => {
    setShowTemp(prev => {
      if (scrollPosition <= 100 && prev) {
        return false;
      } else if (scrollPosition > 100 && !prev) {
        return true;
      }
      return prev;
    });
  }, [scrollPosition]);

  if (isLoading) return <HomeScreenSkeleton />;

  return (
    <HomeBackground
      onMomentumScrollEnd={(event) => setScrollPosition(event.nativeEvent.contentOffset.y)}
      showsVerticalScrollIndicator={false}
      color={colors.bgColor}
    >
      <Container>
        {isEmpty && (
          <BasicBanner
            isOpen={isEmpty}
            icon={Icon.SUNNY}
            iconColor={colors.locationColor}
            title={t('findLocTitle')}
            subtitle={t('findLocSubtitle')}
            buttonText={t('findLocButton')}
            onPress={() => navigation.navigate('Locations')}
          />
        )}
        {isError && (
          <BasicBanner
            isOpen={isError}
            icon={Icon.ERROR}
            iconColor={colors.activeColor}
            title={t('errorTitle')}
            subtitle={t('errorSubtitle')}
            buttonText={t('errorButton')}
            isLoading={shouldReload}
            onPress={() => updateState({ shouldReload: true })}
          />
        )}
        {(!isEmpty && weatherData !== null) && (
          <>
            <WeatherCard weatherData={weatherData} />
            <HourlyForecastList weatherData={weatherData} />
            <DailyForecastList weatherData={weatherData} />
            <HomeScreenButtonContainer borderColor={colors.borderColor}>
              <MoveToButton 
                icon={IoniconsIcons.CALENDAR} 
                title={t('dayForecast')}
                arrowIcon={Icon.ARROWRIGHT} 
                onPress={() => navigation.navigate('DaysForecast', { weatherData })}
              />
            </HomeScreenButtonContainer>
          </>
        )}
      </Container>
    </HomeBackground>
  );
}