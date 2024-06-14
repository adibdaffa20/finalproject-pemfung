import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SignUpScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SignUp'
>;

type Props = {
  navigation: SignUpScreenNavigationProp;
};

interface SignUpResponse {
  message?: string;
  error?: string;
}

const SignUp: React.FC<Props> = ({navigation}) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [nickname, setNickname] = useState<string>(''); // Tambahkan state untuk nama panggilan
  const [loading, setLoading] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');

  const handleSignUp = async () => {
    if (!username || !password || !nickname) {
      setStatusMessage('Please fill in all fields');
      return;
    }

    setLoading(true);
    setStatusMessage('');
    console.log(JSON.stringify({username, password, name: nickname}));
    try {
      const response = await fetch('http://127.0.0.1:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password, name: nickname}),
      });
      const json = (await response.json()) as SignUpResponse;
      if (response.status === 200 || response.status === 201) {
        await AsyncStorage.setItem('username', username);
        await AsyncStorage.setItem('nickname', nickname); // Simpan nama panggilan di AsyncStorage
        setStatusMessage(
          'Account successfully created. Redirecting to login...',
        );
        setUsername('');
        setPassword('');
        setNickname(''); // Reset nickname
        setTimeout(() => navigation.replace('Login'), 2000);
      } else {
        setStatusMessage(json.error || 'Registration failed. Unknown error.');
      }
    } catch (error) {
      setStatusMessage('Unable to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/taskify.png')} style={styles.logo} />
      <Text style={styles.statusMessage}>{statusMessage}</Text>
      <Text style={styles.title}>Create Your Account</Text>
      <TextInput
        style={styles.input}
        placeholder='Nama Panggilan'
        value={nickname}
        onChangeText={setNickname}
      />
      <TextInput
        style={styles.input}
        placeholder='Username'
        value={username}
        onChangeText={setUsername}
        autoCapitalize='none'
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSignUp}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color='#fff' />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>
      <Text style={styles.footerText}>
        Already have an account?{' '}
        <Text
          style={styles.loginText}
          onPress={() => navigation.replace('Login')}
        >
          Log In
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  statusMessage: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    paddingVertical: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00008b',
  },
  input: {
    width: '80%',
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
  },
  button: {
    width: '80%',
    height: 45,
    backgroundColor: '#00008b',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
  },
  loginText: {
    color: '#00008b',
    fontWeight: 'bold',
  },
});

export default SignUp;
