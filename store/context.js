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
  const [tasks, setTasks] = useState([]);

  const UNLOCK_COST = 200; // Define cost constant

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

      // Load tasks
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error('Error loading data:', error);
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
      if (totalScore >= UNLOCK_COST && !unlockedCrowns[index]) {
        // Deduct points from total score
        const newTotalScore = totalScore - UNLOCK_COST;
        await AsyncStorage.setItem('totalScore', newTotalScore.toString());
        setTotalScore(newTotalScore);

        // Unlock the crown
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
      if (totalScore >= UNLOCK_COST && !unlockedBackgrounds[index]) {
        // Deduct points from total score
        const newTotalScore = totalScore - UNLOCK_COST;
        await AsyncStorage.setItem('totalScore', newTotalScore.toString());
        setTotalScore(newTotalScore);

        // Unlock the background
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
      console.log('Saving new results:', newResults); 
      
      await AsyncStorage.setItem('gameResults', JSON.stringify(newResults));
      setGameResults(newResults);
    } catch (error) {
      console.error('Error saving game result:', error);
    }
  };

  // Add new task
  const addTask = async (newTask) => {
    try {
      const taskWithId = {
        id: Date.now(),
        ...newTask,
        createdAt: new Date().toISOString(),
      };

      const updatedTasks = [...tasks, taskWithId];
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
      return true;
    } catch (error) {
      console.error('Error adding task:', error);
      return false;
    }
  };

  // Update task progress
  const updateTaskProgress = async (taskId, progress) => {
    try {
      const updatedTasks = tasks.map(task => 
        task.id === taskId ? {...task, progress} : task
      );
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
      return true;
    } catch (error) {
      console.error('Error updating task:', error);
      return false;
    }
  };

  // Update task claimed status
  const updateTaskClaimed = async (taskId, isClaimed) => {
    try {
      const updatedTasks = tasks.map(task => 
        task.id === taskId ? {...task, isClaimed} : task
      );
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
      return true;
    } catch (error) {
      console.error('Error updating task:', error);
      return false;
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
      return true;
    } catch (error) {
      console.error('Error deleting task:', error);
      return false;
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
    tasks,
    addTask,
    updateTaskProgress,
    updateTaskClaimed,
    deleteTask,
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
