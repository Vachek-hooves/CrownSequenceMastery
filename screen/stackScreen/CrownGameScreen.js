import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  Animated,
  Alert,
  Modal,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {CROWNS} from '../../data/CustomizeCrown';
import {useAppContext} from '../../store/context';
import HintIcon from '../../components/Icons/HintIcon';
import HomeIcon from '../../components/Icons/HomeIcon';

const CrownGameScreen = ({navigation}) => {
  const {
    isGameSoundEnable,
    updateScores,
    selectedCrownSet,
    crowns,nickname
  } = useAppContext();
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [hintsLeft, setHintsLeft] = useState(3);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOverModalVisible, setIsGameOverModalVisible] = useState(false);
  const [gameStatus, setGameStatus] = useState('waiting'); // 'waiting', 'watching', 'playing'
  const [statusMessage, setStatusMessage] = useState('Watch the sequence...');

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
  const animateCrown = useCallback(
    (index, duration = 500) => {
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
    },
    [glowAnimations, isGameSoundEnable],
  );

  // Play sequence
  const playSequence = useCallback(
    async newSequence => {
      setGameStatus('watching');
      setStatusMessage('Watch carefully...');
      setIsPlaying(true);

      // Clear any existing timeout
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Play each crown in sequence
      for (let i = 0; i < newSequence.length; i++) {
        await animateCrown(newSequence[i], 500);
        await new Promise(resolve => setTimeout(resolve, 300));
      }

      setIsPlaying(false);
      setGameStatus('playing');
      setStatusMessage('Your turn! Repeat the sequence');
    },
    [animateCrown],
  );

  // Start new round
  const startNewRound = useCallback(async () => {
    const newSequence = generateSequence();
    setSequence(newSequence);
    setUserSequence([]);
    await playSequence(newSequence);
  }, [generateSequence, playSequence]);

  // Handle crown press
  const handleCrownPress = async index => {
    if (isPlaying || gameStatus === 'watching') return;

    await animateCrown(index, 300);
    const newUserSequence = [...userSequence, index];
    setUserSequence(newUserSequence);

    // Check if the move was correct
    if (
      newUserSequence[newUserSequence.length - 1] !==
      sequence[newUserSequence.length - 1]
    ) {
      // Wrong sequence - Game Over
      await updateScores(score);
      setIsGameOverModalVisible(true);
      return;
    }

    // Check if sequence is complete
    if (newUserSequence.length === sequence.length) {
      setScore(prev => prev + sequence.length);
      setGameStatus('waiting');
      setStatusMessage('Great job! Watch the next sequence...');
      setTimeout(() => {
        startNewRound();
      }, 1000);
    }
  };

  // Add function to handle game restart
  const handleGameRestart = () => {
    setIsGameOverModalVisible(false);
    startNewGame();
  };

  // Add function to handle return to menu
  const handleReturnToMenu = () => {
    setIsGameOverModalVisible(false);
    navigation.navigate('MainScreen');
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

  // Get the current crown set based on selection
  const currentCrownSet = crowns[selectedCrownSet];

  const GameOverModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isGameOverModalVisible}
      onRequestClose={() => setIsGameOverModalVisible(false)}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>The Crown Fades...</Text>
          <Text style={styles.modalSubtitle}>
            The sequence is broken, but your legacy endures
          </Text>

          <View style={styles.scoreContainer}>
            <Text style={styles.finalScore}>{score}</Text>
            <Image
              source={require('../../assets/image/icons/crownIcon.png')}
              style={styles.crownIcon}
            />
          </View>

          <Text style={styles.playerName}>{nickname}</Text>
          <View style={styles.totalScoreContainer}>
            {/* <Image 
              source={require('../../assets/image/icons/trophyIcon.png')}
              style={styles.trophyIcon}
            /> */}
            <Text style={styles.totalScore}>{score}</Text>
          </View>

          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={handleReturnToMenu}>
              <Text style={styles.menuButtonText}>Menu</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tryAgainButton}
              onPress={handleGameRestart}>
              <Text style={styles.tryAgainButtonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={useHint} disabled={isPlaying}>
          <View style={styles.iconCircle}>
            <LinearGradient
              colors={['#FFEA9E', '#FCF8EA']}
              style={[styles.iconButton, styles.buttonShadow]}>
              <Text style={styles.hintCount}>{hintsLeft}</Text>
              <HintIcon />
            </LinearGradient>
          </View>
        </TouchableOpacity>

        <Text style={styles.score}>{score}</Text>

        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Leave Game',
              'Are you sure you want to exit? Your progress will be lost.',
              [
                {text: 'Cancel', style: 'cancel'},
                {
                  text: 'Exit',
                  onPress: () => navigation.navigate('MainScreen'),
                },
              ],
            );
          }}>
          <HomeIcon />
        </TouchableOpacity>
      </View>

      {!isGameStarted ? (
        <View style={styles.startContainer}>
          <Text style={styles.startText}>
            Watch the sequence and repeat it!
          </Text>
          <TouchableOpacity onPress={startNewGame} style={styles.startButton}>
            <Text style={styles.startButtonText}>Start Game</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>{statusMessage}</Text>
            {gameStatus === 'playing' && (
              <Text style={styles.progressText}>
                {userSequence.length} / {sequence.length}
              </Text>
            )}
          </View>

          <View style={styles.gameContainer}>
            {[0, 1, 2, 3].map((index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleCrownPress(index)}
                disabled={isPlaying || gameStatus === 'watching'}
                style={[
                  styles.crownButton,
                  styles[`crown${index}`],
                  activeIndex === index && styles.activeCrown,
                ]}>
                <Image
                  source={currentCrownSet.crowns[index]}
                  style={styles.crownImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
      <GameOverModal />
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
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(252, 248, 234, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
    paddingVertical: 20,
  },
  topCrownContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  middleCrownsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  bottomCrownContainer: {
    width: '100%',
    alignItems: 'center',
  },
  crownContainer: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
  },
  // activeCrownContainer: {
  //   backgroundColor: '#FCF8EA'+90,
  //   shadowColor: '#FCF8EA',
  //   shadowOffset: {
  //     width: 0,
  //     height: 0,
  //   },
  //   shadowOpacity: 0.5,
  //   shadowRadius: 10,
  //   elevation: 5,
  // },
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
    // backgroundColor: '#FCF8EA',
  },
  crown: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  startContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  startText: {
    fontSize: 24,
    color: '#FCF8EA',
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: 'bold',
    textShadowColor: 'rgba(252, 248, 234, 0.5)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
  },
  startButton: {
    backgroundColor: '#FCF8EA',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: '#FCF8EA',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  startButtonText: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#000',
    padding: 20,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FCF8EA',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#FCF8EA',
    textAlign: 'center',
    marginBottom: 20,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  finalScore: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FCF8EA',
    marginRight: 10,
  },
  crownIcon: {
    width: 48,
    height: 48,
  },
  playerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FCF8EA',
    marginBottom: 10,
  },
  totalScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  trophyIcon: {
    width: 48,
    height: 48,
    marginRight: 10,
  },
  totalScore: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FCF8EA',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  menuButton: {
    backgroundColor: '#FCF8EA',
    padding: 15,
    borderRadius: 25,
    width: '40%',
  },
  menuButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tryAgainButton: {
    backgroundColor: '#FCF8EA',
    padding: 15,
    borderRadius: 25,
    width: '40%',
  },
  tryAgainButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statusContainer: {
    position: 'absolute',
    top: 120,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1,
  },
  statusText: {
    fontSize: 24,
    color: '#FCF8EA',
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(252, 248, 234, 0.5)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
    marginBottom: 10,
  },
  progressText: {
    fontSize: 18,
    color: '#FCF8EA',
    opacity: 0.8,
    textAlign: 'center',
  },
  crownImage: {
    width: '100%',
    height: '100%',
  },
  activeCrown: {
    transform: [{scale: 1.1}],
  },
});

export default CrownGameScreen;
