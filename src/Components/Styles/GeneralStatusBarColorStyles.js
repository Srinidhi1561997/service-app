import { StyleSheet, Platform, StatusBar } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';


const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? getStatusBarHeight() : StatusBar.currentHeight;
// console.log(getStatusBarHeight());
// console.log(getStatusBarHeight(true));


export default StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});
