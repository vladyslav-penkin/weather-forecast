import { FC, memo, useCallback, useEffect, useMemo } from 'react';
import { CancelText, Icon, SearchContainer, SearchInput } from './styles';
import { Dimensions, Keyboard, TouchableOpacity } from 'react-native';
import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { BasicCard } from '../../components/BasicCard';
import { useTheme } from '../../hooks/useTheme';
import { IoniconsIcons } from '../../types/Icons';
import { useTranslation } from 'react-i18next';

type Props = {
  isFocused: boolean;
  setFocused: React.Dispatch<React.SetStateAction<boolean>>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

export const Search: FC<Props> = memo(({ isFocused, setFocused, query,setQuery, setSearchQuery }) => {
  const { theme: { colors } } = useTheme();
  const { t } = useTranslation();

  const windowWidth = Dimensions.get('window').width;
  const cardWidth = useMemo(() => windowWidth > 425 ? 393 : windowWidth - 32, [windowWidth]);
  const width = useSharedValue<number>(cardWidth);
  const animatedStyle = useAnimatedStyle(() => ({
    width: withSpring(width.value, {
      duration: 1000,
      dampingRatio: 1,
      stiffness: 100,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    }),
  }), [width.value]);

  const debounce = useCallback((callback: (text: string) => void, delay: number) => {
    let timerId: NodeJS.Timeout;
    
    return (text: string) => {
      clearTimeout(timerId);
      timerId = setTimeout(callback, delay, text);
    };
  }, []);

  const onChangeQuery = useCallback(debounce((text: string) => {
    setSearchQuery(text);
  }, 2000), [debounce]);

  useEffect(() => {
    if (isFocused) {
      width.value = cardWidth - 80;
      setFocused(true);
    } else {
      Keyboard.dismiss();
      setQuery('');
      setSearchQuery('');
      width.value = cardWidth;
      setFocused(false);
    }
  }, [isFocused]);

  return (
    <SearchContainer>
      <BasicCard padding="1" style={[{ borderRadius: 6 }, animatedStyle]}>
        <Icon 
          name={IoniconsIcons.SEARCH} 
          size={16}
          color={colors.secondaryColor}
        />
        <SearchInput
          selectionColor={colors.activeColor}
          color={colors.primaryColor}
          placeholder={t('search')}
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            onChangeQuery(text);
          }}
          onFocus={() => setFocused(true)}
          placeholderTextColor={colors.secondaryColor}
        />
      </BasicCard>

      <TouchableOpacity onPress={() => setFocused(false)}>
        <CancelText color={colors.activeColor}>
          {t('cancel')}
        </CancelText>
      </TouchableOpacity>
    </SearchContainer>
  );
});