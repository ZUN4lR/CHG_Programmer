import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, StatusBar, Button, Alert, TouchableOpacity } from 'react-native';
import AppHeader from '../../My_components/Header/AppHeader';
import { app_theme_clr_transparent_white, Poppins_Bold, Poppins_Regular, theme_clr_1_2, theme_clr_1_2_bright, theme_clr_2, theme_clr_3 } from '../../../style_sheet/styles';
import WifiManager from "react-native-wifi-reborn";
import IconComponent from '../../My_components/Icon_Component/IconComponent';
import { requestLocationPermission } from '../../Permissions/PermissionsFlie';
import AddAndSendFileView from '../../My_components/View_Blocks/AddAndSendFileView';
import { useNavigation } from '@react-navigation/native'
import AppButton from '../../My_components/Buttons/AppButton';


const HomePage = ({ route = false }) => {

  const { refresh_wifi_details_trigger = false } = route.params || {};

  const navigation = useNavigation();

  const [connectedWifi, setConnectedWifi] = useState({ ssid: `--`, signal_strength: `--`, status: `--`, frequency: `--` });

  const getConnectedWifiDetails = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert("Permission Denied", "Location permission is required to scan Wi-Fi networks.");
      return;
    }

    setConnectedWifi({ ssid: `--`, signal_strength: `--`, status: `--`, frequency: `--` })

    try {

      const ssid = await WifiManager.getCurrentWifiSSID();
      const ip = await WifiManager.getIP();
      const signal_strength = await WifiManager.getCurrentSignalStrength();
      const status = await WifiManager.connectionStatus();
      const frequency = await WifiManager.getFrequency();



      console.log('Connected to SSID:', ssid);

      if (ssid) {
        setConnectedWifi({ ssid, ip, signal_strength, status, frequency });
      } else {
        Alert.alert('Error', 'No Wi-Fi connection found.');
      }
    } catch (error) {
      Alert.alert('Error', `Unable to fetch Wi-Fi details check your WiFi`);
      console.error(error);
    }
  };

  // const verifyHandShake = async () => {
  //   try {
  //     const handshakeURL = `http://192.168.4.1/handshake`;

  //     const body = JSON.stringify({
  //       handshakeKey: '1234',
  //     });

  //     const response = await fetch(handshakeURL, {
  //       method: 'POST',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       body: body,
  //     });

  //     const result = await response.text();
  //     if (response.ok) {
  //       // Alert.alert('Success', 'Handshake successfully!');
  //       setHandshake(true);
  //     } else {
  //       // Alert.alert('Error', `Handshake failed: ${result}`);
  //       setHandshake(false);
  //     }
  //   } catch (error) {
  //     setHandshake(false);
  //     // Alert.alert('Error', error.message || 'Network request failed');
  //   }
  // };



  useEffect(() => {
    if (refresh_wifi_details_trigger) {
      console.log('okokoko');

      getConnectedWifiDetails();
    }
  }, [refresh_wifi_details_trigger]);

  useEffect(() => {
    if (refresh_wifi_details_trigger) {
      console.log('Trigger received:', refresh_wifi_details_trigger);
      // verifyHandShake();
    }
  }, [refresh_wifi_details_trigger])




  return (
    <View style={{ backgroundColor: theme_clr_1_2, flex: 1 }}>

      <SafeAreaView />
      <StatusBar backgroundColor={theme_clr_1_2} />

      <AppHeader
        show_notification={true}
        new_notification={false}
      // settings={true}
      // drawer={true}
      />

      <View style={styles.connected_wifi_block}>

        {/* <Text>{JSON.stringify(connectedWifi,2,null).toString()}</Text> */}

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={styles.connected_wifi_text}>Connected Wi-Fi</Text>

          {/* <TouchableOpacity
            style={styles.btn_}
            onPress={() => getConnectedWifiDetails()}>
            <IconComponent name={'Feather'} icon={'refresh-ccw'} size={18} color='#fff' />
          </TouchableOpacity> */}

          <View style={{ alignSelf: 'flex-end', marginBottom: 5 }}>
            <AppButton
              on_press={() => navigation.navigate('SettingsPage', { scantrigger: true })}
              text_color="#fff"
              background_color={theme_clr_1_2}
              boxwidth={20}
              border={10}
              border_color={app_theme_clr_transparent_white}
              fsize={15}
              text={"SCAN"}
              btn_height={2}
            // disabled={isCooldown}
            />
          </View>

        </View>

        {connectedWifi ? (
          <View>

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.connected_device_data}>Name :
                <Text style={{ color: theme_clr_1_2_bright }}> {connectedWifi.ssid}</Text>
              </Text>

              <Text style={[styles.connected_device_data, { position: 'absolute', right: 0 }]}>Status :
                <Text style={{ color: theme_clr_1_2_bright }}> {connectedWifi.status == true || connectedWifi.ip == '192.168.4.1' || connectedWifi.ip == '192.168.4.2'  ? `Avalible` : `Not-Avalible`}</Text>
              </Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.connected_device_data}>Signal Strength :
                <Text style={{ color: theme_clr_1_2_bright }}> {connectedWifi.signal_strength}</Text>
              </Text>
              <Text style={[styles.connected_device_data, { position: 'absolute', right: 0 }]}>Frequency :
                <Text style={{ color: theme_clr_1_2_bright }}> {connectedWifi.frequency}</Text>
              </Text>
            </View>

          </View>
        ) : (
          <Text>No Wi-Fi connected</Text>
        )}

      </View>

      <AddAndSendFileView wifi_details={connectedWifi} />

      {/* <View style={styles.dottedBox}>
        <Text style={styles.text}>Dotted Border</Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({

  dottedBox: {
    width: 200,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#007BFF',
    borderRadius: 10,
    borderStyle: 'dotted', // This creates the dotted border
  },
  text: {
    fontSize: 16,
    color: '#007BFF',
  },
  connected_device_data: {
    fontFamily: Poppins_Bold,
    color: '#fff',
    fontSize: 12
  },
  connected_wifi_text: {
    fontFamily: Poppins_Bold,
    fontSize: 22,
    color: '#fff'
  },
  connected_wifi_block: {
    backgroundColor: theme_clr_3,
    borderRadius: 20,
    gap: 20,
    padding: 10,
    borderWidth: .5,
    borderColor: theme_clr_2,
    marginHorizontal: 10,
    marginVertical: 20
  },
  btn_: {
    padding: 8,
    backgroundColor: theme_clr_1_2,
    borderRadius: 1000,
    position: 'absolute',
    right: 0,
  },
});

export default HomePage;
