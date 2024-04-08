import { FC, memo } from 'react';
import { StyledText } from './styles';
import { useTheme } from '../../hooks/useTheme';

type Props = {
  title: string;
  size?: number;
  style?: object;
  otherProps?: any;
}

export const SecondaryText: FC<Props> = memo(({ style, title, size = 14, ...otherProps }) => {
  const { theme: { colors } } = useTheme();
  return (
    <StyledText style={style} color={colors.secondaryColor} fontSize={size} {...otherProps}>
      {title}
    </StyledText>
  );
});