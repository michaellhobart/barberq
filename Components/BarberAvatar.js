import React from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'

import { Avatar, Icon } from 'react-native-elements'

const BarberAvatar = props => {
  if (props.name == "Next Available") {
    return <Avatar width={225} rounded icon={{name: 'scissors', type: 'entypo'}} iconStyle={{color: '#ecf0f1'}} activeOpacity={0.7} overlayContainerStyle={{backgroundColor: '#1b1b1b'}}/>
  }
  return (
    <Avatar width={225} rounded source={props.avatar} />
  )
}

export default BarberAvatar
