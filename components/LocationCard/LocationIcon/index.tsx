import { FC, memo, useState } from 'react';
import { Pressable } from 'react-native';
import { LocationIconContainer } from './styles';
import Entypo from '@expo/vector-icons/Entypo';
import { EntypoIcons } from '../../../types/Icons';
import { useAnimatedPress } from '../../../hooks/useAnimatedPress';

type Props = {
  icon: EntypoIcons;
  bgColor: string;
  color: string;
  size: number;
  onPress?: () => void;
};

export const LocationIcon: FC<Props> = memo(({ icon, size, bgColor, color, onPress }) => {
  const [isPressed, setPressed] = useState<boolean>(false);
  const animatedStyle = useAnimatedPress(isPressed);
  return (
    <Pressable 
      onPressIn={() => setPressed(true)} 
      onPressOut={() => setPressed(false)} 
      onPress={onPress}
    >
      <LocationIconContainer style={[animatedStyle]} color={bgColor}>
        <Entypo name={icon} size={size} color={color} />
      </LocationIconContainer>
    </Pressable>
  );
});