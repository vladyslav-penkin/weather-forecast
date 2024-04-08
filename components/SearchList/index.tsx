import { FC, memo, useState } from 'react';
import { FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { getWeatherData, getWeatherSearchList } from '../../api/requests';
import { SearchInfo } from '../../components/SearchInfo';
import { SearchListSkeleton } from '../../components/SearchListSkeleton';
import { BasicBanner } from '../../components/BasicBanner';
import { useFetch } from '../../hooks/useFetch';
import { useTheme } from '../../hooks/useTheme';
import { useSettings } from '../../hooks/useSettings';
import { SearchForecast } from '../../types/SearchForecast';
import { Forecast } from '../../types/Forecast';
import { MaterialIcons } from '../../types/Icons';
import { SearchForecastListItem } from '../../types/SearchForecastListItem';

type Props = {
  searchQuery: string;
  setFocused: React.Dispatch<React.SetStateAction<boolean>>;
  setWeatherDataList: React.Dispatch<React.SetStateAction<Forecast[]>>;
  isFocused: boolean;
};

export const SearchList: FC<Props> = memo(({ searchQuery, isFocused, setFocused,  setWeatherDataList }) => {
  const [citiesData, setCitiesData] = useState<SearchForecast>();
  const { theme: { colors } } = useTheme();
  const { t, i18n } = useTranslation();
  const { settings: { degree } } = useSettings();
  const { isLoading, isError } = useFetch(async () => {
    const response = await getWeatherSearchList(searchQuery.toLowerCase().trim(), i18n.language);
    setCitiesData(response);
  }, () => {}, () => {}, [searchQuery]);

  const isEmpty = citiesData?.list.length === 0;
  const isFound = !isError && !isEmpty;
  const addNewLocation = async (cityId: number) => {
    const newLocation = await getWeatherData(cityId, i18n.language, degree);
    setWeatherDataList(prev => [...prev, newLocation]);
  };

  if (isLoading) return <SearchListSkeleton />;

  const banners = [
    { 
      isOpen: isError && isFocused,
      icon: MaterialIcons.ERROR,
      iconColor: colors.activeColor,
      title: t('errorTitle'),
    },
    { 
      isOpen: isEmpty && isFocused,
      icon: MaterialIcons.EMPTY,
      iconColor: colors.activeColor,
      title: t('notFoundTitle'),
      subtitle: t('notFoundSubtitle'),
    }
  ];

  return (
    <>
      {banners.map(({ isOpen, icon, iconColor, title, subtitle }) => (
        isOpen && (
          <BasicBanner
            isOpen={isOpen}
            icon={icon}
            iconColor={iconColor}
            title={title}
            subtitle={subtitle}
          />
        )
      ))}
      {isFound && (
        <FlatList
          style={{ marginTop: 20 }}
          showsVerticalScrollIndicator={false}
          data={citiesData?.list as SearchForecastListItem[]}
          renderItem={({ item, index }) => (
            <SearchInfo
              cityInfo={item as SearchForecastListItem}
              setFocused={setFocused}
              addNewLocation={addNewLocation}
              isFocused={isFocused}
              currentIndex={index}
            />
          )}
          keyExtractor={(item: SearchForecastListItem) => String(item.dt)}
        />
      )}
    </>
  );
});