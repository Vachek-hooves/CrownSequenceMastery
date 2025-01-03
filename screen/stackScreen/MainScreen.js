import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../../components/UI/CustomButton';

const MainScreen = ({navigation}) => {
  return (
    <ImageBackground
      source={require('../../assets/image/bg/bg.png')}
      style={styles.container}>
      <SafeAreaView style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>0</Text>
            <Image
              source={require('../../assets/image/logo/crown2.png')}
              style={styles.crownIcon}
            />
          </View>
          <LinearGradient
            colors={['#FFEA9E', '#FCF8EA']}
            style={[styles.helpButton, styles.buttonShadow]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}>
            <Text style={styles.helpText}>ℹ️</Text>
          </LinearGradient>
        </View>

        {/* Crown Image and Title */}
        <View style={styles.titleContainer}>
          <Image
            source={require('../../assets/image/logo/crown2.png')}
            style={styles.mainCrown}
          />
          <Text style={styles.title}>Crowns Sequence{'\n'}Mastery</Text>
        </View>

        {/* Navigation Buttons */}
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Play"
            onPress={() => navigation.navigate('GameScreen')}
            variant="primary"
          />
          <CustomButton
            title="Score"
            onPress={() => navigation.navigate('ScoreScreen')}
          />
          <CustomButton
            title="About"
            onPress={() => navigation.navigate('AboutScreen')}
          />
          <CustomButton
            title="Customize Challenge"
            onPress={() => navigation.navigate('CustomizeScreen')}
          />
          <CustomButton
            title="Settings"
            onPress={() => navigation.navigate('SettingsScreen')}
          />
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreText: {
    color: '#FCF8EA',
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 8,
  },
  crownIcon: {
    width: 24,
    height: 24,
  },
  helpButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonShadow: {
    shadowColor: '#FCF8EA',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  helpText: {
    fontSize: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  mainCrown: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FCF8EA',
    textAlign: 'center',
    textShadowColor: 'rgba(252, 248, 234, 0.5)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});

export default MainScreen;
