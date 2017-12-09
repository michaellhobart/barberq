import React from 'react'
import {View, Text, Button, TouchableOpacity} from 'react-native'

const BarberFilterScreen = (props) => {
  if (props.currentScreen != "BarberFilter") {
    return null
  }
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 72, fontWeight: '700', color: '#e67e22'}}>FILTER BARBER</Text>
      {/* <Button onPress={props.logState} title="Console Log State"/> */}
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'flex-start'}}>
        {props.barbers
          .filter(barber => barber.name != "Next Available")
          .map((barber, index) =>
          <TouchableOpacity onPress={() => props.filterBarber(barber.name)} key={barber.id}>
            <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: "#ecf0f1", width: 500, marginBottom: 20, padding: 20, borderRadius: 20}}>
              <Text style={{color: '#2ecc71', fontWeight: '700', fontSize: 33}}>{barber.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default BarberFilterScreen
