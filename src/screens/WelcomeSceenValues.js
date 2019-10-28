import React, { Component } from 'react'
import { View, TouchableOpacity, Text,Button } from 'react-native'
import DraggableFlatList from 'react-native-draggable-flatlist'
import styles from './style';
 
export default class WelcomeScreenValues extends Component {
 
  state = {
    data: ["Family , Firends , Cooperation","Achivements , Goals ,Purpose","Choices , Self Reliance , Free WIll","Play , Pleasure , Enjoyment", "Safety , Confort , Shelter"].map((d, index) => ({
      key: `item-${index}`,
      label: d,
     }))
  }
 
  renderItem = ({ item, index, move, moveEnd, isActive }) => {
    return (
      
      <View>
          <TouchableOpacity
        style={{ 
          height: 45, 
          backgroundColor: isActive ? '#0099cc' : '#262626',
          alignItems:"stretch",
          justifyContent: 'center',
          paddingTop:3,
          borderColor : '#ffffff',
          alignSelf : "stretch",
          width:320,
          margin : 2
        }}
        onLongPress={move}
        onPressOut={moveEnd}
      >
        <Text style={{ 
          fontWeight: 'bold', 
          color: '#ffffff',
          fontSize:12,
          textAlign :"center",
          paddingTop:3
        }}>{item.label}</Text>
      </TouchableOpacity>
     </View>
    )
  }
 
  render() {
    return (
      <View style={styles.container}>
        
            <View> 
              <Text style={{fontSize:32}}>Your Values</Text>
            </View>

            <View> 
              <Text style={{fontSize:14 , textAlign:"center"}}>Think about what is more important to you and order the items from most to less important</Text>
            </View>
            <View style={{height : 400}}>
            <DraggableFlatList
                data={this.state.data}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => `draggable-item-${item.key}`}
                scrollPercent={5}
                onMoveEnd={({ data }) => this.setState({ data })}
              />
            </View>
            
             <View>

             <Button style={{ color : '#e93766', marginBottom : 40 ,alignItems : "center"}} title="Next" onPress={()=>this.props.navigation.navigate('WelcomeValues',{data: this.state.data, })} color="#e93766"/>
              
             </View>

             
      </View>
      
    )
  }
}
