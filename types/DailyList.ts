import { ForecastListItem } from './ForecastListItem';

export interface DailyList {
  [date: string]: ForecastListItem[];
}