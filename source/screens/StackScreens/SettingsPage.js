import { ActivityIndicator, Alert, Button, FlatList, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { theme_clr_1_2, theme_clr_2 } from '../../../style_sheet/styles'
import GoBackHeader from '../../My_components/Header/GoBackHeader'
import AvalibleDevicesBar from '../../My_components/Bars/AvalibleDevicesBar'
import WifiManager from "react-native-wifi-reborn";
 

const SettingsPage = () => {
    const [connectedWifi, setConnectedWifi] = useState(null);
    const [loading, setLoading] = useState(false);

const getConnectedWifiDetails = async () => {
    setLoading(true);
    try {
        const ssid = await WifiManager.getCurrentWifiSSID();
        console.log('Connected to SSID:', ssid);

        if (ssid) {
            setConnectedWifi({
                ssid,
            });
        } else {
            Alert.alert('Error', 'No Wi-Fi connection found.');
        }
    } catch (error) {
        Alert.alert('Error', 'Unable to fetch connected Wi-Fi details.');
        console.error(error);
    } finally {
        setLoading(false);
    }
};


    useEffect(() => {
        // Check connected Wi-Fi details every time the component mounts
        getConnectedWifiDetails();
    }, []);


    const connectToWifi = async (ssid, password) => {
        try {
            // Set isWep and isHidden to appropriate values based on your use case.
            // For WPA/WPA2 networks, set isWep to false, and isHidden depends on the network.
            const isWep = false;  // Update if the network uses WEP encryption
            const isHidden = false; // Set true if the network is hidden
            await WifiManager.connectToProtectedSSID(ssid, password, isWep, isHidden);
            Alert.alert("Success", `Connected to ${ssid}`);
        } catch (error) {
            Alert.alert("Error", `Failed to connect to ${ssid}`);
            console.error(error);
        }
    };

    return (
        <View style={{ backgroundColor: theme_clr_1_2, flex: 1 }}>

            <SafeAreaView />
            <StatusBar backgroundColor={theme_clr_1_2} />

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <>
                        <Text>Connected Wi-Fi Details:</Text>
                        {connectedWifi ? (
                            <>
                                <Text>SSID: {connectedWifi.ssid}</Text>
                                <Text>BSSID: {connectedWifi.bssid}</Text>
                            </>
                        ) : (
                            <Text>No Wi-Fi connected</Text>
                        )}
                    </>
                )}
                <Button title="Refresh" onPress={getConnectedWifiDetails} />
            </View>


            <GoBackHeader />


            <ScrollView
                showsVerticalScrollIndicator={false}>

              
                {/* <View style={{ alignSelf: 'flex-end', marginHorizontal: 10 }}>
                    <AppButton
                        on_press={scanWifi}
                        disabled={false}
                        text={'SCAN'}
                        fsize={14}
                        boxwidth={30}
                        //  fstyle={20}
                        text_color={'#fff'}
                        border={10}
                        btn_height={5}
                        background_color={theme_clr_2}
                    />

                </View>
                 */}
            </ScrollView>
        </View>
    )
}

export default SettingsPage

const styles = StyleSheet.create({})