import {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext({});
export const ContextProvider = ({children}) => {
  const [isMusicEnable, setIsMusicEnable] = useState(true);
  const [isGameSoundEnable, setIsGameSoundEnable] = useState(true);

  const value = {
    isMusicEnable,
    setIsMusicEnable,
    isGameSoundEnable,
    setIsGameSoundEnable,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppContext Provider');
  }
  return context;
};
