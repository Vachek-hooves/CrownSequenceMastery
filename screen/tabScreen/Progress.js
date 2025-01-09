import React, {useContext} from 'react';
import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import {AppContext} from '../../store/context';
import NameHeader from '../../components/UI/NameHeader';

const Progress = () => {
  const {sequences, tasks} = useContext(AppContext);
  console.log('Tasks:', tasks);
  console.log('Sequences:', sequences);

  const ProgressPie = ({progress, goal, size = 150}) => {
    // Split progress into segments
    const segments = [
      {threshold: 25, color: '#FF3B30'}, // red
      {threshold: 50, color: '#FFCC00'}, // yellow
      {threshold: 75, color: '#5856D6'}, // blue
      {threshold: 99, color: '#34C759'}, // light green
      {threshold: 100, color: '#00FF00'}, // bright green
    ];

    const getSegmentSize = (threshold, prevThreshold = 0) => {
      if (progress <= prevThreshold) return 0;
      if (progress >= threshold) return threshold - prevThreshold;
      return progress - prevThreshold;
    };

    return (
      <View style={styles.progressContainer}>
        <View style={[styles.pieContainer, {width: size, height: size}]}>
          {/* Background Circle */}
          <View
            style={[styles.backgroundCircle, {width: size, height: size}]}
          />

          {/* Progress Segments */}
          {segments.map((segment, index) => {
            const segmentSize = getSegmentSize(
              segment.threshold,
              index > 0 ? segments[index - 1].threshold : 0,
            );

            if (segmentSize <= 0) return null;

            return (
              <View
                key={segment.threshold}
                style={[
                  styles.pieSegment,
                  {
                    backgroundColor: segment.color,
                    width: size,
                    height: size,
                    transform: [
                      {rotate: `${index * 72}deg`}, // 360/5 segments = 72 degrees
                      {scale: segmentSize / 100},
                    ],
                  },
                ]}
              />
            );
          })}

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
      <ScrollView>
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

        {/* Progress Circles for Tasks */}
        <View style={styles.progressGrid}>
          {tasks.map(task => (
            <ProgressPie
              key={task.id}
              progress={task.progress}
              goal={task.title}
            />
          ))}
        </View>

        {/* Progress Circles for Sequences */}
        <View style={styles.progressGrid}>
          {sequences.map(sequence => (
            <ProgressPie
              key={sequence.id}
              progress={sequence.progress}
              goal={sequence.goal}
            />
          ))}
        </View>
      </ScrollView>
      <View style={{height: 100}} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  header: {
    padding: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFEA9E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  profileIconText: {
    fontSize: 20,
  },
  welcomeText: {
    color: '#FCF8EA',
    opacity: 0.7,
    fontSize: 14,
  },
  nameText: {
    color: '#FCF8EA',
    fontSize: 18,
    fontWeight: '600',
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
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  legendText: {
    color: '#FCF8EA',
    fontSize: 12,
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
  pieContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 75,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  pieSegment: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 75,
  },
  centerContent: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A1A1A',
    width: '85%',
    height: '85%',
    borderRadius: 75,
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
    paddingHorizontal: 10,
  },
});

export default Progress;
