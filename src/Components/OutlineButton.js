/* eslint-disable react/prefer-stateless-function */
// @flow

import * as React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Styles from '../Style';

export default class OutlineButton extends React.Component<> {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={Styles.loginButton}>
        <Text style={Styles.loginButtonText}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}
