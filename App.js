// ****** Node Modules/Libraries ******
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, StatusBar, Vibration} from 'react-native';

import NameEntryScreen from './screens/NameEntryScreen'
import BarberSelectScreen from './screens/BarberSelectScreen'
import ConfirmationScreen from './screens/ConfirmationScreen'
import QueueScreen from './screens/QueueScreen'

import fakeCustomers from './FakeData'

class App extends Component {
  state = {
    currentScreen: "NameEntry",
    pendingCustomer: "",
    pendingBarberPref: "",
    customers: fakeCustomers
  }

  // On BarberSelectScreen: switches to confirmation screen
  // sets timer to go back to name entry after 10 sec
  timerTest = () => {
    this.setState({currentScreen: "Confirmation"});
    setTimeout(() => {this.setState({currentScreen: "NameEntry"})}, 10000)
  }

  // Navigates to Confirmation screen and then, after 3 seconds, NameEntry
  confirmationNavigation = () => {
    this.setState({currentScreen: "Confirmation"});
    setTimeout(() => {this.setState({currentScreen: "NameEntry"})}, 3000)
  }

  removeCustomerFromQueue = id =>
    this.setState({
      customers: this.state.customers.filter(customer => id !== customer.id)
    })


  // **** ROUTING FUNCTIONS

  // navigates to screen passed as argument
  changeScreen = (newScreen) => {
    this.setState({currentScreen: newScreen})
  }
  // navigates to BarberSelectScreen
  navigateToBarbers = () => {
    if (this.state.pendingCustomer) {
      this.setState({currentScreen: 'BarberSelect'})
    }
  }

  // This adds a pending barber preference
  addBarberPref = (barber) => {
    this.setState({pendingBarberPref: barber})
  }

  /*
    1. retrieves a new id via newCustomerId()
    2. returns new customer array with all previous items, and the new
    customer added to the bottom of the list
    3. sets pendingCustomer to an empty string
    4. fires confirmationNavigation function
  */
  addCustomerToQueue = (barber) => {
    const id = this.newCustomerId()
    this.setState({
      customers: [
        ...this.state.customers,
        {
          id,
          name: this.state.pendingCustomer,
          barber
        }
      ],
      pendingCustomer: ''
    });
    this.confirmationNavigation()
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
          changeScreen={() => this.changeScreen("Queue")}
          navigateToBarbers={this.navigateToBarbers}
        />
        <BarberSelectScreen
          currentScreen={this.state.currentScreen}
          pendingCustomer={this.state.pendingCustomer}
          barbers={this.state.barbers}
          logState={this.logState}
          changeScreen={() => this.changeScreen("NameEntry")}
          addBarberPref={this.addBarberPref}
          addCustomerToQueue={this.addCustomerToQueue}
          timerTest={this.timerTest}
          confirm={() => this.changeScreen("Confirmation")}
        />
        <ConfirmationScreen
          currentScreen={this.state.currentScreen}
          // confirmedCustomerInfo={this.confirmedCustomerInfo}
          logState={this.logState}
        />
        <QueueScreen
          currentScreen={this.state.currentScreen}
          customers={this.state.customers}
          changeScreen={() => this.changeScreen("NameEntry")}
          removeCustomerFromQueue={this.removeCustomerFromQueue}
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
