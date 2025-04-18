import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {height, theme_clr_1_2, width} from './style_sheet/styles';
import StackNavigator from './source/Navigations/StackNavigator';
import { createAppFolder_in_userPhone } from './HelperFunctions/App_Local_Storage/Storage_Functions';
 // import {Provider} from 'react-redux';
// import {store} from './redux/store/store';
// import {initializeDatabase} from './SQLLiteDatabase/database';

export default function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(true);
  console.log('height : ', height);
  console.log('width : ', width);

  // useEffect(() => {
  //   initializeDatabase();
  // }, []);

  useEffect(() => {
    (async () => {
      await createAppFolder_in_userPhone();
    })();
  }, []);
  
  
  return (
    // <Provider store={store}>

    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>

    // </Provider>
  );
}
