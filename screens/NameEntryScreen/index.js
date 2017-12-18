import React from 'react';
import {View, Text, TextInput, Button, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback, Keyboard} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Icon } from 'react-native-elements';

const NameEntryScreen = (props) => {
  if (props.currentScreen != "NameEntry") {
    return null
  }
  return (
    <View style={{flex: 1, width: 1000}}>
      <KeyboardAwareScrollView
        style={{ backgroundColor: '#1b1b1b' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={{marginTop: 185}}
        scrollEnabled={false}
      >
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <View style={{marginBottom: 75}}>
            <View style={{marginBottom: 10}}>
              <Text style={{fontSize: 60, fontWeight: '200', color: "#ecf0f1", textAlign: "center", letterSpacing: 2}}>
                WELCOME TO{"\n"}BOSTONIAN BARBER SHOP
              </Text>
            </View>
            <Text style={{fontSize: 23, fontWeight: '700', color: "#ecf0f1", textAlign: "center", letterSpacing: 2}}>
              Enter your
              <Text style={{fontWeight: '900', color: '#2980b9'}}> FIRST NAME </Text>
              and
              <Text style={{fontWeight: '900', color: '#2980b9'}}> LAST INITIAL </Text>
                below.
            </Text>
          </View>

            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={{marginLeft: 100, height:110, width: 700, textAlign:'center', fontSize: 50, fontWeight: '700', color: "#ecf0f1", backgroundColor: '#1e1e1e', borderBottomWidth: 2, borderBottomColor: '#262626'}}
                autoCapitalize={'words'}
                autoCorrect={false}
                keyboardType={'default'}
                returnKeyType={'done'}
                keyboardAppearance={'dark'}
                onChangeText={props.changeInputTextValue}
                value={props.pendingCustomer}
                onEndEditing={Keyboard.dismiss}
              />
              <View style={{marginLeft: 30}}>
                <Icon name='chevron-right' type='entypo' color='#ecf0f1' size={95} onPress={props.navigateToBarbers}/>
              </View>
            </View>

            {/* </KeyboardAvoidingView> */}
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
        </KeyboardAwareScrollView>
      <TouchableOpacity style={{width:125, height: 125, position: 'absolute', left:-10, top:650}} onPress={props.changeScreen}></TouchableOpacity>
    </View>
  )
}
export default NameEntryScreen
