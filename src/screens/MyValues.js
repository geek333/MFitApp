import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import styles from './style'
export default class MyValues extends React.Component {

 render() {
    return (
      <View style={styles.MainContainer}>
        <Text style={{ fontSize: 23 }}> MyValues</Text>
      </View>
    );
  }
}
