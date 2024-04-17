import { FC, memo } from 'react';
import { MoveToButtonContainer, MoveToButtonIcon, MoveToButtonIconContainer, MoveToButtonInfo } from './styles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { PrimaryText } from '../../components/PrimaryText';
import { useTheme } from '../../hooks/useTheme';
import { MaterialIcons as Icon, IoniconsIcons } from '../../types/Icons';
interface Props {
  icon: IoniconsIcons;
  title: string;
  arrowIcon: Icon;
  onPress: () => void;
}

export const MoveToButton: FC<Props> = memo(({ icon, title, arrowIcon, onPress }) => {
  const { theme: { colors } } = useTheme();

  return (
    <MoveToButtonContainer onPress={onPress}>
      <MoveToButtonInfo>
        <MoveToButtonIconContainer>
          <MoveToButtonIcon
            colors={colors.cardColors}
            locations={[0, 1]}
            start={{ x: 0.5, y: 0.5 }}
          />
          <Ionicons name={icon} size={24} color={colors.humidityColor} />
        </MoveToButtonIconContainer>
        <PrimaryText title={title} size={16} />
      </MoveToButtonInfo>
      <MaterialIcons 
        style={{ backgroundColor: colors.bgColor }} 
        title={arrowIcon} 
        size={18} 
        color={colors.humidityColor}
      />
    </MoveToButtonContainer>
  );
});