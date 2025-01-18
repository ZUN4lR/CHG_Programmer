import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { app_clr_theme_light, height, Poppins_Bold, theme_clr_1_2_faded, theme_clr_2_faded, theme_clr_5_faded, width } from '../../../style_sheet/styles'
import SideMenuBar from '../SideMenu/SideMenuBar';
import CardSlider from '../sliders/CardSlider';
import IconComponent from '../Icon_Component/IconComponent';
import * as Animatable from 'react-native-animatable';
import { fade_slide_In, fade_slide_Out } from '../../Animations/MyAnimation';

const MenuBlock = () => {
    const [first, setFirst] = useState([
        { name: 'Master Board1' },
        { name: 'Master Board2' },
        { name: 'Master Board3' },
        { name: 'Master Board4' },
        { name: 'Clip Board1' },
        { name: 'Clip Board2' },
        { name: 'Clip Board3' },
        { name: 'Clip Board4' },
    ]);

    const [selectedmenu, setSelectedmenu] = useState({ name: 'BOARDS' })


    return (
        <View
         style={{
            // backgroundColor:'pink',
            zIndex:1}}
        >
            <Text style={styles.menu_name}>{selectedmenu.name}</Text>

            <Animatable.View style={styles.add_icon_view}
                duration={1000} animation={selectedmenu.name == 'BOARDS' ? fade_slide_In : fade_slide_Out} >

                <TouchableOpacity style={styles.add_icon}>
                    <IconComponent name={'MaterialIcons'} icon={'add'} size={width / 12} color='#fff' />
                </TouchableOpacity>
            </Animatable.View>

            <View style={{ zIndex: 10 }}>
            <SideMenuBar selected={setSelectedmenu} />
            </View>

            <View style={[styles.slider,]}>
                <CardSlider list={first} />
            </View>

        </View >
    )
}

export default MenuBlock

const styles = StyleSheet.create({
    slider: {
        // position: 'absolute',
        height: height / 1.9,
        // top: '10%',
        // backgroundColor: theme_clr_5_faded
    },
    menu_name: {
        position: 'absolute',
        top: height / 20,
        left: width * .1,
        paddingHorizontal: 10,
        fontFamily: Poppins_Bold,
        fontSize: width / 10,
        color: app_clr_theme_light,
    },
    add_icon:{
        borderWidth: .5,
        borderColor: '#fff',
        backgroundColor: theme_clr_2_faded,
        borderRadius: width / 30,
        padding: width / 50,
    },
    add_icon_view: {
        position: 'absolute',
        top: '50%',
        zIndex:2,
    },
})