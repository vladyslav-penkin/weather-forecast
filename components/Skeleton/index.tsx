import { FC, useEffect } from 'react';
import { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { useTheme } from '../../hooks/useTheme';
import { SkeletonCard } from './styles';

type Props = {
  style?: any;
  otherProps?: any;
};

export const Skeleton: FC<Props> = ({ style, ...otherProps }) => {
  const { theme: { colors } } = useTheme();

  const opacity = useSharedValue(1);
  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.3, {
          duration: 1000
        }),
        withTiming(1, {
          duration: 1000
        })
      ),
      Infinity,
      true,
    );
  }, []);
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <SkeletonCard color={colors.loadingColor} style={[animatedStyle, style]} {...otherProps} />
  );
};