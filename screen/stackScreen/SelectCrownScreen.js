import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import MainLayout from '../../components/layout/MainLayout';
import HomeIcon from '../../components/Icons/HomeIcon';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../components/UI/CustomButton';
import {useAppContext} from '../../store/context';
import {CROWNS} from '../../data/CustomizeCrown';
import LinearGradient from 'react-native-linear-gradient';
import CrownIcon from '../../components/Icons/CrownIcon';

const SelectCrownScreen = () => {
  const navigation = useNavigation();
  const {totalScore, selectedCrownSet, setSelectedCrownSet} = useAppContext();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Crown sets with unlock conditions
  const crownSets = [
    {id: 0, name: 'Classic', required: 0}, // Always unlocked
    {id: 1, name: 'Royal', required: 100},
    {id: 2, name: 'Diamond', required: 250},
    {id: 3, name: 'Mystic', required: 500},
  ];

  const isUnlocked = requiredScore => {
    return totalScore >= requiredScore;
  };

  const handleSelectCrown = index => {
    if (isUnlocked(crownSets[index].required)) {
      setSelectedCrownSet(index);
      // You might want to save this to AsyncStorage through context
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
            onScroll={event => {
              const index = Math.round(
                event.nativeEvent.contentOffset.x /
                  event.nativeEvent.layoutMeasurement.width,
              );
              setCurrentIndex(index);
            }}
            scrollEventThrottle={16}>
            {crownSets.map((set, index) => (
              <View key={set.id} style={styles.crownSetContainer}>
                <View style={styles.crownImageContainer}>
                  <Image
                    source={CROWNS[index].crowns[0]}
                    style={styles.crownImage}
                    resizeMode="contain"
                  />
                  {!isUnlocked(set.required) && (
                    <View style={styles.lockedOverlay}>
                      <Text style={styles.lockedText}>🔒</Text>
                      <Text style={styles.requiredScore}>
                        Score {set.required} to unlock
                      </Text>
                    </View>
                  )}
                </View>

                <TouchableOpacity
                  onPress={() => handleSelectCrown(index)}
                  disabled={!isUnlocked(set.required)}
                  style={styles.buttonWrapper}>
                  <LinearGradient
                    colors={
                      isUnlocked(set.required)
                        ? ['#FFEA9E', '#FCF8EA']
                        : ['#666666', '#444444']
                    }
                    style={styles.button}>
                    <Text
                      style={[
                        styles.buttonText,
                        !isUnlocked(set.required) && styles.buttonTextDisabled,
                      ]}>
                      {selectedCrownSet === index ? 'Selected' : 'Select'}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <View style={styles.pagination}>
            {crownSets.map((_, index) => (
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
  crownIcon: {
    fontSize: 24,
  },
  mainContent: {
    flex: 1,
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
    width: 300,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  crownImageContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  crownImage: {
    width: '100%',
    height: '100%',
    opacity: 1,
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
    textShadowColor: 'rgba(252, 248, 234, 0.5)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
  },
  requiredScore: {
    color: '#FCF8EA',
    fontSize: 16,
    opacity: 0.8,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  buttonWrapper: {
    width: '100%',
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#FCF8EA',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  button: {
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  buttonTextDisabled: {
    color: '#999999',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
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

export default SelectCrownScreen;
