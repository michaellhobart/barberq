import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'

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
      backgroundColor: '#8AA29E',
      borderRadius: 20,
    }}>
      <Text>{props.name}</Text>
    </View>
  </TouchableOpacity>
</View>



export default BarberCard
