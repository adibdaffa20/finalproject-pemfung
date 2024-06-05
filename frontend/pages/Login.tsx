import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {useSession} from '../SessionContext';

// Define the types for the navigation prop if you are using React Navigation
type RootStackParamList = {
  HomeTabs: undefined; // Define other parameters for other screens if needed
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HomeTabs'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

// Define the response structure from your API
interface LoginResponse {
  message?: string;
  error?: string;
}

const Login: React.FC<Props> = ({navigation}) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const {login} = useSession();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
      });
      const json = (await response.json()) as LoginResponse;
      if (response.status === 200) {
        login(username);
        navigation.replace('HomeTabs');
      } else {
        // Show error message from API response
        Alert.alert('Login Failed', json.error || 'Unknown error');
      }
    } catch (error) {
      // Handle errors like loss of connectivity
      Alert.alert('Login Failed', 'Unable to connect to server');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <TextInput
        style={styles.input}
        placeholder='Username'
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title='Log In' onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Login;
