import React from 'react'
import {View, Text} from 'react-native'

const QueueRow = props =>
<View style={{flexDirection: 'row'}}>
  <View style={{width: 200}}>
    <Text style={{color: props.textColor, fontSize: 24, fontWeight: '700'}}>{props.name}</Text>
  </View>
  <View>
    <Text style={{color: props.textColor, fontSize: 24, fontWeight: '700'}}>{props.barber}</Text>
  </View>
</View>
export default QueueRow
