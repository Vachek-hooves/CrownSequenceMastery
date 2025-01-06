import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import MainLayout from '../../components/layout/MainLayout';
import HomeIcon from '../../components/Icons/HomeIcon';
import {useNavigation} from '@react-navigation/native';
import {useAppContext} from '../../store/context';
import LinearGradient from 'react-native-linear-gradient';
import CrownIcon from '../../components/Icons/CrownIcon';
import {background} from '../../data/CustomizeBackground';
import ReturnIcon from '../../components/Icons/ReturnIcon';

const SelectBackgroundScreen = () => {
  const navigation = useNavigation();
  const {
    totalScore,
    selectedBackground,
    setSelectedBackground,
    unlockedBackgrounds,
    unlockBackground,
  } = useAppContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const screenWidth = Dimensions.get('window').width;

  const handleSelectBackground = async index => {
    if (unlockedBackgrounds[index]) {
      await setSelectedBackground(index);
    } else if (totalScore >= 20) {
      try {
        const unlocked = await unlockBackground(index);
        if (unlocked) {
          await setSelectedBackground(index);
        }
      } catch (error) {
        console.error('Error unlocking background:', error);
      }
    } else {
      Alert.alert(
        'Background Locked',
        'You need 20 points to unlock this background.',
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
          <Text style={styles.title}>Background</Text>
          <Text style={styles.subtitle}>Choose your game background color</Text>

          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={event => {
              const index = Math.round(
                event.nativeEvent.contentOffset.x / screenWidth,
              );
              setCurrentIndex(index);
            }}
            scrollEventThrottle={16}>
            {background.map((bg, index) => (
              <View
                key={index}
                style={[styles.bgContainer, {width: screenWidth}]}>
                <View style={styles.colorPreviewContainer}>
                  <View
                    style={[styles.colorPreview, {backgroundColor: bg.bgColor}]}
                  />
                  {!unlockedBackgrounds[index] && (
                    <View style={styles.lockedOverlay}>
                      <Text style={styles.lockedText}>🔒</Text>
                      <Text style={styles.requiredScore}>
                        Score 20 to unlock
                      </Text>
                    </View>
                  )}
                </View>

                <TouchableOpacity
                  onPress={() => handleSelectBackground(index)}
                  disabled={!unlockedBackgrounds[index] && totalScore < 20}
                  style={styles.buttonWrapper}>
                  <LinearGradient
                    colors={
                      selectedBackground === index
                        ? ['#666666', '#444444']
                        : unlockedBackgrounds[index]
                        ? ['#FFEA9E', '#FCF8EA']
                        : ['#666666', '#444444']
                    }
                    style={styles.button}>
                    <Text
                      style={[
                        styles.buttonText,
                        selectedBackground === index &&
                          styles.selectedButtonText,
                        !unlockedBackgrounds[index] &&
                          styles.buttonTextDisabled,
                      ]}>
                      {selectedBackground === index ? 'SELECTED' : 'Select'}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <View style={styles.pagination}>
            {background.map((_, index) => (
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
        <ReturnIcon />
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
    marginBottom: 40,
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
  bgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  colorPreviewContainer: {
    width: 280,
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  colorPreview: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FCF8EA',
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
    borderRadius: 20,
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
    marginTop: 80,
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
  },
});

export default SelectBackgroundScreen;
