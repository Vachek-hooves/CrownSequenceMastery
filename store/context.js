import {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext({});

export const ContextProvider = ({children}) => {
  const [isMusicEnable, setIsMusicEnable] = useState(true);
  const [isGameSoundEnable, setIsGameSoundEnable] = useState(true);
  const [highScore, setHighScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [nickname, setNickname] = useState('');
  const [selectedCrownSet, setSelectedCrownSet] = useState(0);

  // Load saved data when app starts
  useEffect(() => {
    loadSavedData();
  }, []);

  const loadSavedData = async () => {
    try {
      const savedHighScore = await AsyncStorage.getItem('highScore');
      const savedTotalScore = await AsyncStorage.getItem('totalScore');
      const savedNickname = await AsyncStorage.getItem('nickname');
      
      if (savedHighScore) setHighScore(parseInt(savedHighScore));
      if (savedTotalScore) setTotalScore(parseInt(savedTotalScore));
      if (savedNickname) setNickname(savedNickname);
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  };

  const updateScores = async (gameScore) => {
    try {
      const newTotalScore = totalScore + gameScore;
      const newHighScore = Math.max(highScore, gameScore);
      
      await AsyncStorage.setItem('totalScore', newTotalScore.toString());
      await AsyncStorage.setItem('highScore', newHighScore.toString());
      
      setTotalScore(newTotalScore);
      setHighScore(newHighScore);
    } catch (error) {
      console.error('Error saving scores:', error);
    }
  };

  const value = {
    isMusicEnable,
    setIsMusicEnable,
    isGameSoundEnable,
    setIsGameSoundEnable,
    highScore,
    totalScore,
    nickname,
    setNickname,
    updateScores,
    selectedCrownSet,
  setSelectedCrownSet,
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
