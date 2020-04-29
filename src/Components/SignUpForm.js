
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
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import Styles from '../Style';

export default class SignUpForm extends Component {
    render() {
        return(
            <View style={Styles.formContainer}>
                <TextInput 
                    style={Styles.loginTextInput} 
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder= 'Name'
                    placeholderTextColor= '#ffffff' />
                <TextInput 
                    style={Styles.loginTextInput} 
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder= 'Email'
                    placeholderTextColor= '#ffffff' />
                <TextInput 
                    ref='mobileNo'
                    keyboardType="numeric"
                    style={Styles.loginTextInput} 
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder= 'Phone no'
                    onChangeText={(value) => {
                        let num = value.replace(".", '');
                          if(isNaN(num)) {
                              // Its not a number
                          } else {
                             this.handleChange('mobileNo', num)
                            }  
                          }
                        }
                    placeholderTextColor= '#ffffff' />
                <TextInput 
                    style={Styles.loginTextInput} 
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder= 'Password'
                    secureTextEntry={true}
                    placeholderTextColor= '#ffffff' />
                <TextInput 
                    style={Styles.loginTextInput} 
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder= 'Confirm Password'
                    secureTextEntry={true}
                    placeholderTextColor= '#ffffff' />   
                <TouchableOpacity style={Styles.loginButton} >
                    <Text style={Styles.loginButtonText} >
                        {this.props.type}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}