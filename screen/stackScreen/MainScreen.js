import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Image,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../../components/UI/CustomButton';
import CrownIcon from '../../components/Icons/CrownIcon';
import LampIcon from '../../components/Icons/LampIcon';
import {useAppContext} from '../../store/context';

const MainScreen = ({navigation}) => {
  const {totalScore} = useAppContext();
  return (
    <ImageBackground
      source={require('../../assets/image/bg/bg.png')}
      style={styles.container}>
      <SafeAreaView style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>{totalScore}</Text>
            <CrownIcon />
          </View>
        </View>

        <ScrollView>
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
              onPress={() => navigation.navigate('CrownGameScreen')}
              variant="primary"
            />
            <CustomButton
              title="Result"
              onPress={() => navigation.navigate('ResultScreen')}
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
        </ScrollView>
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
    marginLeft: 30,
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
    width: 200,
    height: 200,
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
