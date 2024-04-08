import { FC, memo } from 'react';
import { SearchInfoButton, SearchInfoContainer } from './styles';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { PrimaryText } from '../../components/PrimaryText';
import { SecondaryText } from '../../components/SecondaryText';
import { useLocations } from '../../hooks/useLocations';
import { useAnimatedTransition } from '../../hooks/useAnimatedTransition';
import { SearchForecastListItem } from '../../types/SearchForecastListItem';

type NavigationProp = StackNavigationProp<ParamListBase, 'Weather'>;

type Props = {
  cityInfo: SearchForecastListItem;
  setFocused: React.Dispatch<React.SetStateAction<boolean>>;
  addNewLocation: (cityId: number) => void;
  isFocused: boolean;
  currentIndex: number;
};

export const SearchInfo: FC<Props> = memo(({ cityInfo: { name, sys: { country }, id }, setFocused, addNewLocation, isFocused, currentIndex }) => {
  const { setCurrentLocation, setLocations } = useLocations();
  const navigation: NavigationProp = useNavigation();
  const animatedStyle = useAnimatedTransition(isFocused, currentIndex);

  const onAdd = () => {
    setCurrentLocation(id);
    setLocations((prev) => {
      if (!prev.includes(id)) {
        addNewLocation(id);
        return [...prev, id];
      } else {
        return prev;
      }
    });
    setFocused(false);
    navigation.navigate('Weather');
  };

  return (
    <SearchInfoContainer style={animatedStyle}>
      <SearchInfoButton onPress={onAdd}>
        <PrimaryText title={name} size={16} />
        <SecondaryText title={`, ${country}`} size={16} />
      </SearchInfoButton>
    </SearchInfoContainer>
  );
});