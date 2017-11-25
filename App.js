// ****** Node Modules/Libraries ******
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, StatusBar, Vibration} from 'react-native';

import NameEntryScreen from './screens/NameEntryScreen'
import BarberSelectScreen from './screens/BarberSelectScreen'
import ConfirmationScreen from './screens/ConfirmationScreen'

class App extends Component {
  state = {
    currentScreen: "NameEntry",
    pendingCustomer: "",
    pendingBarberPref: "",
    customers:[],
  }

  // On BarberSelectScreen: switches to confirmation screen
  // sets timer to go back to name entry after 10 sec
  timerTest = () => {
    this.setState({currentScreen: "Confirmation"});
    setTimeout(() => {this.setState({currentScreen: "NameEntry"})}, 10000)
  }

  // **** ROUTING FUNCTIONS

  changeScreen = (newScreen) => {
    this.setState({currentScreen: newScreen})
  }

  // This adds a pending barber preference

  addBarberPref = (barber) => {
    this.setState({pendingBarberPref: barber})
  }

  // Logs the state afer button is pressed
  logState = () => console.log(this.state)

  // Accumulator for the customer ID's to increase with each customer added
  lastCustomerId = 0;

  // Takes the current lastCustomerId, increases it by one, and returns the new id
  newCustomerId = () => {
    const id = this.lastCustomerId;
    this.lastCustomerId += 1;
    return id;
  }

  /*
  1. Fires the function newCustomerId to retrieve a new id and assigns it to const id
  2. Fires setState function to:
    1. Add all of the previous customers to the new customer array
    2. Adds the new id, and the value from pendingCustomer from state to the array
  3. sets the pendingCustomer in state to ""
   */
  newCustomerHandler = () => {
    if (this.state.pendingCustomer) {
      const id = this.newCustomerId()
      this.setState({
        customers: [
          ...this.state.customers,
          {
            id,
            name: this.state.pendingCustomer
          }
        ],
        pendingCustomer: ""
      })
    }
  }

  // Takes the value from the inputText in NameEntryScreen (as "text"), sets the state value of pendingCustomer to the "text" value
  changeInputTextValue = (text) => {
    this.setState({pendingCustomer: text})
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#1b1b1b', alignItems: 'center', justifyContent: 'center'}}>
        <StatusBar hidden={true}/>
        <NameEntryScreen
          currentScreen={this.state.currentScreen}
          pendingCustomer={this.state.pendingCustomer}
          changeInputTextValue={this.changeInputTextValue}
          newCustomerHandler={this.newCustomerHandler}
          logState={this.logState}
          changeScreen={() => this.changeScreen("BarberSelect")}
          doVibrate={this.doVibrate}
        />
        <BarberSelectScreen
          currentScreen={this.state.currentScreen}
          pendingCustomer={this.state.pendingCustomer}
          barbers={this.state.barbers}
          logState={this.logState}
          changeScreen={() => this.changeScreen("NameEntry")}
          addBarberPref={this.addBarberPref}
          timerTest={this.timerTest}
          confirm={() => this.changeScreen("Confirmation")}
        />
        <ConfirmationScreen
          currentScreen={this.state.currentScreen}
        />
      </View>
    )
  }
}


// Styles for Components
const styles = StyleSheet.create({

  initialText: {
    color: '#fefefe',
    fontSize: 28,
    fontWeight: '700',
    paddingBottom: 20,
  },
  barberListContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'flex-start'
  },
  selectBarberText: {
    padding: 20,
    color: '#fefefe',
    fontSize: 28,
    fontWeight: '700',
  },
  barberContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    width: 275,
    height: 275,
    backgroundColor: '#8AA29E',
    borderRadius: 20,
  }
});

export default App
