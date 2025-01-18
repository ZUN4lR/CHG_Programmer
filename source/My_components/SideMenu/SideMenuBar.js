import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { app_theme_clr_transparent_white, Poppins_Bold, theme_clr_1, theme_clr_1_2, theme_clr_1_2_bright, theme_clr_2, theme_clr_5_faded, width } from '../../../style_sheet/styles'

const SideMenuBar = ({ selected }) => {

    const [first, setfirst] = useState([
        { name: 'BOARDS' },
        { name: 'CATEGORIES' },
        { name: 'WORLD' },
    ])

    const [selectedoption, setSelectedoption] = useState('BOARDS')
    
    const handleSelectedMenu = (item) => {
        setSelectedoption(item.name)
        selected(item)
    }
    return (
        <View style={{
            backgroundColor: theme_clr_2, borderTopLeftRadius: width / 20, borderTopRightRadius: width / 20, justifyContent: 'space-around', flexDirection: 'row', gap: 10,
            transform: [{ rotate: '90deg' }],
            transformOrigin: 'left bottom',
        }}>
            {first.map((item, index) => (
                <TouchableOpacity
                key={index}
                    onPress={() => handleSelectedMenu(item)}
                    style={{
                        //  backgroundColor: 'red',
                    alignItems:'center' }}>

                    <Text key={index} style={{ fontFamily: Poppins_Bold, fontSize: width / 29, paddingVertical: 2, color: selectedoption==item.name?'#fff':app_theme_clr_transparent_white, transform: [{ rotate: '180deg' }] }}>{item.name}</Text>

                    <Text style={{ backgroundColor:selectedoption==item.name?theme_clr_1_2_bright:theme_clr_2, marginBottom: 5, height: 4, borderRadius: 100, width: 35, alignSelf: 'center' }}>...</Text>

                </TouchableOpacity>
            ))}
        </View>
    )
}

export default SideMenuBar

const styles = StyleSheet.create({})