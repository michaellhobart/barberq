import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Button} from 'react-native'

import { Icon } from 'react-native-elements';

import BarberCard from '../../Components/BarberCard'

const BarberSelectScreen = (props) => {
  if (props.currentScreen != "BarberSelect") {
    return null
  }
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={{width: 100, height: 100, position: 'absolute', left: 5, top: 5, justifyContent: 'center'}} >
        <Icon name='chevron-left' type='entypo' color='#7a7c7d' size={55} onPress={props.changeScreen}/>
      </View>
      <Text style={{padding: 25, color: '#ecf0f1', fontSize: 45, fontWeight: '700'}}>PLEASE SELECT A BARBER</Text>
      <View style={{flex: 1, flexDirection: 'row',flexWrap: 'wrap',justifyContent: 'center',alignItems: 'center',alignContent: 'center', marginBottom: 30}}>
        {props.barbers.map((barber, index) =>
          <BarberCard
            key={barber.id}
            name={barber.name}
            avatar={barber.avatar}
            addCustomer={() => props.addCustomerToQueue(barber.name)}
          />
        )}
      </View>
      {/* <Button onPress={props.logState} title="Console Log State"/> */}
    </View>
  )
}

export default BarberSelectScreen
