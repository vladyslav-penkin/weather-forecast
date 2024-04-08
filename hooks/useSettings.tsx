import { useContext } from "react";
import { SettingsContext } from "../contexts/SettingsContext";

export const useSettings = () => {
  const settingsValue = useContext(SettingsContext);
  return settingsValue;
};