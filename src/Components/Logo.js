
import React, {Component} from 'react';
import {
  Platform,
  View,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  InteractionManager,
  StatusBar,
  NetInfo,
  Text,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import Styles from '../Style';

export default class Logo extends Component {
    render() {
        return(
            <View style={Styles.logoContainer}>
                <Image style={Styles.splashLogoStyle} source={require('../../Assets/stayWhite.png')}/>
                <Text style={Styles.logoTextStyle}>Welcome to service app</Text>
            </View>
        )
    }
}