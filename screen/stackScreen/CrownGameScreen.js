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
  const [activeIndex, setActiveIndex] = useState(null);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const [glowAnimations] = useState(
    CROWNS[0].crowns.map(() => new Animated.Value(0)),
  );

  // Initialize game
  useEffect(() => {
    startNewGame();
  }, []);

  // Start new game
  const startNewGame = () => {
    setSequence([]);
    setUserSequence([]);
    setScore(0);
    setHintsLeft(3);
    setIsGameStarted(true);
    startNewRound();
  };

  // Generate new sequence
  const generateSequence = useCallback(() => {
    const newStep = Math.floor(Math.random() * 4);
    return [...sequence, newStep];
  }, [sequence]);

  // Play crown animation
  const animateCrown = useCallback((index, duration = 500) => {
    setActiveIndex(index);
    
    return new Promise(resolve => {
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
      ]).start(() => {
        setActiveIndex(null);
        resolve();
      });

      if (isGameSoundEnable) {
        // Play sound effect here
      }
    });
  }, [glowAnimations, isGameSoundEnable]);

  // Play sequence
  const playSequence = useCallback(async (newSequence) => {
    setIsPlaying(true);
    
    // Clear any existing timeout
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Play each crown in sequence
    for (let i = 0; i < newSequence.length; i++) {
      await animateCrown(newSequence[i], 500);
      await new Promise(resolve => setTimeout(resolve, 300)); // Gap between animations
    }
    
    setIsPlaying(false);
  }, [animateCrown]);

  // Start new round
  const startNewRound = useCallback(async () => {
    const newSequence = generateSequence();
    setSequence(newSequence);
    setUserSequence([]);
    await playSequence(newSequence);
  }, [generateSequence, playSequence]);

  // Handle crown press
  const handleCrownPress = async (index) => {
    if (isPlaying) return;

    await animateCrown(index, 300);
    const newUserSequence = [...userSequence, index];
    setUserSequence(newUserSequence);

    // Check if the move was correct
    if (newUserSequence[newUserSequence.length - 1] !== sequence[newUserSequence.length - 1]) {
      Alert.alert('Game Over', `Final Score: ${score}`, [
        {
          text: 'Try Again',
          onPress: startNewGame,
        },
        {
          text: 'Main Menu',
          onPress: () => navigation.navigate('MainScreen'),
        },
      ]);
      return;
    }

    // Check if sequence is complete
    if (newUserSequence.length === sequence.length) {
      setScore(prev => prev + sequence.length);
      setTimeout(() => {
        startNewRound();
      }, 1000);
    }
  };

  // Use hint
  const useHint = async () => {
    if (hintsLeft > 0 && !isPlaying) {
      setHintsLeft(prev => prev - 1);
      await playSequence(sequence);
    } else if (hintsLeft === 0) {
      Alert.alert('No Hints Left', 'You have used all your hints!');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={useHint} disabled={isPlaying}>
          <LinearGradient
            colors={['#FFEA9E', '#FCF8EA']}
            style={[styles.iconButton, styles.buttonShadow]}>
            <Text style={styles.hintCount}>{hintsLeft}</Text>
            <HintIcon />
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.score}>{score}</Text>

        <TouchableOpacity 
          onPress={() => {
            Alert.alert(
              'Leave Game',
              'Are you sure you want to exit? Your progress will be lost.',
              [
                {text: 'Cancel', style: 'cancel'},
                {text: 'Exit', onPress: () => navigation.navigate('MainScreen')},
              ]
            );
          }}>
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

      {!isGameStarted ? (
        <View style={styles.startContainer}>
          <Text style={styles.startText}>Watch the sequence and repeat it!</Text>
          <TouchableOpacity onPress={startNewGame} style={styles.startButton}>
            <Text style={styles.startButtonText}>Start Game</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.gameContainer}>
          {CROWNS[0].crowns.map((crown, index) => (
            <Animated.View
              key={index}
              style={[
                styles.crownContainer,
                activeIndex === index && styles.activeCrownContainer,
                {
                  transform: [{
                    scale: glowAnimations[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.2],
                    }),
                  }],
                },
              ]}>
              <TouchableOpacity
                onPress={() => handleCrownPress(index)}
                disabled={isPlaying}
                style={[
                  styles.crownButton,
                  activeIndex === index && styles.activeCrownButton,
                ]}>
                <Image 
                  source={crown} 
                  style={styles.crown}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      )}
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
    borderRadius: 20,
    overflow: 'hidden',
  },
  activeCrownContainer: {
    backgroundColor: '#FCF8EA',
  },
  crownButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  activeCrownButton: {
    backgroundColor: '#FCF8EA',
  },
  crown: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
  startContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startText: {
    color: '#FCF8EA',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: 'rgba(252, 248, 234, 0.5)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
  },
  startButton: {
    backgroundColor: '#FCF8EA',
    padding: 15,
    borderRadius: 25,
    width: 200,
  },
  startButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CrownGameScreen;
