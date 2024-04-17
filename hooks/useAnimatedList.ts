import { useEffect } from 'react';
import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export const useAnimatedList = (isOpen: boolean) => {
  const display = useSharedValue(0);
  const scale = useSharedValue(isOpen ? 1 : 0);
  const transitionStyle = {
    duration: 300,
    dampingRatio: 1,
    stiffness: 100,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  };
  const animatedStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    top: 0,
    right: 0,
    display: display.value !== 0 ? 'flex' : 'none',
    transform: [
      { scale: withSpring(scale.value, transitionStyle) },
    ],
  }), [display.value, scale.value]);

  useEffect(() => {
    scale.value = isOpen ? 1 : 0;
    if (isOpen) {
      display.value = 1;
    } else {
      setTimeout(() => {
        display.value = 0;
      }, 300);
    }
  }, [isOpen]);

  return animatedStyle;
};