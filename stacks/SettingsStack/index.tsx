import { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { SettingsScreen } from '../../screens/SettingsScreen';
import { AboutAppScreen } from '../../screens/AboutAppScreen';
import { useTheme } from '../../hooks/useTheme';

const Stack = createNativeStackNavigator();

export const SettingsStack: FC = () => {
  const { theme: { colors } } = useTheme();
  const { t } = useTranslation();

  return (
    <Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: colors.bgColor },
      headerTitleStyle: { color: colors.primaryColor },
      headerTitleAlign: 'center',
    }}>
      <Stack.Screen 
        name="Home" 
        options={{ title: t('settings') }}
        component={SettingsScreen}
      />
      <Stack.Screen 
        name="AboutApp"
        options={{ title: t('aboutApp'), headerTintColor: colors.activeColor }}
        component={AboutAppScreen}
      />
    </Stack.Navigator>
  );
};