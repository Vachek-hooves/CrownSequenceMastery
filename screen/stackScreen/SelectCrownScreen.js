import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import MainLayout from '../../components/layout/MainLayout';
import HomeIcon from '../../components/Icons/HomeIcon';
import {useNavigation} from '@react-navigation/native';
import {useAppContext} from '../../store/context';
import LinearGradient from 'react-native-linear-gradient';
import CrownIcon from '../../components/Icons/CrownIcon';
import ReturnIcon from '../../components/Icons/ReturnIcon';

const SelectCrownScreen = () => {
  const navigation = useNavigation();
  const {
    totalScore,
    selectedCrownSet,
    setSelectedCrownSet,
    unlockedCrowns,
    unlockCrown,
    crowns
  } = useAppContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const screenWidth = Dimensions.get('window').width;

  const handleSelectCrown = async (index) => {
    if (unlockedCrowns[index]) {
      await setSelectedCrownSet(index);
    } else if (totalScore >= 200) {
      try {
        const unlocked = await unlockCrown(index);
        if (unlocked) {
          await setSelectedCrownSet(index);
        }
      } catch (error) {
        console.error('Error unlocking crown:', error);
      }
    } else {
      Alert.alert(
        'Crown Locked',
        'You need 200 points to unlock this crown set.',
        [{text: 'OK', style: 'default'}],
      );
    }
  };

  return (
    <MainLayout>
      <SafeAreaView style={styles.content}>
        <View style={styles.header}>
          <HomeIcon />
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>{totalScore}</Text>
            <CrownIcon />
          </View>
        </View>

        <View style={styles.mainContent}>
          <Text style={styles.title}>Crown Sets</Text>
          <Text style={styles.subtitle}>
            Unlock and select new crown designs
          </Text>

          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(event) => {
              const index = Math.round(
                event.nativeEvent.contentOffset.x / screenWidth,
              );
              setCurrentIndex(index);
            }}
            scrollEventThrottle={16}>
            {crowns.map((crownSet, index) => (
              <View 
                key={index} 
                style={[styles.crownSetContainer, { width: screenWidth }]}>
                <View style={styles.crownImageContainer}>
                  <Image
                    source={crownSet.crowns[0]}
                    style={styles.crownImage}
                    resizeMode="contain"
                  />
                  {!unlockedCrowns[index] && (
                    <View style={styles.lockedOverlay}>
                      <Text style={styles.lockedText}>🔒</Text>
                      <Text style={styles.requiredScore}>
                        Score 200 to unlock
                      </Text>
                    </View>
                  )}
                </View>

                <TouchableOpacity
                  onPress={() => handleSelectCrown(index)}
                  disabled={!unlockedCrowns[index] && totalScore < 200}
                  style={styles.buttonWrapper}>
                  <LinearGradient
                    colors={
                      selectedCrownSet === index
                        ? ['#666666', '#444444']
                        : unlockedCrowns[index]
                          ? ['#FFEA9E', '#FCF8EA']
                          : ['#666666', '#444444']
                    }
                    style={styles.button}>
                    <Text
                      style={[
                        styles.buttonText,
                        selectedCrownSet === index && styles.selectedButtonText,
                        !unlockedCrowns[index] && styles.buttonTextDisabled,
                      ]}>
                      {selectedCrownSet === index ? 'SELECTED' : 'Select'}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <View style={styles.pagination}>
            {crowns.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  currentIndex === index && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>
        </View>
        <ReturnIcon/>
      </SafeAreaView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  scoreText: {
    fontSize: 24,
    color: '#FCF8EA',
    fontWeight: 'bold',
  },
  mainContent: {
    // flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FCF8EA',
    marginBottom: 16,
    textAlign: 'center',
    textShadowColor: 'rgba(252, 248, 234, 0.5)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#FCF8EA',
    textAlign: 'center',
    marginBottom: 40,
    opacity: 0.8,
  },
  crownSetContainer: {
    alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: 20,
  },
  crownImageContainer: {
    width: 280,
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  crownImage: {
    width: '100%',
    height: '100%',
  },
  lockedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  lockedText: {
    fontSize: 40,
    marginBottom: 10,
  },
  requiredScore: {
    color: '#FCF8EA',
    fontSize: 18,
    opacity: 0.8,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  buttonWrapper: {
    width: '100%',
    maxWidth: 280,
    borderRadius: 25,
    overflow: 'hidden',
  },
  button: {
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    paddingVertical: 16,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  buttonTextDisabled: {
    color: '#999999',
  },
  selectedButtonText: {
    color: '#FCF8EA',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(252, 248, 234, 0.3)',
  },
  paginationDotActive: {
    backgroundColor: '#FCF8EA',
    width: 12,
  },
  selectedButtonText: {
    color: '#FCF8EA',
  },
});

export default SelectCrownScreen;
