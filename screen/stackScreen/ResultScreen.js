import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import HomeIcon from '../../components/Icons/HomeIcon';
import {useAppContext} from '../../store/context';
import CrownIcon from '../../components/Icons/CrownIcon';

const ResultScreen = () => {
  const {highScore, totalScore, nickname, gameResults = []} = useAppContext();
  console.log(gameResults,'game results');

  return (
    <MainLayout>
      <SafeAreaView style={styles.content}>
        <View style={styles.header}>
          <HomeIcon />
          <CrownIcon />
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
              <Text style={styles.trophyIcon}>🏆</Text>
              <Text style={styles.scoreLabel}>Total Score</Text>
              <Text style={styles.scoreValue}>{totalScore}</Text>
            </View>
          </View>

          <View style={styles.achievementsContainer}>
            <Text style={styles.sectionTitle}>Game Results</Text>
            <ScrollView
              style={styles.resultsScroll}
              showsVerticalScrollIndicator={false}>
              {gameResults.map((result, index) => (
                <View key={index} style={styles.resultItem}>
                  <View style={styles.resultHeader}>
                    <Text style={styles.resultDate}>
                      {new Date(result.date).toLocaleDateString()}
                    </Text>
                    <Text style={styles.resultTime}>
                      {new Date(result.date).toLocaleTimeString()}
                    </Text>
                  </View>
                  <View style={styles.resultDetails}>
                    <View style={styles.resultStat}>
                      <Text style={styles.resultLabel}>Score</Text>
                      <Text style={styles.resultValue}>{result.score}</Text>
                    </View>
                    <View style={styles.resultStat}>
                      <Text style={styles.resultLabel}>Level</Text>
                      <Text style={styles.resultValue}>{result.level}</Text>
                    </View>
                    <View style={styles.resultStat}>
                      <Text style={styles.resultLabel}>Sequence</Text>
                      <Text style={styles.resultValue}>{result.sequence}</Text>
                    </View>
                  </View>
                </View>
              ))}

              {gameResults.length === 0 && (
                <View style={styles.noResultsContainer}>
                  <Text style={styles.noResultsText}>No games played yet</Text>
                  <Text style={styles.noResultsSubtext}>
                    Your game results will appear here
                  </Text>
                </View>
              )}
            </ScrollView>
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
    // alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
  },
  statsContainer: {
    flex: 1,
    paddingTop: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FCF8EA',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(252, 248, 234, 0.5)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
  },
  playerInfo: {
    marginBottom: 15,
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
    width: '80%',
    alignSelf: 'center',
  },
  scoreSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
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
  trophyIcon: {
    fontSize: 38,
    color: '#FCF8EA',
    marginBottom: 10,
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
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 24,
    color: '#FCF8EA',
    marginBottom: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  resultsScroll: {
    flex: 1,
  },
  resultItem: {
    backgroundColor: 'rgba(252, 248, 234, 0.1)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  resultDate: {
    color: '#FCF8EA',
    fontSize: 14,
    opacity: 0.8,
  },
  resultTime: {
    color: '#FCF8EA',
    fontSize: 14,
    opacity: 0.8,
  },
  resultDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resultStat: {
    alignItems: 'center',
  },
  resultLabel: {
    color: '#FCF8EA',
    fontSize: 12,
    opacity: 0.8,
    marginBottom: 4,
  },
  resultValue: {
    color: '#FCF8EA',
    fontSize: 18,
    fontWeight: 'bold',
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  noResultsText: {
    color: '#FCF8EA',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  noResultsSubtext: {
    color: '#FCF8EA',
    fontSize: 14,
    opacity: 0.8,
  },
});

export default ResultScreen;
