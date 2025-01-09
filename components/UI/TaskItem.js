import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const TaskItem = ({
  title,
  progress = 0,
  isClaimed = false,
  onProgressChange,
  onClaim,
  onDelete,
}) => {
  const progressSteps = [0, 25, 50, 75, 100];

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: onDelete,
          style: 'destructive',
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      {/* Delete Button */}
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>×</Text>
      </TouchableOpacity>

      {/* Left indicator */}
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
              onPress={() => onProgressChange(step)}
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
        onPress={onClaim}>
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
    paddingRight: 40, // Make space for delete button
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
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  deleteButtonText: {
    color: '#FCF8EA',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 20,
  },
});

export default TaskItem;
