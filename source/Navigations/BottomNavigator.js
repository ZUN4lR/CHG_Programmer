// BottomTabNavigator.js
import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 import Page1 from '../screens/BottomScreens/Page1';
import Page2 from '../screens/BottomScreens/Page2';
import Page3 from '../screens/BottomScreens/Page3';
import Page4 from '../screens/BottomScreens/Page4';
import { app_theme_clr_solid_transparent_white, theme_clr_1_2, theme_clr_1_2_bright, theme_clr_2, theme_clr_3 } from '../../style_sheet/styles';
import IconComponent from '../My_components/Icon_Component/IconComponent';
import HomePage from '../screens/StackScreens/HomePage';
 

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

export default function BottomNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,

                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let iconFrom;
                    if (route.name === 'Home') {
                        iconName = 'home';
                        iconFrom = 'MaterialCommunityIcons';
                    } else if (route.name === 'Gsr') {
                        iconName = 'hardware-chip-outline';
                        iconFrom = 'Ionicons';
                    } else if (route.name === 'HeartRate') {
                        iconName = 'poker-chip';
                        iconFrom = 'MaterialCommunityIcons';
                    } else if (route.name === 'Spo2') {
                        iconName = 'clipboard-flow-outline';
                        iconFrom = 'MaterialCommunityIcons';
                    }

                    return (
                        <View
                            style={{
                                width: 40,
                                height: 40,
                                backgroundColor: focused ? theme_clr_1_2_bright : theme_clr_2,
                                borderRadius: 50,
                                borderWidth: focused ? 2 : 1,
                                borderColor: focused ? '#fff' : theme_clr_3,
                                justifyContent: 'center',
                                alignItems: 'center',
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 10 },
                                shadowOpacity: 1,
                                shadowRadius: 20,
                                elevation: 15,
                            }}
                        >
                            <IconComponent name={iconFrom} icon={iconName} size={20} color={focused ? theme_clr_2 : theme_clr_1_2_bright} />
                        </View>
                    );
                },
                tabBarActiveTintColor: theme_clr_3,

                tabBarStyle: {
                    position: 'absolute',
                    bottom: 10,
                    left: 20,
                    right: 20,
                    height: 55,
                    backgroundColor: theme_clr_2,
                    borderRadius: width/20,
                    borderColor: theme_clr_3,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 60 },
                    shadowOpacity: 1,
                    shadowRadius: 20,
                    elevation: 20,
                },

                // Customize tab label appearance
                // tabBarLabel: ({ focused }) => {
                //     return null; // Hide label for a cleaner design
                // },
                tabBarLabel: () => null,

            })}
            initialRouteName='Home'
        >
            <Tab.Screen name="Home" component={HomePage} />
            <Tab.Screen name="Gsr" component={Page2} />
            <Tab.Screen name="HeartRate" component={Page3} />
            <Tab.Screen name="Spo2" component={Page4} />
            {/* <Tab.Screen name="BodyTemperature" component={BodyTemperature} /> */}
        </Tab.Navigator>
    );
}
