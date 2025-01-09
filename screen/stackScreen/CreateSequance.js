import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  Modal
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CreateSequance = ({ navigation }) => {
  const [goal, setGoal] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [task, setTask] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#00FF00'); // Default green color

  const weekDays = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
  const colors = [
    '#00FF00', // Green
    '#FF0000', // Red
    '#0000FF', // Blue
    '#FFFF00', // Yellow
    '#FF00FF', // Magenta
    '#00FFFF', // Cyan
    '#FFA500', // Orange
    '#800080', // Purple
  ];

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const ColorPickerModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showColorPicker}
      onRequestClose={() => setShowColorPicker(false)}>
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setShowColorPicker(false)}>
        <View style={styles.colorPickerContainer}>
          {colors.map((color) => (
            <TouchableOpacity
              key={color}
              style={[styles.colorOption, { backgroundColor: color }]}
              onPress={() => {
                setSelectedColor(color);
                setShowColorPicker(false);
              }}
            />
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <ScrollView>

      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create a New Sequence</Text>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Set Your Goal"
          placeholderTextColor="#666"
          value={goal}
          onChangeText={setGoal}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Write a description"
          placeholderTextColor="#666"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />

        {/* Color Picker Button */}
        <TouchableOpacity
          style={[styles.colorPickerButton, { backgroundColor: selectedColor }]}
          onPress={() => setShowColorPicker(true)}
        />

        <Text style={styles.sectionTitle}>
          Set a start date and end date to stay focused and motivated
        </Text>

        <View style={styles.dateContainer}>
          <TextInput
            style={[styles.input, styles.dateInput]}
            placeholder="Start date"
            placeholderTextColor="#666"
            value={startDate}
            onChangeText={setStartDate}
          />
          <TextInput
            style={[styles.input, styles.dateInput]}
            placeholder="End date"
            placeholderTextColor="#666"
            value={endDate}
            onChangeText={setEndDate}
          />
        </View>

        <Text style={styles.sectionTitle}>
          Add small, actionable tasks to guide your progress
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Set Your Task"
          placeholderTextColor="#666"
          value={task}
          onChangeText={setTask}
        />

        {/* Week Days */}
        <View style={styles.daysContainer}>
          {weekDays.map((day) => (
            <TouchableOpacity
              key={day}
              style={[
                styles.dayButton,
                selectedDays.includes(day) && styles.dayButtonSelected,
              ]}
              onPress={() => toggleDay(day)}>
              <Text style={[
                styles.dayButtonText,
                selectedDays.includes(day) && styles.dayButtonTextSelected,
              ]}>
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Add Task Button */}
        <TouchableOpacity style={styles.addTaskButton}>
          <LinearGradient
            colors={['#FFEA9E', '#FCF8EA']}
            style={styles.addTaskButtonGradient}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}>
            <Text style={styles.addTaskButtonText}>+</Text>
          </LinearGradient>
        </TouchableOpacity>

        

        {/* Set Button */}
        <TouchableOpacity style={styles.setButton}>
          <Text style={styles.setButtonText}>Set</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>

      <ColorPickerModal />
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
    fontSize: 20,
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
    lineHeight: 24,
  },
  form: {
    flex: 1,
    padding: 20,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 15,
    color: '#FCF8EA',
    marginBottom: 20,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  sectionTitle: {
    fontSize: 18,
    color: '#FCF8EA',
    marginBottom: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateInput: {
    width: '48%',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
  },
  dayButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 10,
  },
  dayButtonSelected: {
    backgroundColor: '#FFC600',
  },
  dayButtonText: {
    color: '#FCF8EA',
    fontSize: 14,
  },
  dayButtonTextSelected: {
    color: '#000000',
  },
  addTaskButton: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  addTaskButtonGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addTaskButtonText: {
    fontSize: 24,
    color: '#000000',
    fontWeight: 'bold',
  },
  setButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    marginTop: 'auto',
  },
  setButtonText: {
    color: '#FCF8EA',
    fontSize: 18,
    fontWeight: '600',
  },
  colorPickerButton: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    // position: 'absolute',
    // top: 120, // Adjust based on your layout
    // right: 20,
    alignSelf: 'center',
    marginVertical:15
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorPickerContainer: {
    backgroundColor: '#1A1A1A',
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '80%',
    maxWidth: 300,
    justifyContent: 'center',
    gap: 16,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 5,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
});

export default CreateSequance;