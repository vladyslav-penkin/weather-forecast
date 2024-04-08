import { FC } from 'react';
import './i18n/i18n.config';
import { View } from './styles';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import { LocationsScreen } from './screens/LocationsScreen';
import { HomeStack } from './stacks/HomeStack';
import { SettingsStack } from './stacks/SettingsStack';
import { ThemeProvider } from './contexts/ThemeContext';
import { LocationsProvider } from './contexts/LocationsContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { useTheme } from './hooks/useTheme';
import { IoniconsIcons, MaterialIcons } from './types/Icons';

const Tab = createBottomTabNavigator();

const TabGroup: FC = () => {
  const { theme: { colors } } = useTheme();
  const { t } = useTranslation();
  
  return (
    <Tab.Navigator initialRouteName="Weather" screenOptions={({ route }) => ({
      tabBarStyle: {
        backgroundColor: colors.bgColor,
        height: 60,
        paddingTop: 5,
        paddingBottom: 5,
        borderWidth: 0,
        borderColor: 'transparent',
      },
      tabBarInactiveTintColor: colors.secondaryColor,
      tabBarActiveTintColor: colors.activeColor,
      tabBarIcon: ({ color, focused, size }: { color: string, focused: boolean, size: number}) => {
        if (route.name === 'Locations') {
          return <Ionicons name={focused ? IoniconsIcons.LOCATION : IoniconsIcons.LOCATIONLINE} size={size} color={color} />
        } else if (route.name === 'Weather') {
          return <MaterialCommunityIcons name={MaterialIcons.WEATHER} size={size} color={color} />
        } else if (route.name === 'Settings') {
          return <Ionicons name={focused ? IoniconsIcons.SETTINGS : IoniconsIcons.SETTINGSCHECK} size={size} color={color} />
        }
      },
    })}>
      <Tab.Screen 
        name="Locations" 
        component={LocationsScreen}
        options={{
          title: t('location'),
          headerTitle: t('location'),
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: colors.bgColor, borderBottomWidth: 0 },
          headerTintColor: colors.primaryColor,
        }} 
      />
      <Tab.Screen 
        name="Weather"
        component={HomeStack}
        options={{ headerTitle: t('home'), title: t('home'), headerShown: false }}
      />
      <Tab.Screen 
        name="Settings" 
        options={{ headerShown: false , title: t('settings') }} 
        component={SettingsStack}
      />
    </Tab.Navigator>
  );
};

const App: FC = () => {
  const { theme: { colors }, isDarkTheme } = useTheme();
  const [fontsLoaded] = useFonts({
    'NunitoMedium': require('./assets/fonts/Nunito-Medium.ttf'),
  });

  if (!fontsLoaded) return null;
  return (
    <View>
      <StatusBar
        barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
        backgroundColor={colors.bgColor}
      />
      <ThemeProvider>
        <LocationsProvider>
          <SettingsProvider>
            <NavigationContainer>
              <TabGroup />
            </NavigationContainer>
          </SettingsProvider>
        </LocationsProvider>
      </ThemeProvider>
    </View>
  );
}

export default App;