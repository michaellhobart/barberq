import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Button} from 'react-native'

import BarberCard from '../../Components/BarberCard'

const barbers = [
  {id: 0, name: "Next Available"},
  {id: 1, name: "Pedro"},
  {id: 2, name: "John"},
  {id: 3, name: "Kayla"},
  {id: 4, name: "Corey"},
  {id: 5, name: "Matt"}
]

const BarberSelectScreen = (props) => {
  if (props.currentScreen != "BarberSelect") {
    return null
  }
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{padding: 20, color: '#fefefe', fontSize: 28, fontWeight: '700'}}>{props.pendingCustomer},  please select a barber</Text>
      <View style={{flex: 1, flexDirection: 'row',flexWrap: 'wrap',justifyContent: 'center',alignItems: 'center',alignContent: 'flex-start'}}>
        {barbers.map((barber, index) =>
          <BarberCard
            key={barber.id}
            name={barber.name}
            addBarberPref={() => props.addCustomerToQueue(barber.name)}
          />
        )}
      </View>
      {/* <Button onPress={props.logState} title="Console Log State"/> */}
      {/* <Button onPress={props.changeScreen} title="Go To NameEntry"/> */}
      {/* <Button onPress={props.timerTest} title="Test Timer"/> */}
      {/* <Button onPress={props.confirm} title="Confirm Barber"/> */}
    </View>
  )
}

export default BarberSelectScreen
