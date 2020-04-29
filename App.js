import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './src/Screens/Login';
import SignUp from './src/Screens/SignUp';
import AuthLoading from './src/Screens/AuthLoading';
// import { store, persistor } from './src/ConfigureStore';

// const AppNavigator = createStackNavigator(
//   {
    // SignUp: SignUp,
    // TabNavigator: {
    //   screen: TabNavigatorRoot,
    //   path: '',
    // },
    // Chat: {
    //   screen: ChatMessaging,
    //   path: 'chat/:user',
    // },
  // },
  // {
    // initialRouteName: 'HomeScreen',
//     defaultNavigationOptions: {
//       header: null
//     },
//   },
//   {
//       headerMode: 'none',
//   },
// );

const AuthStack = createStackNavigator({ Login });

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      // AuthLoading,
      // App: AppNavigator,
      // App: {
      //   screen: AppNavigator,
      //   path: '',
      // },
      Auth: AuthStack,
    },
    {
      // initialRouteName: 'AuthLoading',
      initialRouteName: 'Auth',
      defaultNavigationOptions: {
        header: null
      },
    },
    {
      headerMode: 'none',
    },
  ),
);
 
const App = createAppContainer(AuthStack);
 
export default () => {
  return <App/>
};


// type Props = {};
// export default class App extends Component<Props>{
//   render(){
//     return <AppContainer/>;
//   }; 
// }
