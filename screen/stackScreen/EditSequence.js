import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Modal,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {AppContext} from '../../store/context';

const EditSequence = ({route, navigation}) => {
  const {sequences, updateSequence} = useContext(AppContext);
  const {id} = route.params;
  const currentSequence = sequences.find(seq => seq.id === id);

  const [goal, setGoal] = useState(currentSequence.goal);
  const [description, setDescription] = useState(currentSequence.description);
  const [startDate, setStartDate] = useState(currentSequence.startDate);
  const [endDate, setEndDate] = useState(currentSequence.endDate);
  const [selectedDays, setSelectedDays] = useState(
    currentSequence.selectedDays,
  );
  const [selectedColor, setSelectedColor] = useState(currentSequence.color);
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [markedDates, setMarkedDates] = useState({
    [currentSequence.startDate]: {
      selected: true,
      startingDay: true,
      color: currentSequence.color,
    },
    [currentSequence.endDate]: {
      selected: true,
      endingDay: true,
      color: currentSequence.color,
    },
  });

  const weekDays = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
  const colors = [
    '#00FF00',
    '#FF0000',
    '#0000FF',
    '#FFFF00',
    '#FF00FF',
    '#00FFFF',
    '#FFA500',
    '#800080',
  ];

  const toggleDay = day => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleStartDateSelect = day => {
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

  const handleEndDateSelect = day => {
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

  const handleUpdate = async () => {
    if (!goal.trim() || !description.trim() || !startDate || !endDate) {
      // Add validation feedback here
      return;
    }

    const updatedSequence = {
      ...currentSequence,
      goal,
      description,
      startDate,
      endDate,
      selectedDays,
      color: selectedColor,
      updatedAt: new Date().toISOString(),
    };

    const success = await updateSequence(id, updatedSequence);
    if (success) {
      navigation.navigate('Navigation',{screen: 'Sequance'});
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Edit Sequence</Text>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          value={goal}
          onChangeText={setGoal}
          placeholder="Set Your Goal"
          placeholderTextColor="#666"
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Write a description"
          placeholderTextColor="#666"
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity
          style={styles.colorPickerButton}
          onPress={() => setShowColorPicker(true)}>
          <View
            style={[styles.colorPreview, {backgroundColor: selectedColor}]}
          />
        </TouchableOpacity>

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

        <Text style={styles.sectionTitle}>Select days for your sequence</Text>
        <View style={styles.daysContainer}>
          {weekDays.map(day => (
            <TouchableOpacity
              key={day}
              style={[
                styles.dayButton,
                selectedDays.includes(day) && styles.dayButtonSelected,
              ]}
              onPress={() => toggleDay(day)}>
              <Text
                style={[
                  styles.dayButtonText,
                  selectedDays.includes(day) && styles.dayButtonTextSelected,
                ]}>
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity>
      </View>

      {/* Calendar Modals with added props */}
      <CalendarModal
        visible={showStartCalendar}
        onClose={() => setShowStartCalendar(false)}
        onDayPress={handleStartDateSelect}
        minDate={new Date().toISOString().split('T')[0]}
        markedDates={markedDates}
        selectedColor={selectedColor}
      />

      <CalendarModal
        visible={showEndCalendar}
        onClose={() => setShowEndCalendar(false)}
        onDayPress={handleEndDateSelect}
        minDate={startDate}
        markedDates={markedDates}
        selectedColor={selectedColor}
      />

      {/* Color Picker Modal */}
      <ColorPickerModal
        visible={showColorPicker}
        onClose={() => setShowColorPicker(false)}
        colors={colors}
        onSelectColor={color => {
          setSelectedColor(color);
          setShowColorPicker(false);
        }}
      />
    </SafeAreaView>
  );
};

const ColorPickerModal = ({ visible, onClose, colors, onSelectColor }) => (
  <Modal
    animationType="fade"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}>
    <TouchableOpacity
      style={styles.modalOverlay}
      activeOpacity={1}
      onPress={onClose}>
      <View style={styles.colorPickerContainer}>
        {colors.map(color => (
          <TouchableOpacity
            key={color}
            style={[styles.colorOption, { backgroundColor: color }]}
            onPress={() => onSelectColor(color)}
          />
        ))}
      </View>
    </TouchableOpacity>
  </Modal>
);

const CalendarModal = ({ visible, onClose, onDayPress, minDate, markedDates, selectedColor }) => (
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
  form: {
    flex: 1,
    padding: 20,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 16,
    color: '#FCF8EA',
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  colorPickerButton: {
    alignSelf: 'center',
    marginVertical: 16,
  },
  colorPreview: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  sectionTitle: {
    fontSize: 16,
    color: '#FCF8EA',
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  dateInput: {
    width: '48%',
    marginBottom: 0,
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
    marginBottom: 24,
  },
  dayButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 8,
  },
  dayButtonSelected: {
    backgroundColor: '#FFEA9E',
  },
  dayButtonText: {
    color: '#FCF8EA',
    fontSize: 14,
  },
  dayButtonTextSelected: {
    color: '#000000',
  },
  updateButton: {
    backgroundColor: '#FFEA9E',
    borderRadius: 25,
    padding: 16,
    alignItems: 'center',
    marginTop: 'auto',
  },
  updateButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
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

export default EditSequence;
