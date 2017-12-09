import React from 'react';
import {View, Text, TextInput, Button, KeyboardAvoidingView, TouchableOpacity} from 'react-native';


const NameEntryScreen = (props) => {
  if (props.currentScreen != "NameEntry") {
    return null
  }
  return (
    <View style={{flex: 1, width: 1010}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 100}}>
        {/* <Text style={{color: 'red', fontSize: 60, marginBottom: 35}}>{props.pendingCustomer}</Text> */}
        <View style={{marginBottom: 75}}>
          <Text style={{fontSize: 60, fontWeight: '200', color: "#ecf0f1", textAlign: "center", letterSpacing: 2}}>
            WELCOME TO{"\n"}BOSTONIAN BARBER SHOP
          </Text>
          <Text style={{fontSize: 23, fontWeight: '700', color: "#ecf0f1", textAlign: "center", letterSpacing: 2}}>
            Enter your first name and last initial below.
          </Text>
        </View>
          <KeyboardAvoidingView behavior="padding">
            <TextInput
              style={{height:110, width: 800, textAlign:'center', fontSize: 50, fontWeight: '700', color: "#ecf0f1", backgroundColor: '#1e1e1e', borderBottomWidth: 2, borderBottomColor: '#262626'}}
              autoCapitalize={'words'}
              autoCorrect={false}
              keyboardType={'default'}
              returnKeyType={'next'}
              keyboardAppearance={'dark'}
              onChangeText={props.changeInputTextValue}
              value={props.pendingCustomer}
              // placeholder="TOUCH HERE"
              // placeholderTextColor={"#ecf0f1"}
              onEndEditing={props.navigateToBarbers}
            />
          </KeyboardAvoidingView>
          {/* <View style={{marginTop: 40}}>
            <Button onPress={props.navigateToBarbers} title="Please Select a Barber"/>
          </View> */}
          {/* <View style={{marginTop: 40}}>
            <Button onPress={props.changeScreen} title="Go to Customer Queue"/>
          </View> */}
          {/* <View style={{marginTop: 40}}>
            <Button onPress={props.logState} title="Console Log State"/>
          </View> */}
      </View>
      <TouchableOpacity style={{width:125, height: 125, position: 'absolute', left:-10, top:650}} onPress={props.changeScreen}>
      </TouchableOpacity>
    </View>
  )
}
export default NameEntryScreen
