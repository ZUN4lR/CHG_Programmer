import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { app_clr_white, Poppins_Regular, theme_clr_1, theme_clr_1_2 } from '../../../style_sheet/styles'
import IconComponent from '../Icon_Component/IconComponent'

const Textinput = ({ set_val,value=0, type = 'default', current=0, place_holder, bg_color, iconfrom, icon,icon_color=theme_clr_1 }) => {

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [focus, setFocus] = useState(false);
  return (

    <View style={[styles.mainview, {marginTop:current?12:null,
      borderTopLeftRadius:current?0:null,
      backgroundColor: bg_color ? bg_color : '#2b2b2b',
      borderColor: focus ? theme_clr_1_2: '#6a6a6a'
    }]}>
     {current &&
      <View style={{ backgroundColor: '#6a6a6a',borderTopRightRadius:30,borderTopLeftRadius:10, position: 'absolute',left:-1, top: -16, paddingHorizontal: 20 }}>
      <Text style={{ fontSize: 9,top:1,fontFamily:Poppins_Regular, color: '#fff' }}>Current : {current}</Text>
    </View>
   }
      <TextInput
        placeholder={place_holder}
        onChangeText={(text) => set_val(text)}
        value={value}
        placeholderTextColor={'grey'}
        onFocus={() => setFocus(true)}
        keyboardType={type}
        onBlur={() => setFocus(false)}
        secureTextEntry={icon != 'password' ? false : secureTextEntry}
        style={[styles.text_input]}
      />
      {icon == 'password' ?
        <TouchableOpacity
          onPress={() => setSecureTextEntry(!secureTextEntry)}
          style={{ padding: 5 }}>
          {!secureTextEntry ?
            <IconComponent name={'Ionicons'} icon={'eye-outline'} size={20} color={icon_color} /> :
            <IconComponent name={'Ionicons'} icon={'eye-off-outline'} size={20} color={icon_color} />
          }
        </TouchableOpacity>
        : icon ?
          <View style={{ padding: 5 }}>
            <IconComponent name={iconfrom} icon={icon} size={20} color={icon_color} />
          </View>
          : null
      }
    </View>
  )
}
const styles = StyleSheet.create({
  mainview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,

  },
  text_input: {
    color: '#fff',
    fontSize: 15,
    padding: 8,
    letterSpacing: 1,
    paddingLeft: 15,
    width: '90%',
    fontFamily: Poppins_Regular,
  }
})

export default Textinput
