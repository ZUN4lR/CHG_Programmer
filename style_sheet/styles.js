import { StyleSheet, Dimensions } from "react-native";

export const app_name_ = 'CHG Programmer';


export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;

export const Poppins_Regular = 'Poppins-Regular';
export const Poppins_Bold = 'Poppins-Bold';
export const Pixel = 'Pixel';

// change able
export const theme_clr_1 = '#0a4563';
export const theme_clr_1_medium = '#fe9e4b73';
export const theme_clr_1_faded = '#fe9e4b2d';
export const theme_clr_1_2 = '#23615f';
export const theme_clr_1_2_faded = '#23615fad';
export const theme_clr_1_2_bright = '#45a7a4';
export const theme_clr_1_2_transparent = '#45a7a45b';
export const theme_clr_2 = '#161a22';
export const theme_clr_2_faded = '#161a22a3';
export const theme_clr_3 = '#272c35';
export const theme_clr_4 = '#e54868';
export const theme_clr_5_medium = '#f66e8a';
export const theme_clr_5_faded = '#f66e892f';
export const app_clr_cyan = '#4edaed';
export const app_clr_transparent_cyan = '#009dff2f';
export const theme_clr_6_white_medium = '#ffffff95';
export const theme_clr_6_white_transparent = '#ffffff47';

export const theme_clr_7 = '##8BC755';
export const theme_clr_7_faded = '#6ef67c3d';
export const dark_white = '#c0c0c0';

export const theme_clr_8_blood = '#dc143cb5';
export const theme_clr_crimson = 'crimson';

export const bg_app_theme = '#1e1e27';
export const app_clr_theme_light = '#373746ac';
export const app_clr_theme_medium_light = '#4e4e64';
export const app_theme_clr_white = '#fff';
export const app_theme_clr_fade_white = '#e0e0e0';
export const app_theme_clr_solid_transparent_white = '#a1a1a1';
export const app_theme_clr_transparent_white = '#e0e0e091';


 

export const sheet = StyleSheet.create({

    loading_text: {
        fontSize: 10,
        fontFamily: Poppins_Bold,
    },
    loading_text_centered: {
        fontSize: 18,
        fontFamily: Poppins_Regular,
        color: app_theme_clr_transparent_white,
        alignSelf: 'center'
    }

})



