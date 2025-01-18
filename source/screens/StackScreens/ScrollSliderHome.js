import { View, Text, Image, StatusBar, FlatList, SafeAreaView, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { height, theme_clr_1_2 } from '../../../style_sheet/styles';
import AppHeader from '../../My_components/Header/AppHeader';
import MenuBlock from '../../My_components/View_Blocks/MenuBlock';
 
const ScrollSliderHome = () => {

  return (

    <View style={{ backgroundColor: theme_clr_1_2, flex: 1 }}>

      <SafeAreaView />
      <StatusBar backgroundColor={theme_clr_1_2} />

      <AppHeader />


      {/* <View style={{ flex: 1, justifyContent: 'space-between', marginBottom: height / 20 }}> */}
        <MenuBlock />


        <Image
          style={{ position: 'absolute', height: '100%', width: '100%', }}
          source={require('../../Assets/images/transparent_logo.png')} />


        {/* <Text style={{}}>Sample Text </Text> */}
      {/* </View> */}

    </View>
  );
};

export default ScrollSliderHome;

const styles = StyleSheet.create({


});