import React from 'react'
import {View, Text, TextInput, Button, KeyboardAvoidingView} from 'react-native'

const NameEntryScreen = (props) => {
  if (props.currentScreen != "NameEntry") {
    return null
  }
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: 'red', fontSize: 60, marginBottom: 35}}>{props.pendingCustomer}</Text>
        <KeyboardAvoidingView behavior="padding">
          <TextInput
            style={{height:80, width:500, backgroundColor:'#95a5a6', borderRadius:10, textAlign:'center'}}
            keyboardType={'default'}
            returnKeyType={'done'}
            keyboardAppearance={'dark'}
            spellCheck={false}
            onChangeText={props.changeInputTextValue}
            value={props.pendingCustomer}
          />
        </KeyboardAvoidingView>
        <View style={{marginTop: 40}}>
          <Button onPress={props.navigateToBarbers} title="Please Select a Barber"/>
        </View>
        <View style={{marginTop: 40}}>
          <Button onPress={props.changeScreen} title="Queue"/>
        </View>
        <View style={{marginTop: 40}}>
          <Button onPress={props.logState} title="Console Log State"/>
        </View>
    </View>
  )
}
export default NameEntryScreen
