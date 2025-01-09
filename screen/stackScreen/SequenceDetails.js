import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { AppContext } from '../../store/context';

const SequenceDetails = ({ route, navigation }) => {
  const { sequences, deleteSequence } = useContext(AppContext);
  const { id } = route.params;
  const sequence = sequences.find(seq => seq.id === id);
  console.log(sequence);

  if (!sequence) return null;

  const handleDelete = () => {
    Alert.alert(
      "Delete Sequence",
      "Are you sure you want to delete this sequence?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const success = await deleteSequence(id);
            if (success) {
              navigation.goBack();
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <ScrollView style={{flex: 1, marginTop: 20,paddingHorizontal: 10}}>

      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{sequence.goal}</Text>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
      </View>

      {/* Description */}
      <Text style={styles.description}>{sequence.description}</Text>

      {/* Dates */}
      <View style={styles.dateContainer}>
        <View style={styles.dateBox}>
          <Text style={styles.dateText}>{sequence.startDate}</Text>
        </View>
        <View style={styles.dateBox}>
          <Text style={styles.dateText}>{sequence.endDate}</Text>
        </View>
      </View>

      {/* Task with Days */}
      <View style={styles.taskContainer}>
        <Text style={styles.taskTitle}>Task 1</Text>
      </View>
      <View style={styles.daysRow}>
        {['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'].map((day) => (
          <View
            key={day}
            style={[
              styles.dayPill,
              sequence.selectedDays.includes(day) && styles.dayPillSelected,
            ]}>
            <Text
              style={[
                styles.dayText,
                sequence.selectedDays.includes(day) && styles.dayTextSelected,
              ]}>
              {day}
            </Text>
          </View>
        ))}
      </View>
      </ScrollView>
      {/* Edit Button */}
      {/* <TouchableOpacity 
        style={styles.editButton}
        onPress={() => navigation.navigate('EditSequence', { id: sequence.id })}>
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity> */}

      {/* Delete Button */}
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    padding: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
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
  description: {
    fontSize: 16,
    color: '#FCF8EA',
    marginBottom: 24,
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
  taskContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  taskTitle: {
    fontSize: 16,
    color: '#FCF8EA',
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
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
    backgroundColor: '#FFEA9E',
    borderRadius: 25,
    padding: 16,
    alignItems: 'center',
    // marginTop: 'auto',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  editButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 25,
    padding: 16,
    alignItems: 'center',
    marginTop: 'auto',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default SequenceDetails;