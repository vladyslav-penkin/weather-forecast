import { useEffect } from "react";
import { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

export const useAnimatedSwitch = (isToggled: boolean) => {
  const translateX = useSharedValue(isToggled ? 64 : 0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(translateX.value, {
      duration: 1000,
      dampingRatio: 1,
      stiffness: 100,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    })}]
  }), [translateX.value]);

  useEffect(() => {
    translateX.value = isToggled ? 64 : 0;
  }, [isToggled]);

  return animatedStyle;
};