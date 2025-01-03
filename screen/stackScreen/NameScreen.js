import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Image,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NameScreen = ({navigation}) => {
  const [nickname, setNickname] = useState('');
  const isValidNickname = nickname.trim().length > 2;

  const saveNickname = async () => {
    try {
      if (!isValidNickname) {
        Alert.alert('Error', 'Nickname must be at least 3 characters');
        return;
      }

      await AsyncStorage.setItem('userNickname', nickname.trim());
      navigation.navigate('MainScreen');
    } catch (error) {
      console.error('Error saving nickname:', error);
      Alert.alert('Error', 'Failed to save nickname. Please try again.');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/image/bg/bg.png')}
      style={styles.container}>
      <SafeAreaView style={styles.content}>
        <View style={styles.headerRow}>
          <LinearGradient
            colors={['#FFEA9E', '#FCF8EA']}
            style={[styles.homeButtonGradient, styles.homeButtonShadow]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}>
            <TouchableOpacity
              style={styles.homeButton}
              onPress={() => navigation.goBack()}>
              <Image
                source={require('../../assets/image/icons/homeIcon.png')}
                style={styles.homeIcon}
              />
            </TouchableOpacity>
          </LinearGradient>

          <Text style={styles.title}>Nickname</Text>
        </View>

        <Text style={styles.subtitle}>
          Every ruler needs a name. Enter yours to begin the challenge
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your nickname"
            placeholderTextColor="rgba(252, 248, 234, 0.5)"
            value={nickname}
            onChangeText={setNickname}
            maxLength={30}
          />
        </View>

        {isValidNickname ? (
          <LinearGradient
            colors={['#FFEA9E', '#FCF8EA']}
            style={[styles.startButton, styles.startButtonShadow]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}>
            <TouchableOpacity onPress={saveNickname}>
              <Text style={styles.startButtonTextActive}>Start</Text>
            </TouchableOpacity>
          </LinearGradient>
        ) : (
          <TouchableOpacity
            style={styles.startButton}
            onPress={() =>
              Alert.alert('Error', 'Nickname must be at least 3 characters')
            }>
            <Text style={styles.startButtonText}>Start</Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default NameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    padding: 40,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  homeButtonGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeButtonShadow: {
    shadowColor: '#FCF8EA',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5, // for Android
  },
  homeButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FCF8EA',
    textShadowColor: 'rgba(252, 248, 234, 0.5)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
    paddingLeft:'10%'
    
  },
  subtitle: {
    fontSize: 24,
    color: '#FCF8EA',
    textShadowColor: 'rgba(252, 248, 234, 0.5)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 8,
    marginVertical: 20,
  },
  inputContainer: {
    marginTop: 40,
  },
  input: {
    backgroundColor: 'rgba(128, 128, 128, 0.3)',
    borderRadius: 25,
    paddingVertical: 18,
    fontSize:20,
    color: '#FCF8EA',
    paddingHorizontal:20
  },
  startButton: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(128, 128, 128, 0.3)',
    // padding: 15,
    borderRadius: 25,
  },
  startButtonShadow: {
    shadowColor: '#FCF8EA',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  startButtonText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FCF8EA',
    padding: 15,
  },
  startButtonTextActive: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000', // Dark text for better contrast on light gradient
    padding: 15,
  },
});
