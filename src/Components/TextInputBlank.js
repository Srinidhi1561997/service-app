/* eslint-disable react/prefer-stateless-function */
// @flow

import * as React from 'react';
import {
  TouchableOpacity, Text, TextInput, View,
} from 'react-native';
import Styles from '../Style';
import TextDefault from './TextDefault';

export default class TextInputBlank extends React.Component {
  render() {
    let { color } = 'white';
    if (!color) {
      color = 'white';
    }
    return (
      <View style={{}}>
        <TextInput
          defaultValue={this.props.defaultValue}
          value={this.props.value}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={this.props.secureTextEntry}
          onChangeText={this.props.onChangeText}
          keyboardType={this.props.keyboardType}
          style={[{
            // borderBottomWidth: 0.5,
            // borderBottomColor: 'white',
            color,
            // paddingTop: 10,
          },Styles.loginTextInput]}
          textContentType={this.props.textContentType}
          placeholderTextColor={color}
          placeholder={this.props.placeholder}
        />
        <TextDefault style={{ padding: 2, marginTop: 8 }} text={this.props.text} />
      </View>
    );
  }
}
