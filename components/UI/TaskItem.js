import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const TaskItem = ({title, progress = 0}) => {
  const progressSteps = [0, 25, 50, 75, 100];

  return (
    <View style={styles.container}>
      {/* Left green indicator */}
      <View style={styles.indicator} />

      <View style={styles.contentContainer}>
        {/* Task Title */}
        <Text style={styles.title}>{title}</Text>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          {progressSteps.map((step, index) => (
            <TouchableOpacity
              key={step}
              style={[
                styles.progressStep,
                progress >= step && styles.progressStepActive,
                progress === step && styles.progressStepCurrent,
              ]}
            />
          ))}
        </View>
      </View>

      {/* Claim Button */}
      <TouchableOpacity style={styles.claimButton}>
        <LinearGradient
          colors={['#FFEA9E', '#FCF8EA']}
          style={styles.claimGradient}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}>
          <Text style={styles.claimText}>Claim</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    marginVertical: 8,
    overflow: 'hidden',
  },
  indicator: {
    width: 4,
    backgroundColor: '#4CAF50', // Green color
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  title: {
    color: '#FCF8EA',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressStep: {
    width: 40,
    height: 20,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  progressStepActive: {
    backgroundColor: '#4CAF50',
  },
  progressStepCurrent: {
    backgroundColor: '#FFEA9E',
    paddingVertical: 5,
  },
  claimButton: {
    justifyContent: 'center',
    paddingRight: 16,
  },
  claimGradient: {
      borderRadius: 20,
    },
    claimText: {
        color: '#000000',
        fontSize: 14,
        fontWeight: '600',
        paddingHorizontal: 16,
        paddingVertical: 8,
  },
});

export default TaskItem;
