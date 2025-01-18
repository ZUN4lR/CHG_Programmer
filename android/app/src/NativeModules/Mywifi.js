import { NativeModules } from 'react-native';

const { MyWifiModule } = NativeModules;

const scanWifi = () => {
  MyWifiModule.scanWifiNetworks(
    (wifiNetworks) => {
      console.log('Wi-Fi Networks:', wifiNetworks);
    },
    (error) => {
      console.error('Error scanning Wi-Fi:', error);
    }
  );
};

export { scanWifi };
