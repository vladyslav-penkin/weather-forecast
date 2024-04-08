import { FC, memo } from 'react';
import { BannerContainer } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { PrimaryText } from '../../components/PrimaryText';
import { SecondaryText } from '../../components/SecondaryText';
import { BasicButton } from '../../components/BasicButton';
import { useAnimatedTransition } from '../../hooks/useAnimatedTransition';
import { MaterialIcons as MaterialIconsType } from '../../types/Icons';

type Props = {
  isOpen: boolean;
  icon: MaterialIconsType;
  iconColor: string;
  iconSize?: number;
  title: string;
  subtitle?: string;
  buttonText?: string;
  isLoading?: boolean;
  onPress?: () => void;
}

export const BasicBanner: FC<Props> = memo(({ 
  isOpen, 
  icon, 
  iconColor, 
  iconSize = 70, 
  title, 
  subtitle, 
  buttonText, 
  isLoading, 
  onPress,
}) => {
  const animatedStyle = useAnimatedTransition(isOpen);
  return (
    <BannerContainer style={[animatedStyle]}>
      <MaterialIcons name={icon} size={iconSize} color={iconColor} />
      <PrimaryText style={{ textAlign: 'center' }} title={title} size={18} />
      {subtitle && (
        <SecondaryText style={{ textAlign: 'center' }} title={subtitle} size={14} />
      )}
      {buttonText && (
        <BasicButton 
          title={buttonText} 
          width={260}
          height={44} 
          fontSize={16}
          isLoading={isLoading}
          onPress={onPress}
        />
      )}
    </BannerContainer>
  );
});