import { FC, ReactNode } from 'react';
import { SettingsCardContainer, ThemeBackground } from './styles';
import { useTheme } from '../../hooks/useTheme';

type Props = {
  children: ReactNode;
};

export const SettingsCard: FC<Props> = ({ children }) => {
  const { theme: { colors } } = useTheme();
  return (
    <SettingsCardContainer>
      <ThemeBackground
        colors={colors.cardColors} 
        locations={[0, 1]} 
        start={{ x: 0.5, y: 0.5 }} 
      />
      {children}
    </SettingsCardContainer>
  );
};