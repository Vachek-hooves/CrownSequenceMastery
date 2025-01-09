import React, { useState, useContext } from 'react';
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
import { Calendar } from 'react-native-calendars';
import { AppContext } from '../../store/context';

const CreateSequance = ({ navigation }) => {
  const { addSequence } = useContext(AppContext);
  const [goal, setGoal] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [task, setTask] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#00FF00'); // Default green color
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [markedDates, setMarkedDates] = useState({});

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

  const handleStartDateSelect = (day) => {
    setStartDate(day.dateString);
    const newMarkedDates = {
      [day.dateString]: {
        selected: true,
        startingDay: true,
        color: selectedColor,
      },
    };
    if (endDate) {
      newMarkedDates[endDate] = {
        selected: true,
        endingDay: true,
        color: selectedColor,
      };
    }
    setMarkedDates(newMarkedDates);
    setShowStartCalendar(false);
  };

  const handleEndDateSelect = (day) => {
    setEndDate(day.dateString);
    setMarkedDates({
      ...markedDates,
      [day.dateString]: {
        selected: true,
        endingDay: true,
        color: selectedColor,
      },
    });
    setShowEndCalendar(false);
  };

  const CalendarModal = ({ visible, onClose, onDayPress, minDate }) => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}>
        <View style={styles.calendarContainer}>
          <Calendar
            onDayPress={onDayPress}
            markedDates={markedDates}
            minDate={minDate}
            theme={{
              backgroundColor: '#1A1A1A',
              calendarBackground: '#1A1A1A',
              textSectionTitleColor: '#FCF8EA',
              selectedDayBackgroundColor: selectedColor,
              selectedDayTextColor: '#000000',
              todayTextColor: selectedColor,
              dayTextColor: '#FCF8EA',
              textDisabledColor: '#444444',
              monthTextColor: '#FCF8EA',
              arrowColor: '#FCF8EA',
            }}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );

  const handleSave = async () => {
    if (!goal.trim() || !description.trim() || !startDate || !endDate) {
      // Add your preferred validation feedback here
      return;
    }

    const sequenceData = {
      goal,
      description,
      startDate,
      endDate,
      color: selectedColor,
      selectedDays,
      tasks: [{
        title: task,
        days: selectedDays,
        progress: 0,
      }],
    };

    const success = await addSequence(sequenceData);
    if (success) {
      navigation.goBack();
    }
  };

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
          <TouchableOpacity
            style={[styles.input, styles.dateInput]}
            onPress={() => setShowStartCalendar(true)}>
            <Text style={startDate ? styles.dateText : styles.placeholderText}>
              {startDate || 'Start date'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.input, styles.dateInput]}
            onPress={() => setShowEndCalendar(true)}>
            <Text style={endDate ? styles.dateText : styles.placeholderText}>
              {endDate || 'End date'}
            </Text>
          </TouchableOpacity>
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
        <TouchableOpacity 
          style={styles.setButton}
          onPress={handleSave}>
          <Text style={styles.setButtonText}>Set</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>

      <CalendarModal
        visible={showStartCalendar}
        onClose={() => setShowStartCalendar(false)}
        onDayPress={handleStartDateSelect}
        minDate={new Date().toISOString().split('T')[0]}
      />

      <CalendarModal
        visible={showEndCalendar}
        onClose={() => setShowEndCalendar(false)}
        onDayPress={handleEndDateSelect}
        minDate={startDate}
      />

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
    justifyContent: 'center',
  },
  dateText: {
    color: '#FCF8EA',
    fontSize: 16,
  },
  placeholderText: {
    color: '#666',
    fontSize: 16,
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
    marginTop: 20,
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
  calendarContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 10,
    width: '90%',
    maxWidth: 400,
  },
});

export default CreateSequance;