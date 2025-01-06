import {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CROWNS} from '../data/CustomizeCrown';

export const AppContext = createContext({});

export const ContextProvider = ({children}) => {
  const [isMusicEnable, setIsMusicEnable] = useState(true);
  const [isGameSoundEnable, setIsGameSoundEnable] = useState(true);
  const [highScore, setHighScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [nickname, setNickname] = useState('');
  const [selectedCrownSet, setSelectedCrownSet] = useState(0);
  const [unlockedCrowns, setUnlockedCrowns] = useState([true, false, false, false]); // First crown always unlocked
  const [selectedBackground, setSelectedBackground] = useState(0);
  const [unlockedBackgrounds, setUnlockedBackgrounds] = useState([true, false, false, false]);
  const [gameResults, setGameResults] = useState([]);


  // Load saved data when app starts
  useEffect(() => {
    loadSavedData();
  }, []);

  const loadSavedData = async () => {
    try {
      const savedHighScore = await AsyncStorage.getItem('highScore');
      const savedTotalScore = await AsyncStorage.getItem('totalScore');
      const savedNickname = await AsyncStorage.getItem('nickname');
      const savedUnlockedCrowns = await AsyncStorage.getItem('unlockedCrowns');
      const savedSelectedCrownSet = await AsyncStorage.getItem('selectedCrownSet');
      const savedBackground = await AsyncStorage.getItem('selectedBackground');
      const savedUnlockedBackgrounds = await AsyncStorage.getItem('unlockedBackgrounds');
      const savedResults = await AsyncStorage.getItem('gameResults');
      
      if (savedHighScore) setHighScore(parseInt(savedHighScore));
      if (savedTotalScore) setTotalScore(parseInt(savedTotalScore));
      if (savedNickname) setNickname(savedNickname);
      if (savedUnlockedCrowns) setUnlockedCrowns(JSON.parse(savedUnlockedCrowns));
      if (savedSelectedCrownSet) setSelectedCrownSet(parseInt(savedSelectedCrownSet));
      if (savedBackground) {
        setSelectedBackground(parseInt(savedBackground));
      }
      if (savedUnlockedBackgrounds) {
        setUnlockedBackgrounds(JSON.parse(savedUnlockedBackgrounds));
      }
      if (savedResults) {
        setGameResults(JSON.parse(savedResults));
      }
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

  const unlockCrown = async (index) => {
    try {
      if (totalScore >= 20 && !unlockedCrowns[index]) {
        const newUnlockedCrowns = [...unlockedCrowns];
        newUnlockedCrowns[index] = true;
        
        await AsyncStorage.setItem('unlockedCrowns', JSON.stringify(newUnlockedCrowns));
        setUnlockedCrowns(newUnlockedCrowns);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error unlocking crown:', error);
      return false;
    }
  };

  const selectBackground = async (index) => {
    try {
      await AsyncStorage.setItem('selectedBackground', index.toString());
      setSelectedBackground(index);
    } catch (error) {
      console.error('Error saving background selection:', error);
    }
  };

  const unlockBackground = async (index) => {
    try {
      if (totalScore >= 20 && !unlockedBackgrounds[index]) {
        const newUnlockedBackgrounds = [...unlockedBackgrounds];
        newUnlockedBackgrounds[index] = true;
        
        await AsyncStorage.setItem('unlockedBackgrounds', JSON.stringify(newUnlockedBackgrounds));
        setUnlockedBackgrounds(newUnlockedBackgrounds);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error unlocking background:', error);
      return false;
    }
  };

  const selectCrownSet = async (index) => {
    try {
      await AsyncStorage.setItem('selectedCrownSet', index.toString());
      setSelectedCrownSet(index);
    } catch (error) {
      console.error('Error selecting crown set:', error);
    }
  };

  const addGameResult = async (result) => {
    try {
      const newResults = [
        {
          ...result,
          date: new Date().toISOString(),
        },
        ...(gameResults || []),
      ];
      // Use console.warn for more visible logging in RN
      console.warn('Saving new results:', newResults); 
      
      await AsyncStorage.setItem('gameResults', JSON.stringify(newResults));
      setGameResults(newResults);
    } catch (error) {
      console.error('Error saving game result:', error);
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
    setSelectedCrownSet: selectCrownSet,
    unlockedCrowns,
    unlockCrown,
    crowns: CROWNS,
    selectedBackground,
    setSelectedBackground: selectBackground,
    unlockedBackgrounds,
    unlockBackground,
    gameResults,
    addGameResult,
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
