import {SafeAreaView, StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import HomeIcon from '../../components/Icons/HomeIcon';
import {useAppContext} from '../../store/context';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../components/UI/CustomButton';

const ResultScreen = () => {
  const {highScore, totalScore, nickname} = useAppContext();
  const navigation = useNavigation();

  return (
    <MainLayout>
      <SafeAreaView style={styles.content}>
        <View style={styles.header}>
          <CustomButton
            onPress={() => navigation.navigate('MainScreen')}
            variant="icon">
            <HomeIcon />
          </CustomButton>
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.title}>Game Statistics</Text>
          
          <View style={styles.playerInfo}>
            <Text style={styles.playerName}>{nickname}</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.scoreSection}>
            <View style={styles.scoreItem}>
              <Image
                source={require('../../assets/image/icons/crownIcon.png')}
                style={styles.icon}
              />
              <Text style={styles.scoreLabel}>High Score</Text>
              <Text style={styles.scoreValue}>{highScore}</Text>
            </View>

            <View style={styles.scoreItem}>
              {/* <Image
                source={require('../../assets/image/icons/trophyIcon.png')}
                style={styles.icon}
              /> */}
              <Text style={styles.scoreLabel}>Total Score</Text>
              <Text style={styles.scoreValue}>{totalScore}</Text>
            </View>
          </View>

          <View style={styles.achievementsContainer}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            <View style={styles.achievementsList}>
              {/* Achievement items will be added here */}
              <View style={styles.achievementItem}>
                <View style={[styles.achievementIcon, totalScore >= 100 && styles.achievementUnlocked]}>
                  <Text style={styles.achievementIconText}>🎯</Text>
                </View>
                <View style={styles.achievementInfo}>
                  <Text style={styles.achievementTitle}>Score Master</Text>
                  <Text style={styles.achievementDesc}>Reach 100 total points</Text>
                </View>
              </View>

              <View style={styles.achievementItem}>
                <View style={[styles.achievementIcon, highScore >= 20 && styles.achievementUnlocked]}>
                  <Text style={styles.achievementIconText}>👑</Text>
                </View>
                <View style={styles.achievementInfo}>
                  <Text style={styles.achievementTitle}>Crown Champion</Text>
                  <Text style={styles.achievementDesc}>Get 20 points in one game</Text>
                </View>
              </View>
            </View>
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
    alignItems: 'flex-end',
  },
  statsContainer: {
    flex: 1,
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FCF8EA',
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: 'rgba(252, 248, 234, 0.5)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
  },
  playerInfo: {
    marginBottom: 30,
  },
  playerName: {
    fontSize: 24,
    color: '#FCF8EA',
    textAlign: 'center',
    marginBottom: 10,
  },
  divider: {
    height: 2,
    backgroundColor: 'rgba(252, 248, 234, 0.2)',
    width: '50%',
    alignSelf: 'center',
  },
  scoreSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  scoreItem: {
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 10,
    tintColor: '#FCF8EA',
  },
  scoreLabel: {
    color: '#FCF8EA',
    fontSize: 16,
    opacity: 0.8,
    marginBottom: 5,
  },
  scoreValue: {
    color: '#FCF8EA',
    fontSize: 28,
    fontWeight: 'bold',
  },
  achievementsContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    color: '#FCF8EA',
    marginBottom: 20,
    fontWeight: '600',
  },
  achievementsList: {
    gap: 15,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(252, 248, 234, 0.1)',
    borderRadius: 15,
    padding: 15,
  },
  achievementIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(252, 248, 234, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  achievementUnlocked: {
    backgroundColor: '#FCF8EA',
  },
  achievementIconText: {
    fontSize: 24,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    color: '#FCF8EA',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  achievementDesc: {
    color: '#FCF8EA',
    opacity: 0.8,
  },
});

export default ResultScreen;
