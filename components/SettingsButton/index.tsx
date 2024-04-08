import { FC, memo } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { SettingsButtonContainer } from './styles';
import { PrimaryText } from '../../components/PrimaryText';

interface Props {
  title: string;
  isWarning?: boolean;
  onPress: () => void;
}

export const SettingsButton: FC<Props> = memo(({ title, isWarning = false, onPress }) => {
  const { theme: { colors } } = useTheme();
  return (
    <SettingsButtonContainer onPress={onPress}>
      <PrimaryText 
        title={title} 
        style={{ color: isWarning ? colors.cancelColor : colors.primaryColor }} 
        size={16} 
      />
    </SettingsButtonContainer>
  );
});