import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Loading from './src/screens/Loading';
import SignUp from './src/screens/SignUp';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Welcome from './src/screens/WelcomeSceenValues'
import config from './src/common/constants.js';


const App = createStackNavigator(
  {
    Loading :{
      screen : Loading
    },
    SignUp :
    {
      screen : SignUp
    },
    Login :
    {
      screen : Login
    },
    Home :
    {
      screen : Home
    },
    Welcome :
    {
      screen : Welcome
    }
  },
  {
    initialRouteName: 'Login'
  }
);

export default createAppContainer(App);