import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import axios from 'axios'; // Make sure to install axios with `npm install axios` if not already installed
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

// Assuming you have a StackNavigator setup elsewhere in your app
type RootStackParamList = {
  TaskDetails: {
    task: {
      id: string; // Ensure there's an 'id' in the task object for API calls
      class: string;
      deadline: string;
      title: string;
    };
  };
};

type TaskDetailsRouteProp = RouteProp<RootStackParamList, 'TaskDetails'>;
type TaskDetailsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'TaskDetails'
>;

interface TaskDetailsProps {
  route: TaskDetailsRouteProp;
  navigation: TaskDetailsNavigationProp;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({route, navigation}) => {
  const {task} = route.params;

  const handleDone = () => {
    axios
      .delete(`http://127.0.0.1:5000/api/tugas/${task.id}`) // Using `task.id` directly here
      .then((response) => {
        Alert.alert('Success', 'Task has been marked as done and deleted.');
        navigation.goBack(); // Navigate back after deletion
      })
      .catch((error) => {
        Alert.alert('Error', 'Failed to delete the task.');
        console.error('Error deleting task:', error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.label}>Mata Kuliah</Text>
        <Text style={styles.content}>{task.class}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Deadline</Text>
        <Text style={styles.content}>{task.deadline}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Deskripsi Tugas</Text>
        <Text style={styles.content}>{task.title}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.doneButton]}
          onPress={handleDone} // Updated to call without argument
        >
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  doneButton: {
    backgroundColor: '#f44336',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  section: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderRadius: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4caf50',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TaskDetails;
