import { FC, memo, useEffect } from 'react';
import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { WarningBackground, WarningButtonContainer, WarningCard, WarningContainer } from './styles';
import { PrimaryText } from '../../components/PrimaryText';
import { SecondaryText } from '../../components/SecondaryText';
import { BasicOutlinedButton } from '../../components/BasicOutlinedButton';
import { BasicButton } from '../../components/BasicButton';
import { useTheme } from '../../hooks/useTheme';
import { useTranslation } from 'react-i18next';
import { WarningState } from '../../types/WarningState';

interface Props {
  warning: WarningState;
  setWarning: React.Dispatch<React.SetStateAction<WarningState>>;
}

export const Warning: FC<Props> = memo(({ warning: { isOpen, title, buttonTitle, onSubmit }, setWarning }) => {
  const { theme: { colors } } = useTheme();
  const { t } = useTranslation();
  
  const opacity = useSharedValue(0);
  const display = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const transitionStyle = {
    duration: 300,
    dampingRatio: 1,
    stiffness: 100,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  };
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withSpring(opacity.value, transitionStyle),
    display: display.value !== 0 ? 'flex' : 'none',
  }), [opacity.value, display.value]);

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(scale.value, transitionStyle) }]
  }), [scale.value]);

  useEffect(() => {
    if (isOpen) {
      display.value = 1;
    } else {
      setTimeout(() => {
        display.value = 0;
      }, 300);
    }
    opacity.value = isOpen ? 1 : 0;
    scale.value = isOpen ? 1 : 0.8;
  }, [isOpen]);

  return (
    <WarningContainer style={animatedStyle}>
      <WarningBackground tint={'dark'} intensity={50}>
        <WarningCard style={animatedCardStyle} bgColor={colors.card} borderColor={colors.bgColor}>
          <PrimaryText 
            style={{ textAlign: 'center' }} 
            title={t('warning')}
            size={18} 
          />
          <SecondaryText
            style={{ paddingTop: 16, textAlign: 'center' }}
            title={title}
            size={14}
          />
          <WarningButtonContainer>
            <BasicOutlinedButton 
              title={t('cancel')}
              width={128}
              height={40} 
              onPress={() => setWarning(prev => ({ ...prev, isOpen: false }))}
            />
            <BasicButton 
              title={buttonTitle}
              width={128} 
              height={40}
              onPress={onSubmit}
            />
          </WarningButtonContainer>
        </WarningCard>
      </WarningBackground>
    </WarningContainer>
  );
});