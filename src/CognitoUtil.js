import {
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser,
    AuthenticationDetails,
  } from 'amazon-cognito-identity-js';
//   import { saveTokens } from './actions';
  // import { store } from './ConfigureStore';
  // PROD
  // export const poolData = {
  //   UserPoolId: 'us-east-1_B7dYgOPso', // Your user pool id here
  //   ClientId: '1b6fhbrgle7vf7fetnfm38auvh', // Your client id here
  // };
  // STAGE
  // export const poolData = {
  //   UserPoolId: 'us-east-1_pwbSVCmms', // Your user pool id here
  //   ClientId: 'ur4dsuk2d6gv4cl0uueg3dr7h', // Your client id here
  // };
  
   //DEV
      export const poolData = {
        UserPoolId: 'us-east-1_zlH7muUpt', // Your user pool id here
        ClientId: '44ui1qeirhrcdg8rvcrtc4lf94', // Your client id here
      };
  const userPool = new CognitoUserPool(poolData);
  // let cognitoUser;
  attributeList = [];
  
  //   userPool.storage.sync((err, result) => {
  //     if (err) {
  //     } else if (result === 'SUCCESS') {
  //       var cognitoUser = userPool.getCurrentUser();
  //       // Continue with steps in Use case 16
  //     }
  //     if (cognitoUser != null) {
  //       cognitoUser.getSession((err, session) => {
  //         if (err) {
  //           Snackbar.show({
  //             title: `${err.message}`,
  //             duration: Snackbar.LENGTH_SHORT,
  //           });
  //           return;
  //         }
  //         // console.log(`session validity: ${session.isValid()}`);
  //         this.props.navigation.navigate('TabNavigator');
  //       });
  //     }
  //   });
  
  export const getToken = () => {
    // const state = store.getState();
    // const authToken = state.pref.token;
    // return authToken;
    let cognitoUser = null;
    userPool.storage.sync((err, result) => {
      if (err) {
        // console.log(err);
      } else if (result === 'SUCCESS') {
        cognitoUser = userPool.getCurrentUser();
        // console.log(cognitoUser);
        if (cognitoUser != null) {
          cognitoUser.getSession((sessionError, sessionResult) => {
            if (sessionError) {
              // console.log(sessionError);
            } else {
              // console.log(sessionResult);
              if (sessionResult.isValid()) {
                // const accessToken = sessionResult.getAccessToken().getJwtToken();
                // console.log(`returning accessToken: ${accessToken}`);
                // return accessToken;
              }
              const refresh_token = sessionResult.refreshToken;
              cognitoUser.refreshSession(refresh_token, (error, refreshedSession) => {
                if (error) {
                  // console.log(error);
                } else {
                  // console.log(refreshedSession);
                  const idToken = refreshedSession.getIdToken().getJwtToken();
                  const accessToken = refreshedSession.getAccessToken().getJwtToken();
                  const refreshToken = refreshedSession.refreshToken.token;
                  store.dispatch(saveTokens(idToken, refreshToken, accessToken));
                  // return accessToken;
                }
              });
            }
          });
        } else {
          // console.log('current cognitoUser is null: ');
          // console.log(cognitoUser);
        }
      }
    });
  };
  