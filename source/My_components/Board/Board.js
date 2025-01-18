import { StyleSheet, Text, View, Easing, TouchableOpacity, Image } from 'react-native';
import { Pixel, Poppins_Bold, theme_clr_1_2, theme_clr_1_2_bright, theme_clr_2, width } from '../../../style_sheet/styles';

import IconComponent from '../Icon_Component/IconComponent';

const Board = ({ name }) => {

    let n = name.split(' ');
    let a = n.slice(0, n.length - 1).join(' ');
    let lastWord = n[n.length - 1];

    return (
        <View style={[styles.main_view]}>

      <Image
        style={{ position: 'absolute', height: width/2.5, width:width/2.5,
            alignSelf:'center',
opacity:.1,
// backgroundColor:'red',
            transform:[{rotate:'45deg'}]
         }}
        source={require('../../Assets/images/dark_logo.png')} />

            <View >
                <Text style={[styles.card_name, { fontSize: a.length > 8 ? width / 28 : width / 18 }]}>{a}</Text>
                <Text style={[styles.card_name, { fontSize: width/28 }]}>{lastWord}</Text>
            </View>

            <TouchableOpacity
                // onPress={}
                style={styles.setting_icon}>
                <IconComponent name={'Ionicons'} icon={'settings-outline'} size={width / 20} color='#fff' />
            </TouchableOpacity>

        </View>
    );
};

export default Board;

const styles = StyleSheet.create({
    main_view: {
        flex: 1,
        // justifyContent: "space-between",
        //   flexDirection: "row",
        padding: 10,
        paddingTop: 20,
        overflow:'hidden',
        borderRadius: width / 20,
        backgroundColor: theme_clr_2,
    },
    card_name: {
        color: "white",
        fontFamily: Poppins_Bold,
        textAlign: "flex-start",
    },
    setting_icon: {
        position: 'absolute',
        backgroundColor: theme_clr_1_2_bright,
        borderRadius: 1000,
        padding: width / 50,
        right: width / 20,
        bottom: width / 20
    },
});
