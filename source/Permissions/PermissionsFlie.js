
import { PermissionsAndroid, Platform } from 'react-native';


// location permission
export const requestLocationPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: "Location Permission",
                        message: "This app needs access to your location to scan Wi-Fi networks.",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK",
                    }
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        }
        return true; // iOS handles permissions differently
    };

export const requestStoragePermission = async () => {
        try {
          if (Platform.OS === 'android') {
            if (Platform.Version >= 33) {
              // Android 13+ (API 33) - Use new media permissions
              const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO
              ]);
      
              if (
                granted['android.permission.READ_MEDIA_IMAGES'] !== PermissionsAndroid.RESULTS.GRANTED ||
                granted['android.permission.READ_MEDIA_VIDEO'] !== PermissionsAndroid.RESULTS.GRANTED
              ) {
                console.log('Storage permission denied');
                return false;
              }
            } else if (Platform.Version >= 30) {
              // Android 11 and 12 (Scoped Storage)
              const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.MANAGE_EXTERNAL_STORAGE,
                {
                  title: 'Storage Access Permission',
                  message: 'This app needs storage access to save files.',
                  buttonPositive: 'OK',
                }
              );
      
              if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Storage permission denied');
                return false;
              }
            } else {
              // Android 10 and below
              const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                  title: 'Storage Access Permission',
                  message: 'This app needs storage access to save files.',
                  buttonPositive: 'OK',
                }
              );
      
              if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Storage permission denied');
                return false;
              }
            }
          }
          return true;
        } catch (error) {
          console.error('Permission error:', error);
          return false;
        }
      };
      
      
 
