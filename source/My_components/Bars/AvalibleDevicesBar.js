import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Poppins_Regular, theme_clr_1_2, theme_clr_2, theme_clr_3 } from '../../../style_sheet/styles'
import AppButton from '../Buttons/AppButton'

const AvalibleDevicesBar = ({ name }) => {
    return (
        <View style={styles.main_view}>


            <Text style={styles.name}>{name}</Text>


            <AppButton
                //  on_press={}
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

            {/* <Textinput
              set_val={(text) => setWifipassword(text)}
              place_holder="Set Password ..."
              value={wifipassword}
              iconfrom="FontAwesome6"
              // type={'numeric'}
              current={deviceData && deviceData.password ? deviceData.password : ` - -`}
              bg_color={theme_clr_2}
              icon="password"
            />
             */}

        </View>
    )
}

export default AvalibleDevicesBar

const styles = StyleSheet.create({
    main_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme_clr_2,
        borderRadius: 15,
        padding: 10
    },
    name: {
        fontSize: 16,
        fontFamily: Poppins_Regular,
        color: '#fff',
        paddingTop: 2
    },
})