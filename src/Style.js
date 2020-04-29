import { StyleSheet } from 'react-native';

// console.log('print the props in style', this.props);
const Styles = StyleSheet.create({
  loginContainer: {
    // backgroundColor: '#5f2c82',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashLogoContainer: {
    flex: 1,
    padding: 2,
    margin: 2,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  splashLogoStyle: {
    width: 200,
    height: 100,
    marginTop: 50,
    marginBottom: 30,
    alignSelf: 'center',
  },
  logoTextStyle: {
    fontSize: 16,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical:10, //my change
  },
  loginTextInput: {
    width: 300,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 10,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
  loginButton: {
    width: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpTextContent: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingVertical: 16,
    flexDirection: 'row',
  },
  formContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  signUpTextstyle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 16,
  },
  signUpButton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  defaultText: {
    textAlign: 'center',
    color: 'white',
    padding: 15,
    // width: 500,
    // fontSize: 120,
  },
  goodMorningTextStyle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
    paddingBottom: 0,
  },
  loginSubtitleTextStyle: {
    fontSize: 20,
    margin: 0,
    padding: 0,
    marginBottom: 30,
    // marginTop: 10,
  },
});

export default Styles;