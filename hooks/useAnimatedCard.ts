import { useEffect } from 'react';
import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export const useAnimatedCard = (isOpen: boolean) => {
  const height = useSharedValue(0);
  const opacity = useSharedValue(0);
  // const getTransitionStyle = (duration: number) => ({
  //   duration,
  //   dampingRatio: 1,
  //   stiffness: 100,
  //   overshootClamping: false,
  //   restDisplacementThreshold: 0.01,
  //   restSpeedThreshold: 0.01,
  // });
  const animatedStyle = useAnimatedStyle(() => ({
    height: withSpring(height.value, {
      duration: 1000,
      dampingRatio: 1,
      stiffness: 100,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    }),
    opacity: withSpring(opacity.value, {
      duration: 300,
      dampingRatio: 1,
      stiffness: 100,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    })
  }), [height.value, opacity.value]);

  useEffect(() => {
    height.value = isOpen ? 232 : 0;
    opacity.value = isOpen ? 1 : 0;
  }, [isOpen]);


  return animatedStyle;
};