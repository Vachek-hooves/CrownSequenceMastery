import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomSwitch from '../../components/UI/CustomSwitch';

const SettingsScreen = () => {
  const [backgroundMusic, setBackgroundMusic] = useState(true);
  const [gameSound, setGameSound] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const music = await AsyncStorage.getItem('backgroundMusic');
      const sound = await AsyncStorage.getItem('gameSound');
      
      if (music !== null) setBackgroundMusic(JSON.parse(music));
      if (sound !== null) setGameSound(JSON.parse(sound));
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleMusicToggle = async (value) => {
    try {
      await AsyncStorage.setItem('backgroundMusic', JSON.stringify(value));
      setBackgroundMusic(value);
      // Add your music control logic here
    } catch (error) {
      console.error('Error saving music setting:', error);
    }
  };

  const handleSoundToggle = async (value) => {
    try {
      await AsyncStorage.setItem('gameSound', JSON.stringify(value));
      setGameSound(value);
      // Add your sound control logic here
    } catch (error) {
      console.error('Error saving sound setting:', error);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/image/bg/bg.png')}
      style={styles.container}>
      <SafeAreaView style={styles.content}>
        <Text style={styles.title}>Settings</Text>

        <View style={styles.settingsContainer}>
          <View style={styles.settingRow}>
            <Text style={styles.settingText}>Background Music</Text>
            <CustomSwitch
              value={backgroundMusic}
              onValueChange={handleMusicToggle}
            />
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingText}>Game Sound</Text>
            <CustomSwitch
              value={gameSound}
              onValueChange={handleSoundToggle}
            />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FCF8EA',
    marginBottom: 40,
    textAlign: 'center',
    textShadowColor: 'rgba(252, 248, 234, 0.5)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
  },
  settingsContainer: {
    paddingHorizontal: 20,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    paddingVertical: 10,
  },
  settingText: {
    fontSize: 24,
    color: '#FCF8EA',
    textShadowColor: 'rgba(252, 248, 234, 0.3)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 5,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
