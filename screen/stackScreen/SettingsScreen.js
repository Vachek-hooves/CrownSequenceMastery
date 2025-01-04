import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import CustomSwitch from '../../components/UI/CustomSwitch';
import {
  pauseBackgroundMusic,
  playBackgroundMusic,
} from '../../components/Sound/SetUp';
import {useAppContext} from '../../store/context';

const SettingsScreen = () => {
  const {
    isMusicEnable,
    setIsMusicEnable,
    isGameSoundEnable,
    setIsGameSoundEnable,
  } = useAppContext();

  const handleSoundToggle = async value => {};

  const handleMusicToggle = async value => {
    setIsMusicEnable(value);
    if (value) {
      await playBackgroundMusic();
    } else {
      pauseBackgroundMusic();
    }
  };
  console.log(isMusicEnable);

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
              value={isMusicEnable}
              onValueChange={handleMusicToggle}
            />
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingText}>Game Sound</Text>
            <CustomSwitch
              value={isGameSoundEnable}
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
