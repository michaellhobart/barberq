import React from 'react'
import {View, Text, Button, TouchableOpacity} from 'react-native'

const BarberFilterScreen = (props) => {
  if (props.currentScreen != "BarberFilter") {
    return null
  }
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={{flex: 2, /*backgroundColor: '#e67e22',*/ justifyContent: 'center'}}>
        <Text style={{fontSize: 72, fontWeight: '700', color: '#ecf0f1'}}>BARBER NAME</Text>
      </View>
      <View style={{flex:5, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center', alignContent: 'flex-start', width: 900, /*backgroundColor: '#3498db'*/}}>
        {props.barbers
          .filter(barber => barber.name != "Next Available")
          .map((barber, index) =>
          <TouchableOpacity onPress={() => props.filterBarber(barber.name)} key={barber.id}>
            <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: "#95a5a6", width: 400, marginBottom: 40, padding: 35, borderRadius: 20}}>
              <Text style={{color: '#333333', fontWeight: '700', fontSize: 33}}>{barber.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default BarberFilterScreen
