import React from 'react';
import { View } from 'react-native';
import AntD from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import AntDGlyphs from 'react-native-vector-icons/glyphmaps/AntDesign.json';
import EntypoGlyphs from 'react-native-vector-icons/glyphmaps/Entypo.json';
import EvilIconsGlyphs from 'react-native-vector-icons/glyphmaps/EvilIcons.json';
import FeatherGlyphs from 'react-native-vector-icons/glyphmaps/Feather.json';
import FontAwesomeGlyphs from 'react-native-vector-icons/glyphmaps/FontAwesome.json';
import FontAwesome5Glyphs from 'react-native-vector-icons/glyphmaps/FontAwesome5Free.json';
import FontistoGlyphs from 'react-native-vector-icons/glyphmaps/Fontisto.json';
import FoundationGlyphs from 'react-native-vector-icons/glyphmaps/Foundation.json';
import IoniconsGlyphs from 'react-native-vector-icons/glyphmaps/Ionicons.json';
import MaterialIconsGlyphs from 'react-native-vector-icons/glyphmaps/MaterialIcons.json';
import MaterialCommunityIconsGlyphs from 'react-native-vector-icons/glyphmaps/MaterialCommunityIcons.json';
import OcticonsGlyphs from 'react-native-vector-icons/glyphmaps/Octicons.json';
import SimpleLineIconsGlyphs from 'react-native-vector-icons/glyphmaps/SimpleLineIcons.json';
import ZocialGlyphs from 'react-native-vector-icons/glyphmaps/Zocial.json';
import { width } from '../../../style_sheet/styles';


const IconComponent = ({ name, icon, size, color }) => {

    const icons = {
        AntD,
        Entypo,
        EvilIcons,
        Feather,
        FontAwesome,
        FontAwesome5,
        FontAwesome6,
        Fontisto,
        Foundation,
        Ionicons,
        MaterialIcons,
        MaterialCommunityIcons,
        Octicons,
        SimpleLineIcons,
        Zocial,
        AntDGlyphs,
        EntypoGlyphs,
        EvilIconsGlyphs,
        FeatherGlyphs,
        FontAwesomeGlyphs,
        FontAwesome5Glyphs,
        FontistoGlyphs,
        FoundationGlyphs,
        IoniconsGlyphs,
        MaterialIconsGlyphs,
        MaterialCommunityIconsGlyphs,
        OcticonsGlyphs,
        SimpleLineIconsGlyphs,
        ZocialGlyphs
    };

    const Icon = icons[name]; 

    return (
        <View>
            {Icon ? <Icon name={icon} size={size} color={color} /> : null}
        </View>
    );
};

export default IconComponent;
