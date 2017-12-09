import React from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'

import BarberAvatar from './BarberAvatar'

const BarberCard = props =>
<View>
  <TouchableOpacity
    onPress={props.addCustomer}>
    <View style={{
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10,
      width: 275,
      height: 275,
      borderRadius: 20,
    }}>
      <View style={{marginBottom: 10}}>
        <BarberAvatar name={props.name} avatar={props.avatar}/>
      </View>
      <Text style={{color:'#ecf0f1', fontWeight:'700', fontSize: 35}}>{props.name}</Text>
    </View>
  </TouchableOpacity>
</View>



export default BarberCard
