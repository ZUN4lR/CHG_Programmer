import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../screens/StackScreens/HomePage';
import DrawerNavigator from './DrawerNavigator';
import SettingsPage from '../screens/StackScreens/SettingsPage';
import { theme_clr_1_2 } from '../../style_sheet/styles';
import { SafeAreaView } from 'react-native';
import WifiComponent from '../screens/TestingScreens/WifiComponent';

const Stack = createStackNavigator();
export default function StackNavigator() {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme_clr_1_2 }}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            height: 20, // Set custom header height
            marginVertical: 0, // Adjust vertical margin
          },
        }}
        initialRouteName='HomePage'
      >

        <Stack.Screen name="AppDrawer" options={{ headerShown: false }} component={DrawerNavigator} />


        <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />
        <Stack.Screen name="SettingsPage" component={SettingsPage} options={{ headerShown: false }} />

        {/* testing pages */}
        <Stack.Screen name="WifiComponent" component={WifiComponent} options={{ headerShown: false }} />


      </Stack.Navigator>
    </SafeAreaView>
  );
}
