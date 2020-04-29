
import React, {Component} from 'react';
import {
  Platform,
  View,
  TouchableOpacity,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  InteractionManager,
  StatusBar,
  NetInfo,
  ActivityIndicator,
  TextInput,
  Text,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Styles from '../Style';
import Logo from '../Components/Logo';
import SignUpForm from '../Components/SignUpForm';

export default class SignUp extends Component {
    render() {
        return(
            <LinearGradient style={{ flex: 1 }} colors={['#2e5bb6', '#5b9ed2']}>
                <View style={Styles.loginContainer}>
                   <Logo/>
                   <SignUpForm type="SignUp" />
                   <View style={Styles.signUpTextContent} >
                       <Text style={Styles.signUpTextstyle}>Already have an account? </Text>
                       <TouchableOpacity onPress={() =>this.props.navigation.navigate('Login')}>
                            <Text style={Styles.signUpButton}>Sign In</Text>
                       </TouchableOpacity>
                   </View>
                </View>
            </LinearGradient>
        )
    }
}