import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';


const NameScreen = ({navigation}) => {
  const [nickname, setNickname] = useState('');

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
          />
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate('TabNavigation')}>
          <Text style={styles.startButtonText}>Start</Text>
        </TouchableOpacity>
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FCF8EA',
    textShadowColor: 'rgba(252, 248, 234, 0.5)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#FCF8EA',
    textShadowColor: 'rgba(252, 248, 234, 0.5)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 8,
    marginVertical: 10,
  },
  inputContainer: {
    marginTop: 40,
  },
  input: {
    backgroundColor: 'rgba(128, 128, 128, 0.3)',
    borderRadius: 25,
    padding: 15,
    fontSize: 16,
    color: '#FCF8EA',
  },
  startButton: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(128, 128, 128, 0.3)',
    padding: 15,
    borderRadius: 25,
  },
  startButtonText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FCF8EA',
  },
});
