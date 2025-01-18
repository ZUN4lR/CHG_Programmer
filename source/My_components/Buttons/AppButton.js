import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { CurrentRenderContext } from '@react-navigation/native';
import { app_clr_white, theme_clr_1 } from '../../../style_sheet/styles';
import IconComponent from '../Icon_Component/IconComponent';

const { height, width } = Dimensions.get('screen');

const AppButton = ({ on_press,disabled=false, text, fsize=15, boxwidth, fstyle, text_color, border, btn_height, background_color, iconfrom, icon, icon_color }) => {
    return (
        <TouchableOpacity
        disabled={disabled}
        style={[styles._btn, {
            justifyContent: icon ? 'space-between' : 'center', borderRadius: border ? border : null, paddingVertical: btn_height ? btn_height : null, paddingHorizontal: boxwidth ? boxwidth : width / 20, backgroundColor: background_color ? background_color : theme_clr_1
        }]}
            onPress={on_press}>
            <Text style={{ fontSize: fsize, fontFamily: fstyle == 'regular' ? 'Poppins-Regular' : 'Poppins-Bold', color: text_color ? text_color : '#0000009f' }}>{text}</Text>

            {icon &&
                <IconComponent name={iconfrom} icon={icon} size={20} color={icon_color} />
            }
        </TouchableOpacity>
    )
}

export default AppButton

const styles = StyleSheet.create({

    _btn: {
        flexDirection: 'row',
        textAlignVertical: 'center',
        alignItems: 'center',
    },


})