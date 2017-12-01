import React from 'react'
import {View, Text, Button, ScrollView, TouchableOpacity} from 'react-native'

const QueueScreen = (props) => {
  if (props.currentScreen != "Queue") {
    return null
  }
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 25}}>
      <Text style={{fontSize: 72, fontWeight: '700', color: '#2ecc71'}}>CUSTOMERS</Text>
      <Button onPress={() => console.log(`filteredBarber is set to ${props.filteredBarber}`)} title="Log Barber State"/>
      <Button onPress={props.changeScreen} title="Go to NameEntry"/>
      <View
        style={{
          flex:1,
          flexDirection: 'column',
          flexWrap: 'nowrap',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          marginTop: 30
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#2b2b2b',
            width: 900,
            height: 50,
            padding: 10,
            borderBottomWidth: 2,
            borderBottomColor: '#ecf0f1'
          }}>
          <Text style={{color: '#ecf0f1', fontSize: 24, fontWeight: '700'}}>Name | </Text>
          <Text style={{color: '#ecf0f1', fontSize: 24, fontWeight: '700'}}>Barber</Text>
        </View>
        <ScrollView>
          {props.customers.map((customer) =>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#1c1c1c',
                width: 900,
                height: 75,
                borderBottomWidth: 0.5,
                borderBottomColor: '#ecf0f1',
                padding: 15
              }}
              key={customer.id}>
              <Text style={{color: '#e67e22', fontSize: 24, fontWeight: '700'}}>{customer.name} | </Text>
              <Text style={{color: '#8e44ad', fontSize: 24, fontWeight: '700'}}>{customer.barber}  </Text>
              <TouchableOpacity onPress={() => props.removeCustomerFromQueue(customer.id)}>
                <View style={{width: 115, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2ecc71', borderRadius: 7}}>
                  <Text style={{color: '#ecf0f1', fontSize: 18, fontWeight: '700'}}>Select</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  )
}


export default QueueScreen
