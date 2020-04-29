/* eslint-disable react/prefer-stateless-function */
// @flow

import * as React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Styles from '../Style';

export default class TextDefault extends React.Component<> {
  render() {
    return (
      <View>
        <Text
          numberOfLines={this.props.numberOfLines}
          onPress={this.props.onPress}
          style={[Styles.defaultText, this.props.style]}
        >
          {this.props.text}
        </Text>
      </View>
    );
  }
}
