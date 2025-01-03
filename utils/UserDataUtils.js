import AsyncStorage from '@react-native-async-storage/async-storage';

export const getNickname = async () => {
  try {
    const nickname = await AsyncStorage.getItem('userNickname');
    return nickname;
  } catch (error) {
    console.error('Error getting nickname:', error);
    return null;
  }
};
