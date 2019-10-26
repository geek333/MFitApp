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
import Freedom from './src/screens/FreedomList'
import Fun from './src/screens/FunList'
import Survival from './src/screens/Survival'
import Love from './src/screens/Love_Belonging'
import Power from './src/screens/PowerList'
import WelcomeValues from './src/screens/WelcomeValues'
import WelcomeResults from './src/screens/WelcomeResults'

console.disableYellowBox=true;


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
    },
    FreedomList :
    {
      screen : Freedom
    },
    Fun :
    {
      screen : Fun
    }
    ,
    Survival :
    {
      screen : Survival
    }
    ,
    Love :
    {
      screen : Love
    }
    ,
    Power :
    {
      screen : Power
    },
    WelcomeValues :
    {
      screen : WelcomeValues
    },
    WelcomeResults :
    {
      screen : WelcomeResults
    },

  },
  {
    initialRouteName: 'Login'
  }
);

export default createAppContainer(App);