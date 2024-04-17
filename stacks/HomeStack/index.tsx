import { FC, useEffect, useMemo, useState } from 'react';
import { HomeStackDetailsButton, HomeStackDetailsContainer, HomeStackGeolocationContainer, HomeStackTempContainer } from './styles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { PrimaryText } from '../../components/PrimaryText';
import { SecondaryText } from '../../components/SecondaryText';
import { HomeScreen } from '../../screens/HomeScreen';
import { DaysForecastScreen } from '../../screens/DaysForecastScreen.tsx';
import { useTheme } from '../../hooks/useTheme';
import { useSettings } from '../../hooks/useSettings';
import { useGeolocation } from '../../hooks/useGeolocation';
import { CityInfo } from '../../types/CityInfo';
import { MaterialIcons as Icon } from '../../types/Icons'; 
import { getWeatherIcon } from '../../units/helpers';
import { FadeIn } from 'react-native-reanimated';

const Stack = createNativeStackNavigator();

export const HomeStack: FC = () => {
  const { theme: { colors }, isDarkTheme } = useTheme();
  const screenOptions = () => ({
    headerStyle: { backgroundColor: colors.bgColor },
    headerShadowVisible: false,
    headerTitleStyle: { color: colors.primaryColor },
    headerTintColor: colors.primaryColor
  });

  const [cityInfo, setCityInfo] = useState<CityInfo | null>(null);
  const [memoizedLocation, setMemoizedLocation] = useState<string>('');
  const { isGrantedPermission, getGeolocation } = useGeolocation((item) => {
    setMemoizedLocation(item.city || '');
  }); 
  const { settings: { details }, setSettings } = useSettings();
  const [showTemp, setShowTemp] = useState<boolean>(false);
  const { t } = useTranslation();
  const toggleOpen = () => setSettings(prev => ({ ...prev, details: !details }));

  const sunriseDate = new Date((cityInfo?.sunrise ?? 0) * 1000);
  const sunsetDate = new Date((cityInfo?.sunset ?? 0) * 1000);
  
  const sunriseTime = sunriseDate.getHours() + sunriseDate.getMinutes() / 60;
  const sunsetTime = sunsetDate.getHours() + sunsetDate.getMinutes() / 60;
  const currentTime = new Date(cityInfo?.dt_txt ?? 0);
  const currentHour = currentTime.getHours() + currentTime.getMinutes() / 60;
  const isDay = currentHour >= sunriseTime && currentHour <= sunsetTime;
  
  const WeatherIcon = getWeatherIcon(isDay, cityInfo?.weatherId || 0);

  useEffect(() => {
    getGeolocation();
    setShowTemp(false);
  }, [cityInfo]);

  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        initialParams={{ setCityInfo, setShowTemp }}
        options={{
          headerTitle: '',
          headerShown: cityInfo !== null,
          headerLeft: () => (
            <HomeStackGeolocationContainer>
              <PrimaryText style={{ marginLeft: 10 }} title={cityInfo?.name || ''} size={20} />
              {memoizedLocation === cityInfo?.name && (
                <MaterialIcons name={Icon.LOCATIONON} size={20} color={colors.primaryColor} />
              )}
              {!isGrantedPermission && (
                <MaterialIcons name={Icon.LOCATIONOFF} size={20} color={colors.primaryColor} />
              )}
            </HomeStackGeolocationContainer>
          ),
          headerRight: () => (
            showTemp ? (
              <HomeStackTempContainer entering={FadeIn}>
                <PrimaryText title={`${Math.round(cityInfo?.temp || 0)}°`} size={16} />
                <WeatherIcon style={{ maxWidth: 45, maxHeight: 45 }} />
              </HomeStackTempContainer>
            ) : (

              <HomeStackDetailsContainer entering={FadeIn}>
                <HomeStackDetailsButton onPress={toggleOpen}>
                  <SecondaryText title={t(details ? 'showLess' : 'showMore')} />
                  <MaterialIcons 
                    name={details ? Icon.ARROWUP : Icon.ARROWDOWN} 
                    size={18} 
                    color={colors.secondaryColor}
                  />
                </HomeStackDetailsButton>
              </HomeStackDetailsContainer>
            )
          )
        }}
      />
      <Stack.Screen 
        name="DaysForecast" 
        options={{
          headerTitle: t('daysForecast'),
          headerStyle: { backgroundColor: isDarkTheme ? colors.bgColor : colors.card },
          headerTitleAlign: 'center',
          headerTintColor: colors.activeColor,
          presentation: 'formSheet',
        }} 
        component={DaysForecastScreen} 
      />
    </Stack.Navigator>
  );
};