import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  Animated,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {CROWNS} from '../../data/CustomizeCrown';
import {useAppContext} from '../../store/context';
import HintIcon from '../../components/Icons/HintIcon';

const CrownGameScreen = ({navigation}) => {
  const {isGameSoundEnable} = useAppContext();
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [hintsLeft, setHintsLeft] = useState(3);
  const [activeCrown, setActiveCrown] = useState(null);
  const [glowAnimations] = useState(
    CROWNS[0].crowns.map(() => new Animated.Value(0)),
  );

  // Initialize game
  useEffect(() => {
    startNewRound();
  }, []);

  // Generate new sequence
  const generateSequence = useCallback(() => {
    const newStep = Math.floor(Math.random() * 4);
    setSequence(prev => [...prev, newStep]);
  }, []);

  // Play crown animation
  const animateCrown = useCallback(
    (index, duration = 500) => {
      Animated.sequence([
        Animated.timing(glowAnimations[index], {
          toValue: 1,
          duration: duration,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnimations[index], {
          toValue: 0,
          duration: duration,
          useNativeDriver: true,
        }),
      ]).start();

      if (isGameSoundEnable) {
        // Play sound effect here
      }
    },
    [glowAnimations, isGameSoundEnable],
  );

  // Play sequence
  const playSequence = useCallback(async () => {
    setIsPlaying(true);
    for (let i = 0; i < sequence.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      animateCrown(sequence[i]);
    }
    setIsPlaying(false);
  }, [sequence, animateCrown]);

  // Start new round
  const startNewRound = useCallback(() => {
    setUserSequence([]);
    generateSequence();
    setTimeout(() => {
      playSequence();
    }, 1000);
  }, [generateSequence, playSequence]);

  // Handle crown press
  const handleCrownPress = index => {
    if (isPlaying) return;

    animateCrown(index, 300);
    const newUserSequence = [...userSequence, index];
    setUserSequence(newUserSequence);

    // Check if the move was correct
    if (
      newUserSequence[newUserSequence.length - 1] !==
      sequence[newUserSequence.length - 1]
    ) {
      Alert.alert('Game Over', `Final Score: ${score}`, [
        {
          text: 'Try Again',
          onPress: () => {
            setScore(0);
            setSequence([]);
            setHintsLeft(3);
            startNewRound();
          },
        },
        {text: 'Main Menu', onPress: () => navigation.navigate('MainScreen')},
      ]);
      return;
    }

    // Check if sequence is complete
    if (newUserSequence.length === sequence.length) {
      setScore(prev => prev + sequence.length);
      setTimeout(startNewRound, 500);
    }
  };

  // Use hint
  const useHint = () => {
    if (hintsLeft > 0 && !isPlaying) {
      setHintsLeft(prev => prev - 1);
      playSequence();
    }
  };

  // Debug log to check CROWNS data
  console.log('Crown images:', CROWNS[0].crowns.map(crown => crown));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={useHint}>
          <LinearGradient
            colors={['#FFEA9E', '#FCF8EA']}
            style={[styles.iconButton, styles.buttonShadow]}>
            <Text style={styles.hintCount}>{hintsLeft}</Text>
          </LinearGradient>
        </TouchableOpacity>
        <HintIcon useHint={useHint} />

        <Text style={styles.score}>{score}</Text>

        <TouchableOpacity onPress={() => navigation.navigate('MainScreen')}>
          <LinearGradient
            colors={['#FFEA9E', '#FCF8EA']}
            style={[styles.iconButton, styles.buttonShadow]}>
            <Image
              source={require('../../assets/image/icons/homeIcon.png')}
              style={styles.icon}
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <Text style={{color: 'white'}}>Crown </Text>

      <View style={styles.gameContainer}>
        {CROWNS[0].crowns.map((crown, index) => (
          <Animated.View
            key={index}
            style={[
              styles.crownContainer,
              {
                transform: [{
                  scale: glowAnimations[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.2],
                  }),
                }],
                opacity: glowAnimations[index].interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.7],
                }),
              },
            ]}>
            <TouchableOpacity
              onPress={() => handleCrownPress(index)}
              disabled={isPlaying}
              style={styles.crownButton}>
              <Image 
                source={crown} 
                style={styles.crown}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
  },
  iconButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonShadow: {
    shadowColor: '#FCF8EA',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  icon: {
    width: 24,
    height: 24,
  },
  score: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FCF8EA',
    textShadowColor: 'rgba(252, 248, 234, 0.5)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
  },
  hintCount: {
    position: 'absolute',
    top: 5,
    left: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  gameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    padding: 20,
  },
  crownContainer: {
    width: '40%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  crownButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  crown: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
});

export default CrownGameScreen;
