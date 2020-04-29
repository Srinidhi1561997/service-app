
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
import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute, AmazonCognitoIdentity } from 'amazon-cognito-identity-js';
import moment from 'moment';
import { connect } from 'react-redux';
import Snackbar from 'react-native-snackbar';
import LinearGradient from 'react-native-linear-gradient';
import { poolData } from '../CognitoUtil';
import Loader from '../Components/Loader';
import Styles from '../Style';
import OutlineButton from '../Components/OutlineButton';
import * as Constants from '../Constants';
import GeneralStatusBarColor from '../Components/GeneralStatusBarColor';
import TextInputBlank from '../Components/TextInputBlank';
import TextDefault from '../Components/TextDefault';

const isAndroid = Platform.OS === 'android';
const userPool = new CognitoUserPool(poolData);
let cognitoUser;

export default class LoginForm extends Component {
  static navigationOptions = {
    header: null,
  };
  userData = {
        Username: 'username',
        Pool: userPool,
      };

    AuthenticationCallback = {
        onSuccess: (result) => {
          // User authentication was successful
          const { currentState } = this.state;
          const { navigation } = this.props;
          // if (currentState === Constants.STATE_CHANGE_PASSWORD) {
          //   this.moveToNextState();
          // } 
            // let clientId;
            let name;
            let phone;
            let email;
            const idToken = result.idToken.jwtToken;
            const accessToken = result.accessToken.jwtToken;
            const refreshToken = result.refreshToken.token;
            cognitoUser.getUserAttributes((err, result) => {
              if (err) {
                // console.warn('user attribute error', err);
                return;
              }
              // console.log('result is', result);
              for (i = 0; i < result.length; i++) {
                // console.log('result ', result[i].getName());
                if (result[i].getName() === 'phone_number') {
                  phone = result[i].getValue();
                } else if (result[i].getName() === 'email') {
                  email = result[i].getValue();
                } 
                else if (result[i].getName() === 'name') {
                  name = result[i].getValue();            
                } 
                // else if (result[i].getName() === 'custom:routeUrl') {
                //   let routeUrl = JSON.parse(result[i].getValue());
                //   baseURL = routeUrl.fcgUrl;
                //   chatURL = routeUrl.chatUrl;
                // } 
              }
              // this.props.getConfigApi(baseURL);
              this.props.saveFCG(name, phone, email, 
                // chatURL,
                // grpChatDomain,
                // baseURL, 
                idToken, 
                refreshToken, 
                accessToken );
              // this.getCurrentFCMToken(email);
              this.showLoader(setTimeout(function(){ navigation.navigate('Login'); }, 10000));
              // setTimeout(function(){ navigation.navigate('App'); }, 4000);
              // navigation.navigate('App');
            });
        },
        onFailure: (err) => {
          // User authentication was not successful
          this.hideLoader();
          setTimeout(() => {
            if (
              err.code === 'NotAuthorizedException'
              && err.message === 'Invalid session for the user, session is expired.'
            ) {
              Snackbar.show({
                title: 'Try logging again',
                duration: Snackbar.LENGTH_LONG,
              });
              this.setState({
                currentState: Constants.STATE_NORMAL,
                loading: false,
              });
            } else {
              Snackbar.show({
                title: err.message,
                duration: Snackbar.LENGTH_LONG,
              });
            }
          }, 400);
        },
        mfaRequired: (codeDeliveryDetails) => {
          // MFA is required to complete user authentication.
          // Get the code from user and call
          // cognitoUser.sendMFACode(mfaCode, this);
          // console.log(`codeDelivryDetails is ${codeDeliveryDetails}`);
        },
        newPasswordRequired: (userAttributes, requiredAttributes) => {
          // User was signed up by an admin and must provide new
          // password and required attributes, if any, to complete
          // authentication.
          // console.log(`userAttributes is ${userAttributes}`);
          // console.log(`RequiredAttributes is ${requiredAttributes}`);
          // the api doesn't accept this field back
          // delete userAttributes.email_verified;
          // change the state to update the ui.
          this.hideLoader();
          this.moveToNextState();
          // this.setState({ currentState: Constants.STATE_CHANGE_PASSWORD });
          // Get these details and call
          // cognitoUser.completeNewPasswordChallenge("Devansh-93", null, this);
        },
      };

    constructor(props) {
        super(props);
        this.state = {
          currentState: Constants.STATE_NORMAL,
          loading: false,
        };
      }

    componentWillMount() {}

    componentDidMount() {
        const { navigation } = this.props;
        // NetInfo.isConnected.addEventListener('connectionChange', this._handleConnectionChange);
        this.focusListener = navigation.addListener('didFocus', () => {
        StatusBar.setBarStyle('light-content');
        isAndroid && StatusBar.setBackgroundColor('#2e5bb6');
        });
    }

    componentWillUnmount() {
        // Remove the event listener
        // NetInfo.isConnected.removeEventListener('connectionChange', this._handleConnectionChange);
        this.focusListener.remove();
        // this.stopPolling();
    }

    getGreetingTime = (currentTime) => {
        if (!currentTime || !currentTime.isValid()) {
          return 'Hello';
        }
    
        const splitAfternoon = 12; // 24hr time to split the afternoon
        const splitEvening = 17; // 24hr time to split the evening
        const currentHour = parseFloat(currentTime.format('HH'));
    
        if (currentHour >= splitAfternoon && currentHour <= splitEvening) {
          // Between 12 PM and 5PM
          return 'Good afternoon';
        }
        if (currentHour >= splitEvening) {
          // Between 5PM and Midnight
          return 'Good evening';
        }
        // Between dawn and noon
        return 'Good morning';
      };

      getForgotPassContainer(loginText, subtitle) {
        // console.log('state in login', this.state);
        return (
          <View style={Styles.formContainer}>
            <TextInputBlank
              // underlineColorAndroid='rgba(0,0,0,0)'
              placeholder= 'Email'
              placeholderTextColor= '#ffffff'
              defaultValue=""
              keyboardType="email-address"
              value={this.state.username}
              onChangeText={changedText => this.setState({ username: changedText })}
              textContentType="emailAddress"
            />
            
            {this.showButton(loginText)}
            <View>
              <TextDefault
                onPress={() => {
                  this.setState({
                    currentState: Constants.STATE_NORMAL,
                    loading: false,
                  });
                }}
                style={{ marginTop: 20 }}
                text="go back"
              />
            </View>
          </View>
        );
      }
    
      getUpdatePassContainer(loginText, subtitle) {
        return (
          <View style={Styles.formContainer}>
            <TextInputBlank
              // underlineColorAndroid='rgba(0,0,0,0)'
              placeholder= 'Verification code'
              placeholderTextColor= '#ffffff'
              defaultValue=""
              keyboardType="number-pad"
              value={this.state.verificationCode}
              onChangeText={changedText => this.setState({ verificationCode: changedText })}
              color="white"
              text="(sent to registered phone number)"
              // textContentType="password"
            />
            {/* <View style={{ margin: 20 }} /> */}
            <TextInputBlank
              // underlineColorAndroid='rgba(0,0,0,0)'
              placeholder= 'Password'
              defaultValue=""
              value={this.state.newPassword}
              onChangeText={changedText => this.setState({ newPassword: changedText })}
              color="white"
              // textAlign="center"
              // alignSelf="center"
              // alignItems="center"
              text="(must contain min 8 characters with atleast one 
    number, uppercase, lowercase and spl character)"  
              secureTextEntry
              textContentType="password"
            />
            {/* <Button title="Login" color="#841584" accessibilityLabel="Home" /> */}
            {/* <View style={{ marginTop: 25 }} /> */}
            {this.showButton(loginText)}
            <View>
              <TextDefault
                onPress={() => {
                  this.setState({
                    currentState: Constants.STATE_NORMAL,
                    loading: false,
                  });
                }}
                style={{ marginTop: 20 }}
                text="go back"
              />
            </View>
          </View>
        );
      }

      showSignUpContainer(signUpText) {
        const { username, password, name,  } = this.state;
          return(
            <View style={Styles.formContainer}>
                <TextInputBlank 
                    // underlineColorAndroid='rgba(0,0,0,0)'
                    // style={Styles.loginTextInput} 
                    defaultValue=''
                    value={this.state.name}
                    onChangeText={changedText => this.setState({ name: changedText })}
                    placeholder= 'Name'
                    placeholderTextColor= '#ffffff' />
                <TextInputBlank 
                    // underlineColorAndroid='rgba(0,0,0,0)'
                    // style={Styles.loginTextInput} 
                    keyboardType='email-address'
                    defaultValue=''
                    value={this.state.username}
                    onChangeText={changedText => this.setState({ username: changedText })}
                    placeholder= 'Email'
                    placeholderTextColor= '#ffffff' />
                <TextInputBlank 
                    keyboardType='phone-pad'
                    // style={Styles.loginTextInput} 
                    // underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder= 'Phone no'
                    defaultValue=''
                    value={this.state.phoneno}
                    onChangeText={changedText => this.setState({ phoneno: changedText })}
                    placeholderTextColor= '#ffffff' />
                <TextInputBlank 
                    // style={Styles.loginTextInput} 
                    // underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder= 'Password'
                    defaultValue=''
                    value={this.state.password}
                    onChangeText={changedText=>this.setState({password:changedText})}
                    secureTextEntry
                    placeholderTextColor= '#ffffff' />
                <TextInputBlank 
                    // style={Styles.loginTextInput} 
                    // underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder= 'Confirm Password'
                    defaultValue=''
                    value={this.state.confirmPassword}
                    onChangeText={changedText=>this.setState({confirmPassword:changedText})}
                    secureTextEntry={true}
                    placeholderTextColor= '#ffffff' /> 
                    {this.showButton(signUpText)}
            <View style={Styles.signUpTextContent}>
            <Text style={Styles.signUpTextstyle}>Already have an account? </Text>
              <TextDefault
                onPress={() => {
                  this.setState({ currentState: Constants.STATE_NORMAL });
                }}
                style={Styles.signUpButton}
                text="Sign In"
              />
            </View>

          </View>  
        );
      }
    
      getMainContainer(loginText, subtitle) {
        const { currentState } = this.state;
        if (currentState === Constants.STATE_NORMAL) {
          return this.showMainContainer(loginText, subtitle);
        }
        // if (currentState === Constants.STATE_CHANGE_PASSWORD) {
        //   return this.showMainContainerforChangePassword(loginText, subtitle);
        // }
        if (currentState === Constants.STATE_PASSWORD_UPDATED) {
          return this.showMainContainerForPasswordUpdate(loginText, subtitle);
        }
        if (currentState === Constants.STATE_FORGOT_PASSWORD) {
          return this.getForgotPassContainer('RESET PASSWORD', subtitle);
        }
        if (currentState === Constants.STATE_FORGOT_PASSWORD_REQUESTED) {
          return this.getUpdatePassContainer('UPDATE', subtitle);
        }
        if (currentState === Constants.STATE_NEW_SIGN_UP) {
          return this.showSignUpContainer('SignUp', subtitle);
        }
        return null;
        // this.showMainContainer(loginText);
      }

      // _handleConnectionChange = (isConnected) => {
      //   // this.props.connectionState({ status: isConnected });
      //   // Alert.alert(`Connection Status: ${isConnected}`);
      //   let title = 'No connection';
      //   // console.log('homescreen check data')
      //   if (isConnected) {
      //     title = 'Back online';
      //     Snackbar.show({
      //       title,
      //       duration: Snackbar.LENGTH_LONG,
      //       color: { textAlign: 'center', color: 'white ' },
      //       // backgroundColor: 'lightgreen',
      //     });
      //   }
      // }
    
      showLoader = () => {
        this.setState({ loading: true });
      };
    
      hideLoader = () => {
        this.setState({ loading: false });
      };
    
      showButton(text) {
        const { currentState } = this.state;
        const { navigation } = this.props;
        return (
          <View>
            <OutlineButton
              onPress={() => {
                Keyboard.dismiss();
                if (currentState === Constants.STATE_NORMAL) {
                  if (this.validate()) {
                    this.cognitoSignUp();
                  } else {
                    Snackbar.show({
                      title: 'Invalid Credentials',
                      duration: Snackbar.LENGTH_SHORT,
                    });
                  }
                } else if (currentState === Constants.STATE_PASSWORD_UPDATED) {
                  // TODO: change back to login state
                  // navigation.navigate('TabNavigator');
                  this.setState({ currentState: Constants.STATE_NORMAL });
                } else if (currentState === Constants.STATE_FORGOT_PASSWORD) {
                  // TODO: change back to login state
                  // navigation.navigate('TabNavigator');
                  if (this.validateUsername()) {
                    this.forgotPassword();
                  } else {
                    Snackbar.show({
                      title: 'Username cannot be empty',
                      duration: Snackbar.LENGTH_SHORT,
                    });
                  }
                  // this.setState({ currentState: Constants.STATE_FORGOT_PASSWORD_REQUESTED });
                } else if (currentState === Constants.STATE_FORGOT_PASSWORD_REQUESTED) {
                  // TODO: change back to login state
                  // navigation.navigate('TabNavigator');
                  this.updatePassword();
                  // this.setState({ currentState: Constants.STATE_NORMAL });
                } else if ( currentState === Constants.STATE_NEW_SIGN_UP ) {
                  this.createUserInAmazonCognito();
                }
              }}
              text={text}
            />
          </View>
        );
      }
      

      showMainContainer(loginText, subtitle) {
        // {/* TextInput + button container */}
        const { username, password } = this.state;
        return (
          <View style={Styles.formContainer}>
            <TextInputBlank
              defaultValue=""
              keyboardType="email-address"
              value={username}
              onChangeText={changedText => this.setState({ username: changedText })}
              color="white"
              placeholder="Email"
              textContentType="emailAddress"
            />
            <View style={{ margin: 10 }} />
            <TextInputBlank
              defaultValue=""
              value={password}
              onChangeText={changedText => this.setState({ password: changedText })}
              color="white"
              placeholder="Password"
              secureTextEntry={true}
              textContentType="password"
            />
            {/* <Button title="Login" color="#841584" accessibilityLabel="Home" /> */}
            <View style={{ marginTop: 25 }} />
            {this.showButton(loginText)}
            <View>
              <TextDefault
                onPress={() => {
                  this.setState({ currentState: Constants.STATE_FORGOT_PASSWORD });
                }}
                // style={{ marginTop: 20 }}
                text="Forgot Password?"
              />
            </View>

            <View style={Styles.signUpTextContent}>
            <Text style={Styles.signUpTextstyle}>Don't have an account yet? </Text>
              <TextDefault
                onPress={() => {
                  this.setState({ currentState: Constants.STATE_NEW_SIGN_UP });
                }}
                style={Styles.signUpButton}
                text="Sign Up"
              />
            </View>
          </View>
        );
      }


      // showMainContainerforChangePassword(loginText, subtitle) {
      //   // {/* TextInput + button container */}
      //   return (
      //     <View style={{ width: '100%', padding: '10%' }}>
      //       <TextInputBlank
      //         defaultValue=""
      //         value={this.state.newPassword}
      //         onChangeText={changedText => this.setState({ newPassword: changedText })}
      //         color="white"
      //         secureTextEntry
      //         text={
      //           'Choose New Password \n'
      //           + '(should contain atleast a number, a special character, an uppercase letter, a lowercase letter, and min 8 characters)'
      //         }
      //         textContentType="password"
      //       />
      //       <View style={{ margin: 20 }} />
      //       <TextInputBlank
      //         defaultValue=""
      //         value={this.state.confirmNewPassword}
      //         onChangeText={changedText => this.setState({ confirmNewPassword: changedText })}
      //         color="white"
      //         secureTextEntry
      //         text="Confirm New Password"
      //         textContentType="password"
      //       />
      //       {/* <Button title="Login" color="#841584" accessibilityLabel="Home" /> */}
      //       <View style={{ marginTop: 25 }} />
      //       {this.showButton(loginText)}
      //       {/* <View>
      //         <TextDefault style={{ marginTop: 20 }} text="Forgot Password?" />
      //       </View> */}
      //     </View>
      //   );
      // }
    
      showMainContainerForPasswordUpdate(loginText, subtitle) {
        // {/* TextInput + button container */}
        return (
          <View style={{ width: '100%' }}>
            <Image
              style={{
                width: 75,
                height: 75,
                alignSelf: 'center',
                // padding: 50,
                marginBottom: 50,
              }}
              source={require('../../Assets/done.png')}
            />
            {this.showButton(loginText)}
            <View>
              <TextDefault style={{}} text="(use the newly created password to login)" />
            </View>
          </View>
        );
      }
    
      updatePassword() {
        this.showLoader();
        cognitoUser.confirmPassword(this.state.verificationCode, this.state.newPassword, {
          onSuccess: () => {
            // console.log('Password confirmed!');
            this.hideLoader();
            setTimeout(() => {
              // Snackbar.show({
              //   title: 'password confirmed',
              //   duration: Snackbar.LENGTH_LONG,
              // });
              this.setState({
                password: '',
                username: this.state.username.trim(),
                confirmNewPassword: '',
                newPassword: '',
                currentState: Constants.STATE_PASSWORD_UPDATED,
                verificationCode: '',
              });
            }, 300);
            // this.setState({ currentState: Constants.STATE_PASSWORD_UPDATED });
          },
          onFailure: (err) => {
            // console.log('Password not confirmed!');
            this.hideLoader();
            setTimeout(() => {
              if (this.state.newPassword === undefined && this.state.verificationCode === undefined) {
                // console.log('new pass and verfi', this.state.newPassword, this.state.verificationCode)
                Snackbar.show({
                  title: 'Password and Verification code cannot be empty',
                  duration: Snackbar.LENGTH_LONG,
                });
              } else if (this.state.newPassword === undefined) {
                this.state.verificationCode = undefined;
                Snackbar.show({
                  title: 'Password cannot be empty',
                  duration: Snackbar.LENGTH_LONG,
                });
              } else if (this.state.verificationCode === undefined) {
                this.state.newPassword = undefined;
                Snackbar.show({
                  title: 'Verification code cannot be empty',
                  duration: Snackbar.LENGTH_LONG,
                });
                // this.state.newPassword = undefined;
              }
               else {
              Snackbar.show({
                title: err.message,
                duration: Snackbar.LENGTH_SHORT,
              });}
            }, 300);
          },
        });
      }
    
      forgotPassword() {
        this.showLoader();
        const userData = {
          Username: this.state.username.trim(),
          Pool: userPool,
        };
        cognitoUser = new CognitoUser(userData);
        cognitoUser.forgotPassword({
          onSuccess: (data) => {
            // successfully initiated reset password request
            this.hideLoader();
            // console.log(`CodeDeliveryData from forgotPassword: ${data}`);
            this.setState({ currentState: Constants.STATE_FORGOT_PASSWORD_REQUESTED });
          },
          onFailure: (err) => {
            // alert(err.message || JSON.stringify(err));
            this.hideLoader();
            setTimeout(() => {
              Snackbar.show({
                title: err.message,
                duration: Snackbar.LENGTH_SHORT,
              });
            }, 300);
          },
        });
      }
    
      createUserInAmazonCognito() {
        console.log('create user')
        //Fill required atributes
        var attributeList = [];
        var dataName = {
          Name: 'Name',
          Value: this.state.name
        };
        var dataEmail = {
          Name: 'Email',
          Value: this.state.username
        };
        var dataPhoneNo = {
          Name: 'Phone no',
          Value: this.state.phoneno
        };
        var dataPassword = {
          Name: 'Password',
          Value: this.state.password
        };
        var dataConfirmPassword = {
          Name: 'Confirm Password',
          Value: this.state.confirmPassword
        };

        var attributeName = new CognitoUserAttribute(dataName);
        var attributeEmail = new CognitoUserAttribute(dataEmail);
        var attributePhoneNo = new CognitoUserAttribute(dataPhoneNo);
        var attributePassword = new CognitoUserAttribute(dataPassword);
        var attributeConfirmPassword = new CognitoUserAttribute(dataConfirmPassword);
        attributeList.push(attributeName);
        attributeList.push(attributeEmail);
        attributeList.push(attributePhoneNo);
        attributeList.push(attributePassword);
        attributeList.push(attributeConfirmPassword);
        var cognitoUser;
        //Call SignUp function
        userPool.signUp(this.username, this.password, 
        attributeList, null, (err,result) => {
         if (err) {
            console.log('Error at signup ', err);
            Snackbar.show({
              title: 'err signup',
              duration: Snackbar.LENGTH_SHORT,
            });
            return;
         } else if(result) {
         cognitoUser = result.user;
         Snackbar.show({
          title: 'success signup',
          duration: Snackbar.LENGTH_SHORT,
        });
         console.log('cognitoUser', cognitoUser)
        }
        });
      }

      cognitoSignUp() {
        const { username, password } = this.state;
        const authenticationData = {
          Username: username.trim(),
          Password: password,
        };
        const userData = {
          Username: username.trim(),
          Pool: userPool,
        };
        this.setState({ userData, authenticationData });
        cognitoUser = new CognitoUser(userData);
        const authenticationDetails = new AuthenticationDetails(authenticationData);
        this.showLoader();
        cognitoUser.authenticateUser(authenticationDetails, this.AuthenticationCallback);
      }
    
      validate() {
        const { username, password } = this.state;
        let emailValidated = false;
        let passwordValidated = false;
        if (username && username.length > 0) {
          emailValidated = true;
        }
        if (password) {
          if (password.length >7) {
            passwordValidated = true;
          }
        }
        return emailValidated === true && passwordValidated === true;
        // return true;
      }
    
      validateUsername() {
        const { username } = this.state;
        let emailValidated = false;
        if (username && username.length > 0) {
          emailValidated = true;
        }
        return emailValidated;
      }
    
      validateNewPassword() {
        const { newPassword, confirmNewPassword } = this.state;
        if (newPassword === confirmNewPassword) {
          return true;
        } else if (newPassword.length< 1) {
          Snackbar.show({
            title: 'Password is required',
            duration: Snackbar.LENGTH_SHORT,
          });
        } else if (confirmNewPassword.length<1) {
          Snackbar.show({
            title: 'Confirm password is required',
            duration: Snackbar.LENGTH_SHORT,
          });
        } else if (newPassword !== confirmNewPassword) {
        Snackbar.show({
          title: 'Passwords do not match',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
        return false;
      }
    
      // moveToNextState() {
      //   // this.props.navigation.navigate('TabNavigator');
      //   const { currentState } = this.state;
      //   const { navigation } = this.props;
      //   if (currentState === Constants.STATE_NORMAL) {
      //     // this.setState({ });
      //     this.setState({
      //       password: '',
      //       username: '',
      //       newPassword: '',
      //       confirmNewPassword: '',
      //       currentState: Constants.STATE_CHANGE_PASSWORD,
      //     });
      //   }
      //   if (currentState === Constants.STATE_CHANGE_PASSWORD) {
      //     this.setState({ currentState: Constants.STATE_PASSWORD_UPDATED });
      //   }
      //   if (currentState === Constants.STATE_PASSWORD_UPDATED) {
      //     // TODO: change back to login state
      //     // navigation.navigate('TabNavigator');
      //   }
      // }
    
      // eslint-disable-next-line class-methods-use-this
      showMessage(message, subtitle) {
        // {/* Messaging Container */}
        return (
          <View>
            <TextDefault style={Styles.goodMorningTextStyle} text={message} />
            <TextDefault style={Styles.loginSubtitleTextStyle} text={subtitle} />
          </View>
        );
      }
    
      showMain() {
        // console.log('state in login', this.state);
        const { currentState } = this.state;
        let message = this.getGreetingTime(moment());
        let subtitle = 'Welcome back.';
        let loginText = 'Sign in';
        if (currentState === Constants.STATE_NORMAL) {
          // do nothing
        } 
        // else if (currentState === Constants.STATE_CHANGE_PASSWORD) {
        //   message = 'Change Password ';
        //   subtitle = 'Set a new password to login';
        //   loginText = 'Submit';
        // } 
        else if (currentState === Constants.STATE_PASSWORD_UPDATED) {
          message = '';
          subtitle = 'Password Successfully Updated\n' + 'You are all set to go!';
          loginText = 'Proceed to Login';
        } else if (currentState === Constants.STATE_FORGOT_PASSWORD) {
          message = '';
          subtitle = 'Enter your username';
        } else if (currentState === Constants.STATE_FORGOT_PASSWORD_REQUESTED) {
          message = '';
          subtitle = 'Set a new password';
        } else if (currentState === Constants.STATE_NEW_SIGN_UP) {
          message='';
          subtitle='';
        }
    
        return (
          <LinearGradient style={{ flex: 1 }} colors={['#2e5bb6', '#5b9ed2']}>
            <GeneralStatusBarColor backgroundColor="#2e5bb6" barStyle="light-content" />
            <Loader loading={this.state.loading} />
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === 'ios' ? 'padding' : null}
              enabled
            >
              <View style={Styles.logoContainer}>
                {/* Container for messaging in different states */}
                <Image style={Styles.splashLogoStyle} source={require('../../Assets/stayWhite.png')} />
                {this.showMessage(message, subtitle)}
                {this.getMainContainer(loginText, subtitle)}
              </View>
            </KeyboardAvoidingView>
          </LinearGradient>
        );
      }
    
      render() {
        // console.log('sttae in login', state);
        return this.showMain();
      }
    }



    // render() {
    //     return(
    //         <View style={Styles.formContainer}>
    //             <TextInput 
    //                 style={Styles.loginTextInput} 
    //                 underlineColorAndroid='rgba(0,0,0,0)'
    //                 placeholder= 'Email'
    //                 placeholderTextColor= '#ffffff' />
    //             <TextInput 
    //                 style={Styles.loginTextInput} 
    //                 underlineColorAndroid='rgba(0,0,0,0)'
    //                 placeholder= 'Password'
    //                 secureTextEntry={true}
    //                 placeholderTextColor= '#ffffff' />
    //             <TouchableOpacity style={Styles.loginButton} >
    //                 <Text style={Styles.loginButtonText} >
    //                     {this.props.type}
    //                 </Text>
    //             </TouchableOpacity>
    //         </View>
    //     )
    // }
// }