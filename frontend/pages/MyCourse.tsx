import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-datepicker';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../AppNavigator';
import axios from 'axios'; // Make sure to install axios with `npm install axios` if not already installed

type MyCourseScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MyCourse'
>;

type Props = {
  navigation: MyCourseScreenNavigationProp;
};

const MyCourse: React.FC<Props> = ({navigation}) => {
  const [selectedDosen, setSelectedDosen] = useState('');
  const [selectedMataKuliah, setSelectedMataKuliah] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  useEffect(() => {
    // Update selectedMataKuliah based on the selectedDosen
    switch (selectedDosen) {
      case 'DMX':
        setSelectedMataKuliah('appledev');
        break;
      case 'MDX':
        setSelectedMataKuliah('uiux');
        break;
      case 'ALX':
        setSelectedMataKuliah('webdev');
        break;
      case 'KMX':
        setSelectedMataKuliah('iot');
        break;
      case 'RFX':
        setSelectedMataKuliah('thesis');
        break;
      default:
        setSelectedMataKuliah('');
        break;
    }
  }, [selectedDosen]);

  const handleSubmit = () => {
    // API endpoint where you want to send the form data
    const apiURL = 'http://127.0.0.1:5000/api/tugas';

    // Form data to send in the POST request
    const formData = {
      nama: selectedDosen,
      kategori: selectedMataKuliah,
      deskripsi: description,
      deadline: deadline,
    };

    // Making a POST request using Axios
    axios
      .post(apiURL, formData)
      .then((response) => {
        navigation.replace('HomeTabs');
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle errors, maybe show an error message
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nama Dosen:</Text>
      <Picker
        selectedValue={selectedDosen}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedDosen(itemValue)}
      >
        <Picker.Item label='Pilih Dosen' value='' />
        <Picker.Item label='Daud Muhajir' value='DMX' />
        <Picker.Item label='Alqis Rausanfita' value='ALX' />
        <Picker.Item label='Muhammad Dzulfikar' value='MDX' />
        <Picker.Item label='Khaarisma Monika' value='KMX' />
        <Picker.Item label='Rizky Fenaldo' value='RFX' />
      </Picker>
      <Text style={styles.label}>Mata Kuliah:</Text>
      <Picker
        selectedValue={selectedMataKuliah}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedMataKuliah(itemValue)}
        enabled={false} // Disable user interaction as it's automatically set
      >
        <Picker.Item label='Mata Kuliah' value='' />
        <Picker.Item label='UI/UX' value='uiux' />
        <Picker.Item label='Apple Dev' value='appledev' />
        <Picker.Item label='Web Dev' value='webdev' />
        <Picker.Item label='Thesis' value='thesis' />
        <Picker.Item label='IoT' value='iot' />
      </Picker>
      <Text style={styles.label}>Deskripsi Tugas:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <Text style={styles.label}>Deadline:</Text>
      <TextInput
        style={styles.input}
        value={deadline}
        onChangeText={setDeadline}
      />
      {/* <DatePicker
        style={styles.date}
        date={deadline}
        mode='date'
        placeholder='Pilih Tanggal'
        format='YYYY-MM-DD'
        minDate='2023-01-01'
        maxDate='2025-12-31'
        confirmBtnText='OK'
        cancelBtnText='Batal'
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0,
          },
          dateInput: {
            marginLeft: 36,
          },
        }}
        onDateChange={(date: never) => {
          setDeadline(date);
        }}
      /> */}
      <Button title='Tambah' onPress={handleSubmit} color={'#00008b'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  date: {
    width: '100%',
    marginBottom: 16,
  },
});

export default MyCourse;
