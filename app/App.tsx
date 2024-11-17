import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import { Main } from './src/Screens/main';
import { Login } from './src/Screens/Login';
import { SignUp } from './src/Screens/SignUp';
import { UserProfile } from './src/Screens/UsersProfile';
import { UserSettings } from './src/Screens/UsersSettings';

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Main: undefined;
  UserProfile: undefined;
  UserSettings: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [isFontsLoaded] = useFonts({
    'GeneralSans-400': require('./src/assets/fonts/GeneralSans-Regular.otf'),
    'GeneralSans-600': require('./src/assets/fonts/GeneralSans-Semibold.otf'),
    'GeneralSans-700': require('./src/assets/fonts/GeneralSans-Bold.otf'),
  });

  if (!isFontsLoaded) {
    return null;
  }

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
            <Stack.Screen name="UserSettings" component={UserSettings} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login">
              {(props) => <Login {...props} onLogin={handleLogin} />}
            </Stack.Screen>
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
