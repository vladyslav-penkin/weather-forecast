import { useEffect } from 'react';
import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export const useAnimatedOpacity = (isOpen: boolean) => {
  const opacity = useSharedValue(0);
  const transitionStyle = {
    duration: 500,
    dampingRatio: 1,
    stiffness: 100,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withSpring(opacity.value, transitionStyle),
  }), [opacity.value]);

  useEffect(() => {
    opacity.value = isOpen ? 1 : 0;
  }, [isOpen])
 
  return animatedStyle;
};