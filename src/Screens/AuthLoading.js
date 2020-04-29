import React from 'react';
import {
  StyleSheet, View, Image, Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
i
// import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';
// import Snackbar from 'react-native-snackbar';
// import { poolData } from '../CognitoUtil';
// import MyStatusBar from '../components/StatusBar';
import Styles from '../Style';

export default class AuthLoading extends React.Component {
//   constructor(props) {
//     super(props);
//     this._bootstrapAsync();
//   }

//   // Fetch the token from storage then navigate to our appropriate place
//   _bootstrapAsync = () => {
//     const userPool = new CognitoUserPool(poolData);
//     let cognitoUser = null;
//     userPool.storage.sync((err, result) => {
//       if (err) {
//       } else if (result === 'SUCCESS') {
//         cognitoUser = userPool.getCurrentUser();
//         // Continue with steps in Use case 16
//       }
//       if (cognitoUser != null) {
//         cognitoUser.getSession((err, session) => {
//           if (err) {
//             Snackbar.show({
//               title: `${err.message}`,
//               duration: Snackbar.LENGTH_SHORT,
//             });
//             return;
//           }
//           console.log(`session validity: ${session.isValid()}`);
//           // this.props.navigation.replace('TabNavigator');
//           this.props.navigation.navigate(session.isValid() ? 'App' : 'Auth');
//         });
//       } else {
//         this.props.navigation.navigate('Auth');
//       }
//     });
//   };

  // Render any loading content that you like here
  render() {
    return (
      <LinearGradient style={{ flex: 1 }} colors={['#5f2c82', '#49a09d', '#91035a']}>
        {/* <MyStatusBar backgroundColor="#5c0f8b" barStyle="light-content" /> */}
        <View style={Styles.splashLogoContainer}>
          {/* Container for messaging in different states */}
          <Image style={Styles.splashLogoStyle} source={require('../../Assets/splash logo.png')} />
        </View>
      </LinearGradient>
    );
  }
}
