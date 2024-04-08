import { FC, ReactNode, createContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../constants/themeStyles';
import { useAsyncStorage } from '../hooks/useAsyncStorage'; 
import { Theme } from '../types/Theme';

type ThemeType = 'dark' | 'light' | null | undefined;

interface ThemeProvider {
  theme: Theme,
  themeType: ThemeType,
  isDarkTheme: boolean,
  setThemeType: React.Dispatch<React.SetStateAction<ThemeType>>
  toggleTheme: () => void;
  themeIcons: any;
}

export const ThemeContext = createContext<ThemeProvider>({
  theme: lightTheme,
  themeType: 'light',
  isDarkTheme: false,
  setThemeType: () => {},
  toggleTheme: () => {},
  themeIcons: {},
}) 

type Props = {
  children: ReactNode;
};

export const ThemeProvider: FC<Props> = ({ children }) => {
  const colorScheme = useColorScheme();
  const [themeType, setThemeType] = useAsyncStorage<ThemeType>('theme', colorScheme || 'light');
  const isDarkTheme = themeType === 'dark';
  const toggleTheme = () => {
    setThemeType(isDarkTheme ? 'light' : 'dark');
  };
  const theme = useMemo(() => isDarkTheme ? darkTheme : lightTheme, [isDarkTheme]);

  const themeContextValue: ThemeProvider = {
    theme,
    themeType,
    isDarkTheme,
    setThemeType,
    toggleTheme,
    themeIcons: {},
  }

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
