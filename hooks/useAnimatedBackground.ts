import { useEffect } from 'react';
import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export const useAnimatedBackground = (isOpen: boolean) => {
  const display = useSharedValue(0);
  const opacity = useSharedValue(0);

  const transitionStyle = {
    duration: 200,
    dampingRatio: 1,
    stiffness: 100,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  };

  const animatedStyle = useAnimatedStyle(() => ({
    display: display.value !== 0 ? 'flex' : 'none',
    opacity: withSpring(opacity.value, transitionStyle),
  }), [display.value, opacity.value]);

  useEffect(() => {
    if (isOpen) {
      display.value = 1;
    } else {
      setTimeout(() => {
        display.value = 0;
      }, 300);
    }
    opacity.value = isOpen ? 0.2 : 0;
  }, [isOpen]);

  return animatedStyle;
};