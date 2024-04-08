import { useEffect } from "react";
import { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

export const useAnimatedPress = (isPressed: boolean) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const transitionStyle = {
    duration: 200,
    dampingRatio: 1,
    stiffness: 100,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  };
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(scale.value, transitionStyle) }],
    opacity: withSpring(opacity.value, transitionStyle),
  }), [scale.value, opacity.value]);

  useEffect(() => {
    scale.value = isPressed ? 0.9 : 1;
    opacity.value = isPressed ? 0.5 : 1;
  }, [isPressed]);

  return animatedStyle;
};