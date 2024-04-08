import { FC } from 'react';
import { WeatherDailyListContainer } from './styles';
import { FlatList } from 'react-native';
import { WeatherDailyInfo } from '../../components/WeatherDailyInfo';

interface WeatherDailyInfo {
  title: string;
  description: string;
  icon: string;
}

interface Props {
  dailyInfo: WeatherDailyInfo[];
}

export const WeatherDailyList: FC<Props> = ({ dailyInfo }) => {
  return (
    <WeatherDailyListContainer>
      <FlatList
        data={dailyInfo}
        numColumns={2}
        renderItem={({ item: { title, description, icon } }) => (
          <WeatherDailyInfo title={title} description={description} icon={icon} />
        )}
        keyExtractor={(item) => item.title}
      />
    </WeatherDailyListContainer>
  );
};