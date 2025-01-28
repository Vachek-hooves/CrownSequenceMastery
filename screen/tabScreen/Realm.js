import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import MainLayout from '../../components/layout/MainLayout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import SettingsIcon from '../../components/Icons/SettingsIcon';
import TaskItem from '../../components/UI/TaskItem';
import CreateTaskModal from '../../components/UI/CreateTaskModal';
import {AppContext} from '../../store/context';
import NameHeader from '../../components/UI/NameHeader';
import {TaskPallette} from '../../data/TaskPalette';

const Realm = () => {
  const {tasks, addTask, updateTaskProgress, updateTaskClaimed, deleteTask} =
    useContext(AppContext);
  // const [nickname, setNickname] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [showNewTask, setShowNewTask] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  (function randomObjectSelector() {
    const intervalInSeconds = 3; // Interval in seconds
    const iterations = 10; // Number of iterations
    let iterationCount = 0;

    // console.log(
    //   `Random object selection started for ${iterations} iterations every ${intervalInSeconds} seconds.`,
    // );

    const timer = setInterval(() => {
      if (iterationCount >= iterations) {
        clearInterval(timer);
        console.log('Random selection stopped.');
        return;
      }

      // Randomly select an object
      const randomIndex = Math.floor(Math.random() * TaskPallette.length);
      const selectedObject = TaskPallette[randomIndex];

      // Log the selected object
      // console.log(`Selected object: ${JSON.stringify(selectedObject)}`);

      iterationCount++;
    }, intervalInSeconds * 1000);
  })();

  useEffect(() => {
    // loadUserData();
    setCurrentDate(formatDate(new Date()));
  }, []);


  const formatDate = date => {
    // Format: DD.MM.YYYY
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const handleAddTask = () => {
    setIsModalVisible(true);
  };

  const handleCreateTask = async newTask => {
    const success = await addTask(newTask);
    if (success) {
      setIsModalVisible(false);
    }
  };

  const handleTaskProgress = async (taskId, progress) => {
    await updateTaskProgress(taskId, progress);
  };

  const handleTaskClaim = async taskId => {
    await updateTaskClaimed(taskId, true);
  };

  const handleDeleteTask = async taskId => {
    await deleteTask(taskId);
  };

  return (
    <MainLayout>
      <SafeAreaView style={styles.container}>
        {/* Header Section */}
        <NameHeader />

        {/* Tasks Section */}
        <View style={styles.tasksContainer}>
          <View style={styles.tasksHeader}>
            <Text style={styles.tasksTitle}>Today's tasks</Text>
            <Text style={styles.tasksDate}>{currentDate}</Text>
          </View>

          {/* Add Task Button */}
          <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          {/* <TouchableOpacity style={styles.addButton} > */}
            <LinearGradient
              // colors={['#FFEA9E', '#FCF8EA']}
              colors={['#FF6B6B', '#4ECDC4']}
              style={styles.addButtonGradient}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}>
              <Text style={styles.addButtonText}>+</Text>
            </LinearGradient>
          </TouchableOpacity>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}>
            {/* Tasks List */}
            {tasks.length > 0 ? (
              <View style={styles.tasksList}>
                {tasks.map(task => (
                  <TaskItem
                    key={task.id}
                    title={task.title}
                    progress={task.progress}
                    isClaimed={task.isClaimed}
                    onProgressChange={progress =>
                      handleTaskProgress(task.id, progress)
                    }
                    onClaim={() => handleTaskClaim(task.id)}
                    onDelete={() => handleDeleteTask(task.id)}
                  />
                ))}
              </View>
            ) : (
              <View style={styles.noTasksContainer}>
                <Text style={styles.noTasksEmoji}>✨</Text>
                <Text style={styles.noTasksText}>No Tasks Today!</Text>
                <Text style={styles.noTasksSubtext}>
                  Enjoy a well-deserved break – you've earned it!
                </Text>
                <Text style={styles.noTasksSubtext}>
                  Take this time to plan your next move or start a new sequence.
                </Text>
              </View>
            )}
          </ScrollView>
        </View>

        <CreateTaskModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onCreateTask={handleCreateTask}
        />
      </SafeAreaView>
      <View style={{height: 100}} />
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  tasksContainer: {
    flex: 1,
  },
  tasksHeader: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    marginBottom: 20,
  },
  tasksTitle: {
    fontSize: 30,
    color: '#FCF8EA',
    fontWeight: 'bold',
  },
  tasksDate: {
    fontSize: 16,
    color: '#FCF8EA',
    opacity: 0.8,
  },
  addButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
    margin: 10,
  },
  addButtonGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
  },
  noTasksContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  noTasksEmoji: {
    fontSize: 32,
    marginBottom: 10,
  },
  noTasksText: {
    fontSize: 24,
    color: '#FCF8EA',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  noTasksSubtext: {
    fontSize: 18,
    color: '#FCF8EA',
    opacity: 0.8,
    textAlign: 'center',
    marginBottom: 10,
  },
  tasksList: {
    marginTop: 20,
  },
});

export default Realm;
