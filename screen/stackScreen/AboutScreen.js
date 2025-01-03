import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../../components/UI/CustomButton';
import HomeIcon from '../../components/Icons/HomeIcon';
import {useNavigation} from '@react-navigation/native';

const AboutScreen = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={require('../../assets/image/bg/bg.png')}
      style={styles.container}>
      <SafeAreaView style={styles.content}>
        <HomeIcon />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>About Game</Text>

            <Text style={styles.description}>
              Crowns Sequence Mastery challenges your focus and attention to
              detail.
            </Text>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Game Overview:</Text>
              <Text style={styles.sectionText}>
                Watch as crowns light up in a specific order, and repeat the
                sequence by tapping them in the correct pattern. With each
                round, the sequence grows longer and more complex, pushing your
                ability to stay sharp and precise.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Hints & Rewards:</Text>
              <Text style={styles.sectionText}>
                If the pattern fades from view, hints are available to replay
                the sequence – but only a few times per game. Successfully
                repeating patterns earns points that unlock new crown sets and
                backgrounds, allowing you to customize the experience as you
                progress.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Challenge:</Text>
              <Text style={styles.sectionText}>
                The crowns are waiting, ready to test your skills. Can you
                follow the light and rise to mastery?
              </Text>
            </View>
          </View>

          {/* <CustomButton
            title="Back to Menu"
            onPress={() => navigation.goBack()}
            variant="primary"
          /> */}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  header: {
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    paddingVertical: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FCF8EA',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(252, 248, 234, 0.5)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
  },
  description: {
    fontSize: 18,
    color: '#FCF8EA',
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 24,
    textShadowColor: 'rgba(252, 248, 234, 0.3)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 5,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FCF8EA',
    marginBottom: 10,
    textShadowColor: 'rgba(252, 248, 234, 0.5)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 8,
  },
  sectionText: {
    fontSize: 18,
    color: '#FCF8EA',
    lineHeight: 24,
    paddingLeft: 10,
    textShadowColor: 'rgba(252, 248, 234, 0.3)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 5,
  },
});
