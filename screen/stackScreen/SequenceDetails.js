import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { AppContext } from '../../store/context';

const SequenceDetails = ({ route, navigation }) => {
  const { sequences } = useContext(AppContext);
  const { id } = route.params;
  const sequence = sequences.find(seq => seq.id === id);

  if (!sequence) return null;

  const renderWeekDays = (taskDays) => {
    const days = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
    return (
      <View style={styles.daysContainer}>
        {days.map(day => (
          <View
            key={day}
            style={[
              styles.dayPill,
              taskDays.includes(day) && styles.dayPillSelected,
            ]}>
            <Text
              style={[
                styles.dayText,
                taskDays.includes(day) && styles.dayTextSelected,
              ]}>
              {day}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with close button */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{sequence.goal}</Text>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Description */}
        <View style={styles.descriptionContainer}>
          {sequence.description.split('\n').map((line, index) => (
            <Text key={index} style={styles.descriptionText}>{line}</Text>
          ))}
        </View>

        {/* Dates */}
        <View style={styles.dateContainer}>
          <View style={styles.dateBox}>
            <Text style={styles.dateText}>{sequence.startDate}</Text>
          </View>
          <View style={styles.dateBox}>
            <Text style={styles.dateText}>{sequence.endDate}</Text>
          </View>
        </View>

        {/* Tasks List */}
        {sequence.tasks.map((task, index) => (
          <View key={index} style={styles.taskItem}>
            <Text style={styles.taskTitle}>{task.title}</Text>
            <View style={styles.daysRow}>
              {['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'].map((day) => (
                <View
                  key={day}
                  style={[
                    styles.dayPill,
                    task.days.includes(day) && styles.dayPillSelected,
                  ]}>
                  <Text
                    style={[
                      styles.dayText,
                      task.days.includes(day) && styles.dayTextSelected,
                    ]}>
                    {day}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Edit Button */}
      <TouchableOpacity 
        style={styles.editButton}
        onPress={() => navigation.navigate('EditSequence', { id: sequence.id })}>
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: {
    fontSize: 28,
    color: '#FCF8EA',
    fontWeight: '600',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#FCF8EA',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  descriptionText: {
    fontSize: 16,
    color: '#FCF8EA',
    opacity: 0.8,
    marginBottom: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  dateBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 8,
    width: '48%',
  },
  dateText: {
    color: '#FCF8EA',
    fontSize: 16,
    textAlign: 'center',
  },
  taskItem: {
    marginBottom: 16,
  },
  taskTitle: {
    fontSize: 18,
    color: '#FCF8EA',
    marginBottom: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 8,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
  },
  dayPill: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  dayPillSelected: {
    backgroundColor: '#FFEA9E',
  },
  dayText: {
    color: '#FCF8EA',
    fontSize: 14,
  },
  dayTextSelected: {
    color: '#000000',
  },
  editButton: {
    margin: 20,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FCF8EA',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default SequenceDetails;