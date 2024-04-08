import { useAsyncStorage } from "../hooks/useAsyncStorage";
import { FC, ReactNode, createContext } from "react";

interface Details {
  settings: { degree: boolean, details: boolean };
  setSettings: React.Dispatch<React.SetStateAction<{ degree: boolean, details: boolean }>>;
}

export const SettingsContext = createContext<Details>({ 
  settings: { degree: false, details: false },
  setSettings: () => {},
});

interface DetailsProps {
  children: ReactNode;
}

export const SettingsProvider: FC<DetailsProps> = ({ children }) => {
  const [settings, setSettings] = useAsyncStorage('settings', { degree: false, details: false });
  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};