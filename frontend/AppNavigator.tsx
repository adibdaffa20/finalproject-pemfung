import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './pages/Home'; // Ensure Home.tsx is also typed
import Login from './pages/Login'; // Ensure Login.tsx is also typed
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {NavigationContainer} from '@react-navigation/native';
import {SessionProvider} from './SessionContext';

type RootStackParamList = {
  Login: undefined;
  HomeTabs: undefined;
};

type HomeTabParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<HomeTabParamList>();

const HomeTabs: React.FC = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'account' : 'account-outline';
        } else if (route.name === 'Settings') {
          iconName = focused ? 'settings' : 'settings-outline';
        }
        return <MaterialCommunityIcons size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name='Home' component={Home} />
    <Tab.Screen name='Profile' component={Profile} />
    <Tab.Screen name='Settings' component={Settings} />
  </Tab.Navigator>
);

const AppNavigator: React.FC = () => (
  <NavigationContainer>
    <SessionProvider>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen
          name='HomeTabs'
          component={HomeTabs}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </SessionProvider>
  </NavigationContainer>
);

export default AppNavigator;