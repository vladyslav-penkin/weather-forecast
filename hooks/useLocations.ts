import { useContext } from 'react';
import { LocationsContext } from '../contexts/LocationsContext';

export const useLocations = () => {
  const locationsContext = useContext(LocationsContext);
  return locationsContext;
};