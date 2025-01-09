import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const TaskItem = ({
  title,
  progress = 0,
  isClaimed = false,
  onProgressChange,
  onClaim,
}) => {
  const progressSteps = [0, 25, 50, 75, 100];

  const handleProgressPress = (step) => {
    onProgressChange(step);
  };

  const handleClaim = () => {
    onClaim();
  };

  return (
    <View style={styles.container}>
      {/* Left indicator - changes color when claimed */}
      <View style={[
        styles.indicator, 
        isClaimed && styles.indicatorClaimed
      ]} />

      <View style={styles.contentContainer}>
        {/* Task Title */}
        <Text style={styles.title}>{title}</Text>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          {progressSteps.map((step) => (
            <TouchableOpacity
              key={step}
              onPress={() => handleProgressPress(step)}
              style={styles.progressStepWrapper}>
              <View style={[
                styles.progressStep,
                progress >= step && styles.progressStepActive,
              ]} />
              <Text style={styles.progressText}>{step}%</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Claim Button */}
      <TouchableOpacity 
        style={styles.claimButton}
        onPress={handleClaim}>
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
    backgroundColor: '#12F7FF', // Default blue color
  },
  indicatorClaimed: {
    backgroundColor: '#4CAF50', // Green color when claimed
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
    justifyContent: 'space-between',
    gap: 8,
  },
  progressStepWrapper: {
    alignItems: 'center',
  },
  progressStep: {
    width: 40,
    height: 20,
    borderRadius: 3,
    backgroundColor: '#545454', // Default dark gray color
    marginBottom: 4,
  },
  progressStepActive: {
    backgroundColor: '#FFC600', // Gold color for active steps
  },
  progressText: {
    color: '#FCF8EA',
    fontSize: 12,
  },
  claimButton: {
    justifyContent: 'center',
    paddingRight: 16,
  },
  claimGradient: {
    borderRadius: 20,
  },
  claimText: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: '#000000',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default TaskItem;
