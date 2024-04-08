import { FC, useState } from 'react';
import { FlatList, TouchableWithoutFeedback } from 'react-native';
import { SettingsScreenBackground, SettingsScreenContainer } from './styles';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { SwitchButton } from '../../components/SwitchButton';
import { DropDown } from '../../components/DropDown';
import { SettingsCard } from '../../components/SettingsCard';
import { SettingsInfo } from '../../components/SettingsInfo';
import { BasicSwitch } from '../../components/BasicSwitch';
import { SettingsButton } from '../../components/SettingsButton';
import { Warning } from '../../components/Warning';
import { useTheme } from '../../hooks/useTheme';
import { useSettings } from '../../hooks/useSettings';
import { useLocations } from '../../hooks/useLocations';
import { useAnimatedBackground } from '../../hooks/useAnimatedBackground';
import { WarningState } from '../../types/WarningState';

type NavigationProp = StackNavigationProp<ParamListBase, 'SettingsScreen'>;

export const SettingsScreen: FC = () => {
  const { theme: { colors }, toggleTheme, setThemeType, isDarkTheme } = useTheme();
  const { settings: { details, degree }, setSettings } = useSettings();
  const { setLocations, setCurrentLocation } = useLocations();
  const navigation: NavigationProp = useNavigation();
  const { t, i18n } = useTranslation();
  const [isOpen, setOpen] = useState<boolean>(false);
  const [dropDownId, setDropDownId] = useState<string>('');
  const [isToggled, setToggle] = useState<boolean>(isDarkTheme);
  const [warning, setWarning] = useState<WarningState>({
    isOpen: false, title: '', buttonTitle: '', onSubmit: () => {}
  });
  const language = t('lang');

  const toggleDetails = () => setSettings(prev => ({ ...prev, details: !details }));
  const onPress = () => {
    setToggle(!isToggled);
    toggleTheme();
  };
  const onDelete = () => {
    setWarning(prev => ({
      ...prev,
      isOpen: true,
      title: t('clearListWarning'),
      buttonTitle: t('delete'),
      onSubmit: () => {
        setWarning(prev => ({ ...prev, isOpen: false }));
        setCurrentLocation(null);
        setLocations([]);
      },
    }))
  };
  const onReset = () => {
    setWarning(prev => ({
      ...prev,
      isOpen: true,
      title: t('resetSettingsWarning'),
      buttonTitle: t('reset'),
      onSubmit: () => {
        setWarning(prev => ({ ...prev, isOpen: false }))
        setToggle(false);
        setThemeType('light');
        setSettings(prev => ({ ...prev, details: false }));
        i18n.changeLanguage('eng');
      }
    }))
  };

  const dropDownList = [
    { title: t('eng'), item: 'eng' },
    { title: t('ru'), item: 'ru' },
    { title: t('uk'), item: 'uk' }
  ];
  const settingsButtons = [
    { title: t('aboutApp'), onPress: () => navigation.navigate('AboutApp') },
    { title: t('clearListLocations'), onPress: onDelete },
    { title: t('resetSettings'), isWarning: true, onPress: onReset },
  ];

  const animatedStyle = useAnimatedBackground(Boolean(dropDownId));

  return (
    <TouchableWithoutFeedback onPress={() => setDropDownId('')}>
      <SettingsScreenContainer color={colors.bgColor}>
        <SettingsScreenBackground style={animatedStyle} />
        <SettingsCard>
          <SettingsInfo title={t('degrees')}>
            <SwitchButton
              isToggled={degree}
              onPress={() => setSettings(prev => ({ ...prev, degree: !degree }))}
              defaultTitle={'°C'}
              activeTitle={'°F'}
            />
          </SettingsInfo>
        </SettingsCard>

        <SettingsCard>
          <SettingsInfo title={t('theme')}>
            <SwitchButton
              isToggled={isToggled}
              onPress={onPress}
              defaultTitle={t('light')}
              activeTitle={t('dark')}
            />
          </SettingsInfo>
          <SettingsInfo title={language}>
            <DropDown
              currentItem={i18n.language}
              onPress={(item: string) => {
                i18n.changeLanguage(item);
                setSettings(prev => ({ ...prev, lang: item }));
              }}
              isIncludes={dropDownId === language}
              dropDownId={language}
              setDropDownId={setDropDownId}
              dropDownList={dropDownList}
            />
          </SettingsInfo>
          <SettingsInfo title={t('showDetails')}>
            <BasicSwitch isToggled={details} onPress={toggleDetails} />
          </SettingsInfo>
        </SettingsCard>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={settingsButtons}
          renderItem={({ item: { title, isWarning, onPress } }) => (
            <SettingsButton title={title} isWarning={isWarning} onPress={onPress} />
          )}
          keyExtractor={(item) => item.title}
        />
        <Warning warning={warning} setWarning={setWarning} />
      </SettingsScreenContainer>
    </TouchableWithoutFeedback>
  );
}