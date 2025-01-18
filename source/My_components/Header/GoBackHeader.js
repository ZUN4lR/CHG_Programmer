import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Poppins_Bold, theme_clr_2, theme_clr_3, width } from '../../../style_sheet/styles'
import IconComponent from '../Icon_Component/IconComponent'
import {useNavigation} from '@react-navigation/native'
const GoBackHeader = () => {

    const navigation=useNavigation();

    return (
        <View style={{flexDirection:'row',alignItems:'center',gap:width/30,paddingHorizontal:10}}>
            <TouchableOpacity
                style={styles.btn_}
                onPress={() => navigation.goBack()}
            >
                <IconComponent name={'MaterialIcons'} icon={'arrow-back'} size={15} color='#fff' />
            </TouchableOpacity>

            <Text style={{fontSize:20,fontFamily:Poppins_Bold,color:theme_clr_2}}>Settings</Text>
        </View>
    )
}

export default GoBackHeader

const styles = StyleSheet.create({
     btn_: {
        padding: 10,
        alignSelf:'flex-start',
        backgroundColor: theme_clr_2,
        borderRadius: 1000
      },
})