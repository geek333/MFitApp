import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
//library imports 
//For React Navigation 4+
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator,NavigationDrawerStructure} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './Home';
import CrisisScreen from './Crisis';
import Gratitude from './Gratitude';
import Mindfullness from './Mindfulness';
import MyValues from './MyValues';
import LocalEyePeninsulaService from './LocalEyePeninsulaServices';
import Freedom from './FreedomList'
import Power from './PowerList'
import Fun from './FunList'
import LoveBelongings from './Love_Belonging'
import Survival from './Survival'




 class Loading extends React.Component {
 //Structure for the navigatin Drawer
 toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          {/*Donute Button Image */}
          <Image
            source={require('../images/drawer.png')}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
 

 
const DrawerNavigatorExample = createDrawerNavigator({
  //Drawer Optons and indexing
  Home : {
    //Title
    screen: HomeScreen
  },
  Gratitude : {
    //Title
    screen: Gratitude
    },
    Crisis : {
        //Title
        screen: CrisisScreen
        },
    Mindfullness : {
    //Title
    screen: Mindfullness
    },
    'My Values' : {
        //Title
        screen: MyValues
        },
    'Local Eye Peninsula Services ' : {
            //Title
            screen: LocalEyePeninsulaService
            },
    Freedom : {
              //Title
              screen: Freedom
              },
    Power : {
                //Title
                screen: Power
                },
    Survival : {
                  //Title
                  screen: Survival
                  },
    Love : {
                    //Title
                    screen: LoveBelongings
                    },
    Fun : {
                      //Title
                      screen: Fun
                      },
});
 
export default createAppContainer(DrawerNavigatorExample);