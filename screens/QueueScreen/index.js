import React from 'react'
import {View, Text, Button, ScrollView, TouchableOpacity} from 'react-native'

import QueueRow from '../../Components/QueueRow'

const QueueScreen = (props) => {
  if (props.currentScreen != "Queue") {
    return null
  }
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 25}}>
      <Text style={{fontSize: 72, fontWeight: '700', color: '#ecf0f1'}}>CUSTOMERS</Text>
      <TouchableOpacity onPress={props.changeScreen}>
        <Text style={{fontSize: 24, fontWeight: '700', color: '#c0392b'}}>Back to Main Screen</Text>
      </TouchableOpacity>
      <View
        style={{flex:1,flexDirection: 'column',flexWrap: 'nowrap',justifyContent: 'flex-start',alignItems: 'flex-start',marginTop: 30}}>
        <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: '#2b2b2b', width: 900, height: 50, padding: 15, borderBottomWidth: 2, borderBottomColor: '#ecf0f1'}}>
          <View style={{width: 200}}>
            <Text style={{color: '#ecf0f1', fontSize: 24, fontWeight: '700'}}>Name</Text>
          </View>
          <View>
            <Text style={{color: '#ecf0f1', fontSize: 24, fontWeight: '700'}}>Barber</Text>
          </View>
        </View>
        <ScrollView>
          {props.customers
            .filter(customer => customer.barber == props.filteredBarber || customer.barber == "Next Available")
            .map((customer, index) => {
              if (index === 0) {
                return(
                  <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: '#1c1c1c',width: 900,height: 75,borderBottomWidth: 0.5,borderBottomColor: '#ecf0f1',padding: 15}} key={customer.id}>
                    <QueueRow name={customer.name} barber={customer.barber} textColor='#ecf0f1'/>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                      <TouchableOpacity onPress={() => props.removeCustomerFromQueue(customer.id)}>
                        <View style={{width: 115, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2ecc71', borderRadius: 7}}>
                          <Text style={{color: '#ecf0f1', fontSize: 18, fontWeight: '700'}}>Select</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              }
              return (
                <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: '#1c1c1c',width: 900,height: 75,borderBottomWidth: 0.5,borderBottomColor: '#ecf0f1',padding: 15}} key={customer.id}>
                  <QueueRow name={customer.name} barber={customer.barber} textColor={'#575959'}/>
                </View>
              )
            })
          }
        </ScrollView>
      </View>
    </View>
  )
}


export default QueueScreen
