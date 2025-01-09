import React, {useContext} from 'react';
import {StyleSheet, Text, View, SafeAreaView,ScrollView} from 'react-native';
import {AppContext} from '../../store/context';
import NameHeader from '../../components/UI/NameHeader';

const Progress = () => {
  const {sequences, tasks} = useContext(AppContext);

  const ProgressCircle = ({progress, goal, size = 140}) => {
    const getProgressColor = percentage => {
      if (percentage === 0) return '#FF3B30'; // red
      if (percentage <= 25) return '#FFCC00'; // red
      if (percentage <= 50) return '#5856D6'; // yellow
      if (percentage <= 75) return '#34C759'; // blue
      if (percentage < 100) return '#00FF00'; // light green
      return '#00FF00'; // bright green
    };

    return (
      <View style={styles.progressContainer}>
        <View style={[styles.circleContainer, {width: size, height: size}]}>
          {/* Progress Ring */}
          <View
            style={[
              styles.progressRing,
              {
                width: size,
                height: size,
                borderColor: getProgressColor(progress),
              },
            ]}
          />

          {/* Center Content */}
          <View style={styles.centerContent}>
            <Text style={styles.progressText}>{Math.round(progress)}%</Text>
            <Text style={styles.goalText}>{goal}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <NameHeader />
      

      {/* Progress Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, {backgroundColor: '#FF3B30'}]} />
          <Text style={styles.legendText}>0%</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, {backgroundColor: '#FFCC00'}]} />
          <Text style={styles.legendText}>25%</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, {backgroundColor: '#5856D6'}]} />
          <Text style={styles.legendText}>50%</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, {backgroundColor: '#34C759'}]} />
          <Text style={styles.legendText}>75%</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, {backgroundColor: '#00FF00'}]} />
          <Text style={styles.legendText}>100%</Text>
        </View>
      </View>
      <ScrollView>
      {/* Progress Circles */}
      <View style={styles.progressGrid}>
        {tasks.map(task => (
          <ProgressCircle
            key={task.id}
            progress={task.progress}
            goal={task.title}
          />
        ))}
        {sequences.map(sequence => (
          <ProgressCircle
            key={sequence.id}
            progress={sequence.progress}
            goal={sequence.goal}
          />
        ))}
      </View>
      </ScrollView>
      <View style={{height: 90}} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },

  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 14,
    height: 14,
    borderRadius: '50%',
    marginRight: 4,
  },
  legendText: {
    color: '#FCF8EA',
    fontSize: 14,
  },
  progressGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 20,
  },
  progressContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  circleContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressRing: {
    position: 'absolute',
    borderRadius: 75,
    borderWidth: 8,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  progressText: {
    color: '#FCF8EA',
    fontSize: 24,
    fontWeight: '600',
  },
  goalText: {
    color: '#FCF8EA',
    fontSize: 14,
    opacity: 0.7,
    textAlign: 'center',
    marginTop: 4,
  },
});

export default Progress;
