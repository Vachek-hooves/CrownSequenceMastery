import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React from 'react';
import MainLayout from '../../components/layout/MainLayout';

const WelcomeScreen = ({navigation}) => {
  return (
    <MainLayout>
      {/* <ImageBackground
        source={require('../../assets/image/bg/bg.png')}
        style={styles.container}
        // blurRadius={100}
      > */}
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>
            Welcome to{'\n'}Crowns Sequence{'\n'}Mastery
          </Text>

          <Text style={styles.subtitle}>Your path to mastery begins now!</Text>

          <View style={styles.instructionsContainer}>
            <Text style={styles.sectionTitle}>
              💠 Set Goals – Break down ambitions into daily tasks and track
              your progress.
            </Text>
          </View>

          <View style={styles.hintsContainer}>
            <Text style={styles.sectionTitle}>
              💠 Challenge Yourself – Enjoy a fun mini-game
            </Text>
          </View>

          <View style={styles.rewardsContainer}>
            <Text style={styles.sectionTitle}>💠 Achieve. Play. Master.</Text>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('NameScreen')}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      {/* </ImageBackground> */}
    </MainLayout>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#000',
  },
  content: {
    // flex: 1,
    padding: 20,
    justifyContent: 'space-between',
    marginTop: 100,
  },
  title: {
    fontSize: 44,
    fontWeight: 'bold',
    // color: '#FCF8EA',
    color: '#A8E6CF',
    textAlign: 'center',
    marginTop: 40,
    lineHeight: 40,
    textShadowColor: 'rgba(252, 248, 234, 0.5)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 18,
    // color: '#FCF8EA',
    color: '#A8E6CF',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
    textShadowColor: 'rgba(252, 248, 234, 0.5)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 8,
  },
  instructionsContainer: {
    marginBottom: 20,
  },
  hintsContainer: {
    marginBottom: 20,
  },
  rewardsContainer: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    // color: '#FCF8EA',
    color: '#A8E6CF',
    marginBottom: 10,
    textShadowColor: 'rgba(252, 248, 234, 0.5)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 8,
  },
  instruction: {
    fontSize: 22,
    color: '#FCF8EA',
    color: '#FCF8EA',
    marginBottom: 8,
    paddingLeft: 20,
    textShadowColor: 'rgba(252, 248, 234, 0.3)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 5,
  },
  nextButton: {
    // backgroundColor: '#FFE5B4',
    backgroundColor: '#4ECDC4',
    padding: 15,
    borderRadius: 25,
    width: '90%',
    marginBottom: '20%',
    alignSelf: 'center',
  },
  nextButtonText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});
