import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import MyCourse from './pages/MyCourse';
import TaskDetail from './pages/TaskDetail';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {NavigationContainer} from '@react-navigation/native';
import {SessionProvider} from './SessionContext';

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  HomeTabs: undefined;
  TaskDetail: undefined;
};

type HomeTabParamList = {
  Home: undefined;
  Profile: undefined;
  MyCourse: undefined;
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
        } else if (route.name === 'MyCourse') {
          iconName = focused ? 'book' : 'book-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'account' : 'account-outline';
        }
        return (
          <MaterialCommunityIcons
            name={iconName as keyof typeof MaterialCommunityIcons.glyphMap}
            size={size}
            color={color}
          />
        );
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name='Home' component={Home} />
    <Tab.Screen name='MyCourse' component={MyCourse} />
    <Tab.Screen name='Profile' component={Profile} />
  </Tab.Navigator>
);

const AppNavigator: React.FC = () => (
  <NavigationContainer>
    <SessionProvider>
      <Stack.Navigator initialRouteName='HomeTabs'>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='SignUp' component={SignUp} />
        <Stack.Screen name="TaskDetail" component={TaskDetail} />
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