import { DefaultTheme, DarkTheme } from '@react-navigation/native';

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    card: '#ffffff',
    green: '#5bc54a',
    red: 'red',
    bgColorBlur: '#ffffff99',
    bgColor: '#f3f4f7',
    tabIconActive: '#131E32',
    activeColor: '#3377ff',
    borderColor: '#d4d4de4d',
    accentColor: '#d580ff',
    daylightColor: '#90929e',
    elementsColor: '#ffffff',
    primaryColor: '#131E32',
    secondaryColor: '#90929E',
    humidityColor: '#6a9cff',
    cancelColor: '#f56b47',
    locationColor: '#6892B9',
    loadingColor: '#ffffff',
    cardColors: ['#ffffff', '#ffffff'],
    temperatureColors: ['#abacb2', '#131E32'],
    daylightColors: ['#bebebe4d', '#bebebe00'],
  }
}

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    card: '#1b1f3b',
    green: '#5bc54a',
    red: 'red',
    bgColor: '#131E32',
    bgColorBlur: '#131e32cc',
    tabIconActive: '#e6a326',
    activeColor: '#feb800',
    borderColor: '#132846',
    accentColor: '#d580ff',
    daylightColor: '#d7f4fe',
    elementsColor: '#131E32',
    primaryColor: '#FFFFFF',
    secondaryColor: '#6892B9',
    humidityColor: '#3fd5fe',
    cancelColor: '#f56b47',
    locationColor: '#6892B9',
    loadingColor: '#ffffff11',
    cardColors: ['#192D52', '#112645'],
    temperatureColors: ['#6892B9', '#F6F6F6'],
    daylightColors: ['#0F3C5C', '#0f3c5c00'],
  }
}