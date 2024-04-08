import { FC, ReactNode, memo } from 'react';
import { Card, CardBackground } from './styles';
import { useTheme } from '../../hooks/useTheme';

type Props = {
  children: ReactNode;
  padding?: string;
  style?: Array<object> | object;
  otherProps?: any;
};

export const BasicCard: FC<Props> = memo(({ children, padding = '20', style, ...otherProps }) => {
  const { theme } = useTheme();

  return (
    <Card padding={padding} style={style} {...otherProps}>
      <CardBackground
        colors={theme.colors.cardColors} 
        locations={[0, 1]} 
        start={{ x: 0.5, y: 0.5 }} 
      />
      {children}
    </Card>
  );
});