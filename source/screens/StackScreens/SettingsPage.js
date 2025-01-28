import { ActivityIndicator, Alert, Button, FlatList, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, Platform, PermissionsAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { dark_white, Poppins_Bold, Poppins_Regular, theme_clr_1, theme_clr_1_2, theme_clr_1_2_bright, theme_clr_2 } from '../../../style_sheet/styles';
import GoBackHeader from '../../My_components/Header/GoBackHeader';
import AvalibleDevicesBar from '../../My_components/Bars/AvalibleDevicesBar';
import WifiManager from "react-native-wifi-reborn";
import AppButton from '../../My_components/Buttons/AppButton';
import DefaultLoading from '../../My_components/Loading/DefaultLoading';
import { requestLocationPermission } from '../../Permissions/PermissionsFlie';
import { useNavigation } from '@react-navigation/native'

const SettingsPage = ({ route = false }) => {
    const navigation = useNavigation();

    const { scantrigger = false } = route.params || {};

    const [connectedWifi, setConnectedWifi] = useState(null);
    const [loading, setLoading] = useState(false);
    const [wifiList, setWifiList] = useState([]); // List to hold available Wi-Fi networks
    const [scanAttempts, setScanAttempts] = useState(0); // Track scan attempts
    const [timer, setTimer] = useState(0); // Timer to track remaining seconds
    const [isCooldown, setIsCooldown] = useState(false);
    const [scanlimit, setScanlimit] = useState(false);

    const [selectedssid, setSelectedssid] = useState(null); // Track the selected SSID


    const fetchWifiList = async () => {
        // Clear the previous Wi-Fi list before fetching a new one
        setLoading(true)
        setWifiList(null);

        if (isCooldown) {
            Alert.alert("Cooldown", "Please wait 2 minutes before scanning again.");
            return;
        }

        try {
            // Disconnect from any current Wi-Fi network before scanning again
            await WifiManager.disconnect(); // Disconnect from current network

            // Wait for a moment before scanning to ensure proper disconnection
            setTimeout(async () => {
                await requestLocationPermission(); // Ensure permissions are granted
                const list = await WifiManager.reScanAndLoadWifiList(); // Scan for new networks
                setWifiList(list); // Set the new Wi-Fi list
                // console.log('Available Wi-Fi networks:', list);

                if (list == `Starting Android 9, it's only allowed to scan 4 times per 2 minuts in a foreground app.`) {
                    // Alert.alert('4 Scans per 2 Minutes are Allowed !');
                    setScanlimit(true)
                    setWifiList(null)
                }
                setScanAttempts(prevAttempts => prevAttempts + 1); // Increment scan attempts

                // Start cooldown timer after 4 attempts
                if (scanAttempts >= 4) {
                    startCooldown();
                }
                setLoading(false)

            }, 1000);

        } catch (error) {
            console.error('Error fetching Wi-Fi list:', error);
            setLoading(false)
        }

    };

    const startCooldown = () => {
        setIsCooldown(true);
        setTimer(120);

        const countdownInterval = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer <= 1) {
                    clearInterval(countdownInterval);
                    setIsCooldown(false);
                    setScanAttempts(0);
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);
    };

 
    const connectToWifi = async (ssid, password) => {
        try {
            await WifiManager.connectToProtectedSSID(ssid, password, false, false);
            Alert.alert("Success", `Connected to ${ssid}`);

        } catch (error) {
            Alert.alert("Error", `Failed to connect to ${ssid}`);
            console.error(error);
        }finally{
            navigation.navigate('HomePage', { refresh_wifi_details_trigger:  Math.random() })
        }
        
    };

    useEffect(() => {
        fetchWifiList();
    }, [scantrigger]);
    return (
        <View style={{ backgroundColor: theme_clr_1_2, flex: 1 }}>
            <SafeAreaView />
            <StatusBar backgroundColor={theme_clr_1_2} />
            <DefaultLoading visible={loading} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <GoBackHeader header_text='Avalible WiFi Networks' />

                {wifiList != null ?
                    <View style={{ gap: 10, paddingHorizontal: 10, paddingVertical: 20 }}>
                        {Array.isArray(wifiList) && wifiList && wifiList.map((item) => (
                            <AvalibleDevicesBar key={item.SSID} device={item}
                                on_connect={connectToWifi}
                                isSelected={selectedssid}
                                setSetected={setSelectedssid}
                            // on_device_press={}
                            />
                        ))
                        }
                    </View>
                    :
                    scanlimit ?

                        <View style={styles.error_view}>
                            <Text style={[styles.not_avalible_text]}>SCAN limit Reached <Text style={{ color: theme_clr_1_2_bright, fontFamily: Poppins_Bold }}> 4 Scans</Text> per <Text style={{ color: theme_clr_1_2_bright, fontFamily: Poppins_Bold }}>2 minutes</Text> are Allowed !!</Text>
                        </View>
                        :
                        <View style={styles.error_view}>
                            <Text style={[styles.not_avalible_text]}>Make sure your <Text style={{ color: theme_clr_1_2_bright, fontFamily: Poppins_Bold }}>Location</Text> & <Text style={{ color: theme_clr_1_2_bright, fontFamily: Poppins_Bold }}>WiFi</Text> both are ENABLED  !!</Text>
                        </View>
                }


            </ScrollView>
        </View>
    );
};

export default SettingsPage;

const styles = StyleSheet.create({

    not_avalible_text: {
        textAlignVertical: 'center',
        fontFamily: Poppins_Regular,
        alignSelf: 'center',
        marginVertical: 30,
        color: dark_white,
        fontSize: 13,
        textAlign: 'center',
    },
    error_view: {
        backgroundColor: theme_clr_2,
        paddingHorizontal: 50,
        margin: 20,
        borderRadius: 20
    },
});
