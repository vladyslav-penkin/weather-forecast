import { FC, memo, useEffect } from 'react';
import { Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useTheme } from '../../hooks/useTheme';

interface Props {
  isToggled: boolean;
  onPress: () => void;
}
export const BasicSwitch: FC<Props> = memo(({ isToggled, onPress }) => {
  const { theme: { colors } } = useTheme();
  const translateX = useSharedValue(0);
  const transitionStyle = {
    duration: 500,
    dampingRatio: 1,
    stiffness: 100,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(translateX.value, transitionStyle)}]
  }), [translateX.value]);

  useEffect(() => {
    translateX.value = isToggled ? 24 : 0;
  }, [isToggled]);

  return (
    <Pressable
      onPress={onPress}
      style={{ 
        width: 50,
        borderRadius: 50,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: isToggled ? colors.activeColor : colors.secondaryColor,
      }}
    >
      <Animated.View style={[animatedStyle, {
        width: 22,
        height: 22,
        backgroundColor: isToggled ? colors.activeColor : colors.secondaryColor,
        borderRadius: 50,
        margin: 1,
      }]} />
    </Pressable>
  );
});