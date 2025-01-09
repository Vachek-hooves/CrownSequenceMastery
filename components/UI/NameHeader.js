import {StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect} from 'react';
import SettingsIcon from '../Icons/SettingsIcon';

const NameHeader = () => {
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    loadUserData();
  }, []);
  const loadUserData = async () => {
    try {
      const savedNickname = await AsyncStorage.getItem('userNickname');
      if (savedNickname) {
        setNickname(savedNickname);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.menuIconContainer}>
        <SettingsIcon />
      </View>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome back,</Text>
        <Text style={styles.nicknameText}>{nickname}</Text>
      </View>
    </View>
  );
};

export default NameHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  menuIconContainer: {
    // width: 50,
    // height: 50,
    // backgroundColor: '#FCF8EA',
    borderRadius: 25,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 5,
  },
  menuIcon: {
    width: 20,
    height: 20,
    backgroundColor: '#000',
  },
  welcomeContainer: {
    marginLeft: 15,
  },
  welcomeText: {
    fontSize: 18,
    color: '#FCF8EA',
    opacity: 0.8,
  },
  nicknameText: {
    fontSize: 24,
    color: '#FCF8EA',
    fontWeight: 'bold',
  },
});
