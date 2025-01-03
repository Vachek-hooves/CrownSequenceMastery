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

const WelcomeScreen = ({navigation}) => {
  return (
    <ImageBackground
      source={require('../../assets/image/bg/bg.png')}
      style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>
          Welcome to{'\n'}Crowns Sequence{'\n'}Mastery
        </Text>

        <Text style={styles.subtitle}>
          Memorize the light. Repeat the pattern. Claim the crown.
        </Text>

        <View style={styles.instructionsContainer}>
          <Text style={styles.sectionTitle}>💠 How to Play:</Text>
          <Text style={styles.instruction}>
            1. Watch the Sequence – Crowns will light up in order.
          </Text>
          <Text style={styles.instruction}>
            2. Repeat It – Tap the crowns in the same sequence.
          </Text>
          <Text style={styles.instruction}>
            3. Keep Going – Each round adds more steps.
          </Text>
        </View>

        <View style={styles.hintsContainer}>
          <Text style={styles.sectionTitle}>💠 Hints:</Text>
          <Text style={styles.instruction}>
            Tap the hint button to replay the sequence. You have 3 per game –
            use them wisely!
          </Text>
        </View>

        <View style={styles.rewardsContainer}>
          <Text style={styles.sectionTitle}>💠 Unlock Rewards:</Text>
          <Text style={styles.instruction}>
            Earn points to unlock new crowns and backgrounds as you progress.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('NameScreen')}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FCF8EA',
    textAlign: 'center',
    marginTop: 40,
    lineHeight: 40,
    textShadowColor: 'rgba(252, 248, 234, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#FCF8EA',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
    textShadowColor: 'rgba(252, 248, 234, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FCF8EA',
    marginBottom: 10,
    textShadowColor: 'rgba(252, 248, 234, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  instruction: {
    fontSize: 20,
    color: '#FCF8EA',
    marginBottom: 8,
    paddingLeft: 20,
    textShadowColor: 'rgba(252, 248, 234, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  nextButton: {
    backgroundColor: '#FFE5B4',
    padding: 15,
    borderRadius: 25,
    width: '100%',
    marginBottom: 30,
  },
  nextButtonText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});
