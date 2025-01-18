// src/navigations/DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BottomNavigator from './BottomNavigator';
import { Poppins_Bold, theme_clr_1_2 } from '../../style_sheet/styles';

const Drawer = createDrawerNavigator();

function CustomDrawerContent({ state, navigation}) {

    return (
        <View style={{ flex: 1, marginVertical: 10, }}>
            <Text style={{ fontSize: 30,alignSelf:'center',fontFamily:Poppins_Bold,color:'#fff' }}>Drawer</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text style={[drawerstyle.drawer_text, { backgroundColor: state.index === 0 ? 'cyan' : 'grey' }]}>Home</Text>
            </TouchableOpacity>
             

            <TouchableOpacity onPress={() => navigation.navigate('Devices')}>
                <Text style={[drawerstyle.drawer_text, { backgroundColor: state.index === 1 ? 'cyan' : 'grey' }]}>Devices</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={async () => { 
            await set_user_credentials('0', '0')
            // await firebase_user_SignOut();
            await setIsAuthenticated(false);
            }}>
                <Text style={[drawerstyle.drawer_text, { backgroundColor: state.index === 2 ? 'cyan' : 'grey' }]}>Login out</Text>
            </TouchableOpacity>
            {/* Add more custom items here */}
        </View>
    );
}

export default function DrawerNavigator( ) {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                drawerStyle: {
                    backgroundColor: theme_clr_1_2, // Change background color
                    width: 240, // Set width of drawer

                },
                // headerStyle: {
                //     height: 40,
                //     backgroundColor: header_color,
                // },
                headerShown: false,

            }}
        >
                  {/* <Drawer.Screen name="Home" component={BottomNavigator} /> */}

         </Drawer.Navigator>
    );
}

const drawerstyle = StyleSheet.create({
    drawer_text: {
        fontSize: 20,
        color: '#000',
        margin: 5
    }
})