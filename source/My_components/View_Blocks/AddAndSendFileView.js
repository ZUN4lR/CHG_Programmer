import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import { app_clr_theme_light, app_theme_clr_fade_white, app_theme_clr_transparent_white, bg_app_theme, dark_white, Poppins_Bold, Poppins_Regular, theme_clr_1, theme_clr_1_2, theme_clr_1_2_bright, theme_clr_2, theme_clr_3, theme_clr_6_white_medium, theme_clr_8_blood, width } from '../../../style_sheet/styles';
import IconComponent from '../Icon_Component/IconComponent';
import AppButton from '../Buttons/AppButton';
import DefaultLoading from '../Loading/DefaultLoading';
import SimpleProgressBar from '../ProgressBar/SimpleProgressBar';
import { generateRandomNumbers } from '../../../HelperFunctions/Functions';
import WifiManager from 'react-native-wifi-reborn'; // Ensure you have this import for WifiManager
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';
import { saveFileToCHGProgrammerFolder } from '../../../HelperFunctions/App_Local_Storage/Storage_Functions';

const AddAndSendFileView = ({wifi_details}) => {

    const [show_progress_bar, setShow_progress_bar] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const selectFile = async () => {
        try {
            const file = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.allFiles],
            });

            console.log(file);

            if (!file.name.includes('.bin')) {
                setSelectedFile(null);
                Alert.alert('Please select a valid file');

            } else {
                setSelectedFile({
                    uri: file.uri,
                    name: file.name,
                    type: 'application/octet-stream',
                });
            }

            console.log('File Selected', `Selected file: ${file.name}`);
        } catch (error) {
            if (DocumentPicker.isCancel(error)) {
                console.log('Cancelled', 'No file selected');
            } else {
                console.log('Error', error.message);
            }
        }
    };

    const checkESP32Availability = async () => {
        try {
            const response = await fetch(`http://192.168.4.1`, {
                method: 'GET',
            });

            if (response.ok) {
                // Alert.alert('Success', 'ESP32 is available.');
                return true;
            } else {
                Alert.alert('Error', `ESP32 responded with status: ${response.status}`);
                return false;
            }
        } catch (error) {
            Alert.alert('Error', 'Please connect to a valid device or check you internet connection.');
            console.error('ESP32 Check Error:', error.message);
            return false;
        }
    };

    const uploadFile = async () => {
        if (!selectedFile) {
            Alert.alert('Error', 'No file selected. Please select a file first.');
            return;
        }

        setShow_progress_bar(true);

        setTimeout(async () => {
            try {
                let filePath = selectedFile.uri;

                if (filePath.startsWith('content://')) {
                    const destPath = RNFS.DocumentDirectoryPath + '/' + selectedFile.name;
                    await RNFS.copyFile(filePath, destPath);
                    filePath = destPath;
                }

                const fileURI = 'file://' + filePath;

                const formData = new FormData();
                formData.append('u', {
                    uri: fileURI,
                    name: selectedFile.name,
                    type: selectedFile.type,
                });

                // Define the ESP32 server endpoint
                const uploadURL = `http://192.168.4.1/u`;

                // Upload the file using fetch
                const response = await fetch(uploadURL, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                    body: formData,
                });

                const result = await response.text();
                if (response.ok) {
                    Alert.alert('Success', 'Firmware uploaded successfully!');
                    setSelectedFile(null);
                    setShow_progress_bar(false);
                } else {
                    Alert.alert('Error', `Upload failed: ${result}`);
                }
            } catch (error) {
                Alert.alert('Error', error.message || 'Network request failed');
            } finally {
                setShow_progress_bar(false);
            }
        }, 10000);


    };



    const uploadAndCheckFile = async () => {
        try {
            // await uploadFile();

            // const localIP = await WifiManager.getIP();
            // console.log('ipppppp:', localIP);

            if (wifi_details.ip === '192.168.4.1' || wifi_details.ip === '192.168.4.2') {
                const isESP32Available = await checkESP32Availability();

                if (isESP32Available) {
                    await uploadFile();
                } else {
                    Alert.alert('Error', 'Please connect to a valid device or check you internet connection.');
                }
            } else {
                Alert.alert('Error', 'Please connect to a valid device or check you internet connection.');
            }
        } catch (error) {
            Alert.alert('Error', `An error occurred: ${error.message}`);
        }
    };

    useEffect(() => {
        // Listen for incoming shared files
        ReceiveSharingIntent.getReceivedFiles(
            (files) => {
                const updatedFiles = files.map((file) => {
                    let fileName = file.fileName;
                    const extensionMap = {
                        'application/octet-stream': '.bin',
                        // 'application/pdf': '.pdf',
                        // Add more mappings if needed
                    };

                    // Derive the extension if missing
                    if (!fileName.includes('.') || fileName.endsWith('.')) {
                        const extension = extensionMap[file.mimeType] || '';
                        fileName = `${fileName.replace(/\.$/, '')}${extension}`;
                    }

                    return { ...file, fileName };

                });

                console.log('Updated Files:', updatedFiles);

                if (!updatedFiles[0].fileName.includes('.bin')) {
                    setSelectedFile(null);
                    Alert.alert('Please select a valid file');

                } else {
                    setSelectedFile({
                        uri: updatedFiles[0].contentUri,
                        name: updatedFiles[0].fileName,
                        type: 'application/octet-stream',
                    });
                }

            },
            (error) => {
                console.error(error);
            },
            'myGroupIdentifier' // Optional group identifier for iOS
        );

        // Clean up when the component is unmounted
        return () => {
            ReceiveSharingIntent.clearReceivedFiles();
        };
    }, []);

    return (
        <View style={styles.overlay}>

            {show_progress_bar &&
                <SimpleProgressBar visible={show_progress_bar} total={100} />
            }


            <TouchableOpacity
                onPress={() => selectFile()}
                style={[styles.addfile, { backgroundColor: selectedFile ? theme_clr_1_2 : app_clr_theme_light }]}>

                {selectedFile &&
                    <TouchableOpacity
                        onPress={() => saveFileToCHGProgrammerFolder(selectedFile)}
                        style={[styles.save_btn]}>
                        <Text style={{ fontSize: 15, color: '#fff', fontFamily: Poppins_Bold }}>SAVE</Text>
                    </TouchableOpacity>
                }

                {selectedFile ?
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.bintext}>Change</Text>
                        <IconComponent name={'Feather'} icon={'edit-3'} size={40} color={app_theme_clr_transparent_white} />

                    </View> :
                    <IconComponent name={'Feather'} icon={'plus'} size={60} color={app_theme_clr_transparent_white} />
                }
            </TouchableOpacity>




            {selectedFile?.name ?
                <Text style={[styles.filename, { color: theme_clr_1_2_bright }]}>{selectedFile.name}</Text>
                :
                <Text style={[styles.filename]}>Select File</Text>
            }






            {selectedFile?.name &&
                <>
                    <AppButton
                        on_press={() => uploadAndCheckFile()}
                        text_color="#fff" background_color={theme_clr_1_2} boxwidth={12} border={10} fsize={15} text="Update Firmware" btn_height={5} />


                    <Text style={[styles.not_avalible_text, { color: dark_white, fontSize: 12 }]}>Make sure your <Text style={{ color: theme_clr_1_2_bright, fontFamily: Poppins_Bold }}>Location</Text> is ENABLED & <Text style={{ color: theme_clr_1_2_bright, fontFamily: Poppins_Bold }}>WiFi</Text> is connected to same DEVICE !!</Text>
                </>
            }

        </View>
    )
}

export default AddAndSendFileView

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        padding: 20,
        gap: 10,
        backgroundColor: theme_clr_2,
    },

    addfile: {
        paddingVertical: 35,
        borderRadius: 15,
        borderWidth: .5,
        borderColor: dark_white,
        alignItems: 'center',
        overflow: 'hidden'
    },
    filename: {
        fontSize: 18,
        color: '#fff',
        fontFamily: Poppins_Regular,
        marginBottom: 10,
        textAlign: 'center'
    },
    bintext: {
        fontSize: 27.5,
        color: theme_clr_6_white_medium,
        paddingHorizontal: 4,
        paddingTop: 12.5,
        fontFamily: Poppins_Bold
    },
    not_avalible_text: {
        fontFamily: Poppins_Regular,
        alignSelf: 'center',
        textAlign: 'center',
        color: theme_clr_1,
    },
    save_btn: {
        backgroundColor: theme_clr_3,
        position: 'absolute',
        alignSelf: 'flex-end',
        borderBottomLeftRadius: 10,
        paddingHorizontal: 30,
        paddingVertical: 2,
        borderLeftWidth: .5,
        borderBottomWidth: .5,
        borderColor: dark_white
    },
})