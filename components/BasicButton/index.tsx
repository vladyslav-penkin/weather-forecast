import { FC, memo } from 'react';
import { StyledButton, ButtonText } from './styles';
import { useTheme } from '../../hooks/useTheme';
import { ActivityIndicator } from 'react-native';

type Props = {
  title: string;
  width?: number;
  height?: number;
  fontSize?: number;
  isLoading?: boolean;
  onPress?: () => void;
};

export const BasicButton: FC<Props> = memo(({ title, width, height, isLoading = false, fontSize = 14, onPress }) => {
  const { theme: { colors } } = useTheme();

  return (
    <StyledButton
      buttonWidth={width ? `${width}px` : '100%'} 
      buttonHeight={height ? `${height}px`: '100%'}
      bgColor={colors.activeColor}
      onPress={onPress}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={colors.elementsColor} />
      ) : (
        <ButtonText color={colors.elementsColor} fontSize={fontSize}>
          {title}
        </ButtonText>
      )}
    </StyledButton>
  );
});