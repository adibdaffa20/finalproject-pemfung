import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const TaskDetails = ({ route, navigation }) => {
    const { task } = route.params;

    const handleDelete = () => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this task?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', onPress: () => navigation.goBack() }
            ]
        );
    };

    const handleDone = () => {
        Alert.alert(
            'Mark as Done',
            'Are you sure you want to mark this task as done?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Done', onPress: () => navigation.goBack() }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.label}>Mata Kuliah</Text>
                <Text style={styles.content}>{task.class}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>Deadline</Text>
                <Text style={styles.content}>Deadline: {task.deadline}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>Deskripsi Tugas</Text>
                <Text style={styles.content}>{task.title}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.doneButton]} onPress={handleDone}>
                    <Text style={styles.buttonText}>Done</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20
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
        marginBottom: 5
    },
    content: {
        fontSize: 16
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    button: {
        flex: 1,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5
    },
    deleteButton: {
        backgroundColor: '#ff4d4d',
    },
    doneButton: {
        backgroundColor: '#4caf50',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export default TaskDetails;