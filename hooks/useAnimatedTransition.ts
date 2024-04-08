import { useEffect } from "react";
import { useSharedValue, useAnimatedStyle, withDelay, withSpring } from "react-native-reanimated";

interface AnimatedStyle {
  transform: {
      translateY: number;
  }[];
  opacity: number;
}

export const useAnimatedTransition = (isOpen: boolean, currentIndex: number = 0): AnimatedStyle => {
  const translateY = useSharedValue(64);
  const opacity = useSharedValue(0);
  const transitionStyle = {
    duration: 1000,
    dampingRatio: 1,
    stiffness: 100,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  };
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: withDelay(100 * currentIndex, withSpring(translateY.value, transitionStyle)) }],
    opacity: withDelay(100 * currentIndex, withSpring(opacity.value, transitionStyle)),
  }), [translateY.value, opacity.value]);

  useEffect(() => {
    translateY.value = isOpen ? 0 : 64;
    opacity.value = isOpen ? 1 : 0;
  }, [isOpen]);

  return animatedStyle;
};