import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Poppins_Bold, Poppins_Regular, theme_clr_2, theme_clr_3, theme_clr_crimson, width } from '../../../style_sheet/styles'
import IconComponent from '../Icon_Component/IconComponent'
import { useNavigation } from '@react-navigation/native'

const AppHeader = ({ show_notification = false, new_notification = false, drawer = false, settings = false }) => {

  const navigation = useNavigation();

  return (

    <View style={{
      // backgroundColor: 'green', 
      zIndex: 1, flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'space-between', alignItems: 'center'
    }}>

      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Image
          source={require('../../Assets/images/logo.png')}
          style={{ height: 45, width: 24 }}
        />
        <View>
          <Text style={styles.logo_text}>
            Cleantech{'\n'}Hub Grounds
          </Text>
          <Text style={styles.programmer_text} >Programmer</Text>
        </View>
      </View>


      <View style={{ flexDirection: 'row', gap: 5 ,alignItems:'center'}}>
        {show_notification &&
          <TouchableOpacity
            style={styles.btn_}
            // onPress={() => navigation.toggleDrawer()}
          >

            {new_notification &&
              <View style={styles.notification_view}>
                <Text style={styles.notification_text}>o</Text>
              </View>
            }

            <IconComponent name={'Feather'} icon={'bell'} size={18} color='#fff' />
          </TouchableOpacity>
        }

        {settings &&
          <TouchableOpacity
          style={styles.btn_}
          onPress={() => navigation.navigate('SettingsPage')}
          >
            <IconComponent name={'Ionicons'} icon={'settings-outline'} size={18} color='#fff' />
          </TouchableOpacity>
        }

        {drawer &&
          <TouchableOpacity
            style={{ padding: 10 }}
            onPress={() => navigation.toggleDrawer()}
          >
            <IconComponent name={'FontAwesome6'} icon={'bars-staggered'} size={20} color='#fff' />
          </TouchableOpacity>
        }
      </View>

    </View>
  )
}

export default AppHeader

const styles = StyleSheet.create({
  logo_text: {
    fontFamily: Poppins_Bold,
    color: '#fff',
    fontSize: 14,
    lineHeight: 15
  },
  programmer_text: {
    fontFamily: Poppins_Bold,
    borderWidth: 0.5,
    color: '#ffa500',
    borderColor: '#ffa500',
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    textAlign: 'center',
    fontSize: 8,
  },
  btn_: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: theme_clr_3,
    borderRadius: 1000
  },
  notification_view: {
    backgroundColor: theme_clr_crimson,
    alignItems: 'center',
    position: 'absolute',
    right: 2,
    borderRadius: 1000,
  },
  notification_text: {
    fontSize: 6,
    color: theme_clr_crimson,
    fontFamily: Poppins_Regular,
    paddingHorizontal: 3
  },
})