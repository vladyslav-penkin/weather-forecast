import { FC } from 'react';
import { Linking, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SettingsCard } from '../../components/SettingsCard';
import { PrimaryText } from '../../components/PrimaryText';
import { SettingsButton } from '../../components/SettingsButton';
import { useTheme } from '../../hooks/useTheme';

export const AboutAppScreen: FC = () => {
  const { t } = useTranslation();
  const { theme: { colors } } = useTheme();
  return (
    <View style={{ height: '100%', paddingTop: 10, backgroundColor: colors.bgColor }}>
      <SettingsCard>
        <PrimaryText title={t('aboutDesc1')} />
        <PrimaryText title={t('aboutDesc2')} />
        <PrimaryText title={t('aboutDesc3')} />
      </SettingsCard>
      <View style={{ paddingTop: 10 }}>
        <SettingsButton 
          title={t('sendReview')} 
          onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.fairy.weather')}
        />
      </View>
    </View>
  );
};