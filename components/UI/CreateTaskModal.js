import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CreateTaskModal = ({visible, onClose, onCreateTask}) => {
  const [taskName, setTaskName] = useState('');
  const [taskGoal, setTaskGoal] = useState('');

  const handleCreate = () => {
    if (taskName.trim() && taskGoal.trim()) {
      onCreateTask({
        title: taskName,
        goal: taskGoal,
        progress: 0,
      });
      setTaskName('');
      setTaskGoal('');
      onClose();
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Create New Task</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Task Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter task name"
              placeholderTextColor="rgba(252, 248, 234, 0.5)"
              value={taskName}
              onChangeText={setTaskName}
              maxLength={30}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Goal</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your goal"
              placeholderTextColor="rgba(252, 248, 234, 0.5)"
              value={taskGoal}
              onChangeText={setTaskGoal}
              maxLength={50}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCreate}>
              <LinearGradient
                colors={['#FFEA9E', '#FCF8EA']}
                style={styles.createButton}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}>
                <Text style={styles.createButtonText}>Create</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 24,
    color: '#FCF8EA',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: '#FCF8EA',
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 12,
    color: '#FCF8EA',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    padding: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FCF8EA',
    minWidth: 120,
  },
  cancelButtonText: {
    color: '#FCF8EA',
    textAlign: 'center',
    fontSize: 16,
  },
  createButton: {
    borderRadius: 20,
    minWidth: 120,
  },
  createButtonText: {
    padding: 12,
    color: '#000',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateTaskModal;
