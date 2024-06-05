import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {SessionData, SessionContextType} from './SessionTypes';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Welcome: undefined;
};

const SessionContext = createContext<SessionContextType | null>(null);
type LoginScreenNavigationProp = NavigationProp<RootStackParamList, 'Login'>;

export const useSession = () =>
  useContext(SessionContext) as SessionContextType;

interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({children}) => {
  const [session, setSession] = useState<SessionData | null>(null);
  const navigation = useNavigation<LoginScreenNavigationProp>();

  useEffect(() => {
    const checkSession = async () => {
      const sessionData = await AsyncStorage.getItem('userSession');
      console.log(sessionData);
      if (sessionData) {
        const parsedData: SessionData = JSON.parse(sessionData);
        if (new Date().getTime() <= parsedData.expiration) {
          setSession(parsedData);
          navigation.navigate('Home');
        } else {
          navigation.navigate('Login');
        }
      } else {
        navigation.navigate('Login');
      }
    };

    checkSession();
  }, [navigation]);

  const login = (username: string) => {
    const newSession: SessionData = {
      username,
      expiration: new Date().getTime() + 24 * 60 * 60 * 1000, // 24 hours in milliseconds
    };
    AsyncStorage.setItem('userSession', JSON.stringify(newSession));
    setSession(newSession);
    navigation.navigate('Home');
  };

  const logout = async () => {
    await AsyncStorage.removeItem('userSession');
    setSession(null);
    navigation.navigate('Login');
  };

  return (
    <SessionContext.Provider value={{session, login, logout}}>
      {children}
    </SessionContext.Provider>
  );
};
