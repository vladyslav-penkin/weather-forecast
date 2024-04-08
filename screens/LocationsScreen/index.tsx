import { FC, useEffect, useMemo, useState } from 'react';
import { LocationScreenContainer } from './styles';
import { useTranslation } from 'react-i18next';
import { useIsFocused } from '@react-navigation/native';
import { getWeatherData } from '../../api/requests';
import { Container } from '../../components/Container';
import { Search } from '../../components/Search';
import { BasicBanner } from '../../components/BasicBanner';
import { LocationList } from '../../components/LocationList';
import { SearchList } from '../../components/SearchList';
import { LocationScreenSkeleton } from '../../screens/LocationScreenSkeleton';
import { useTheme } from '../../hooks/useTheme';
import { useLocations } from '../../hooks/useLocations';
import { useSettings } from '../../hooks/useSettings';
import { useGeolocation } from '../../hooks/useGeolocation';
import { Forecast } from '../../types/Forecast';
import { MaterialIcons } from '../../types/Icons';

export const LocationsScreen: FC = () => {
  const [weatherDataList, setWeatherDataList] = useState<Forecast[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [memoizedLocation, setMemoizedLocation] = useState<string>('');
  const [isFocused, setFocused] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const { isGeolocationLoading, getGeolocation } = useGeolocation((item) => {
    setQuery(item.city || '');
    setSearchQuery(item.city || '');
    setMemoizedLocation(item.city || '');
  }); 
  const { t, i18n } = useTranslation();
  const { settings: { degree } } = useSettings();
  const { theme: { colors } } = useTheme();
  const { locations } = useLocations();
  const isScreenFocused = useIsFocused();

  const previousDegree = useMemo(() => degree, [isScreenFocused === false]);
  const previousLanguage = useMemo(() => i18n.language, [isScreenFocused === false]);

  const fetchData = async (cityId: number) => {
    const data = await getWeatherData(cityId, i18n.language, degree);
    return data;
  };

  const setGeolocation = () => {
    if (memoizedLocation) {
      setQuery(memoizedLocation);
      setSearchQuery(memoizedLocation);
    } else {
      getGeolocation();
    }
  };
  const getLocationData = async () => {
    try {
      setLoading(true);
      const [...data] = await Promise.all(locations.map((cityId: number) => fetchData(cityId)));
      setWeatherDataList(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (locations.length === 0) setWeatherDataList([]);
  }, [locations]);

  useEffect(() => {
    if (isScreenFocused) {
      getLocationData();
    }
  }, [i18n.language !== previousLanguage, degree !== previousDegree]);

  useEffect(() => {
    setFocused(false);
  }, [!isScreenFocused]);

  if (isLoading) return <LocationScreenSkeleton />;

  return (
    <LocationScreenContainer color={colors.bgColor}>
      <Container> 
        <Search
          isFocused={isFocused}
          setFocused={setFocused}
          query={query}
          setQuery={setQuery}
          setSearchQuery={setSearchQuery}
        />
        
        {(locations.length === 0 && !isFocused) && (
          <BasicBanner 
            isOpen={locations.length === 0 && !isFocused}
            icon={MaterialIcons.ADDLOCATION}
            iconColor={colors.locationColor}
            title={t('defaultTitle')}
            subtitle={t('defaultSubtitle')}
          />
        )}
        {(isFocused && !searchQuery.length) && (
          <BasicBanner 
            isOpen={isFocused && !searchQuery.length}
            icon={MaterialIcons.LOCATION}
            iconColor={colors.activeColor}
            title={t('addLocTitle')}
            subtitle={t('addLocSubtitle')}
            buttonText={t('addLocButton')}
            isLoading={isGeolocationLoading}
            onPress={setGeolocation}
          />
        )}
        {!isFocused && (
          <LocationList 
            locations={weatherDataList} 
            setWeatherDataList={setWeatherDataList} 
            isFocused={isFocused}
          />
        )}
        {(searchQuery.length > 0 && isFocused) && (
          <SearchList
            searchQuery={searchQuery}
            setFocused={setFocused}
            setWeatherDataList={setWeatherDataList}
            isFocused={(isFocused && searchQuery.length > 0)}
          />
        )}
      </Container>
    </LocationScreenContainer>
  );
};