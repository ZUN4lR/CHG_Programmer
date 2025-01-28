import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { app_theme_clr_white, Poppins_Regular, theme_clr_1_2, theme_clr_2, theme_clr_3 } from '../../../style_sheet/styles'
import AppButton from '../Buttons/AppButton'
import Textinput from '../TextInputs/Textinput'

const AvalibleDevicesBar = ({ device, on_connect, isSelected, setSetected }) => {
    const [wifipassword, setWifipassword] = useState('password');
    const [passwordbox, setPasswordbox] = useState(false);

    const handleDeviceConnection = () => {
        if (wifipassword.trim() && wifipassword.length >= 8) {
            on_connect(device.SSID, wifipassword);
        }
        else {
            Alert.alert('Password length must be atleast 8 characters')
            setSetected(device)
        }
    }
    const handleDeviceSelect = () => {
        if (device == isSelected) {
            setSetected('')
        }
        else {
            setSetected(device)
        }
    }

    return (

        <TouchableOpacity style={{ backgroundColor: theme_clr_2, borderRadius: 15, padding: 10, gap: 10 }}
            onPress={() => handleDeviceSelect()}
        >
            <View style={styles.main_view}>


                <Text style={styles.name}>{device.SSID}</Text>


                <AppButton
                    on_press={() => handleDeviceConnection()}

                    disabled={false}
                    text={'Connect'}
                    fsize={12}
                    boxwidth={10}
                    //  fstyle={20}
                    text_color={'#fff'}
                    border={10}
                    btn_height={3}
                    background_color={theme_clr_1_2}
                />


            </View>

            {device == isSelected &&
                <Textinput
                    set_val={(text) => setWifipassword(text)}
                    place_holder="Enter Password ..."
                    value={wifipassword}
                    iconfrom="FontAwesome6"
                    // type={'numeric'}
                    //   current={device && device.password ? device.password : ` - -`}
                    bg_color={theme_clr_2}
                    icon_color={app_theme_clr_white}
                    icon="password"
                />
            }

        </TouchableOpacity >
    )
}

export default AvalibleDevicesBar

const styles = StyleSheet.create({
    main_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // padding: 10
    },
    name: {
        fontSize: 16,
        fontFamily: Poppins_Regular,
        color: '#fff',
        paddingTop: 2
    },
})