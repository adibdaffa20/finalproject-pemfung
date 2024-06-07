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
import {useSession} from '../SessionContext';
import {RootStackParamList} from '../AppNavigator';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

interface LoginResponse {
  message?: string;
  error?: string;
}

const Login: React.FC<Props> = ({navigation}) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>(''); // New state for status messages

  const {login} = useSession();

  const handleLogin = async () => {
    if (!username || !password) {
      setStatusMessage('Please fill in all fields'); // Update status message instead of alert
      return;
    }

    setLoading(true);
    setStatusMessage(''); // Clear status message before attempting to log in
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
        setStatusMessage('Login successful. Redirecting...');
        setTimeout(() => {
          login(username);
          navigation.replace('HomeTabs');
        }, 2000); // Delay to show status message before redirect
      } else {
        setStatusMessage(json.error || 'Login failed. Unknown error.'); // Show error in status message
      }
    } catch (error) {
      setStatusMessage('Unable to connect to server'); // Use status message for server errors
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/taskify.png')} style={styles.logo} />
      <Text style={styles.statusMessage}>{statusMessage}</Text>{' '}
      {/* Display the status message */}
      <Text style={styles.title}>Welcome Back</Text>
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
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color='#fff' />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
      <Text style={styles.footerText}>
        Don't have an account?{' '}
        <Text
          style={styles.signUpText}
          onPress={() => navigation.replace('SignUp')}
        >
          Sign Up
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  statusMessage: {
    fontSize: 16,
    color: 'red', // Choose a color that suits your UI theme
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
  signUpText: {
    color: '#00008b',
    fontWeight: 'bold',
  },
});

export default Login;
