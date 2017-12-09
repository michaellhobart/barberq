// ****** Node Modules/Libraries ******
import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, Text, TouchableOpacity, AsyncStorage} from 'react-native';

import Expo, {ScreenOrientation, KeepAwake} from 'expo';

import NameEntryScreen from './screens/NameEntryScreen'
import BarberSelectScreen from './screens/BarberSelectScreen'
import ConfirmationScreen from './screens/ConfirmationScreen'
import QueueScreen from './screens/QueueScreen'
import BarberFilterScreen from './screens/BarberFilterScreen'

import fakeCustomers from './FakeData'

class App extends Component {
  state = {
    currentScreen: "BarberSelect",
    pendingCustomer: "",
    pendingBarberPref: "",
    filteredBarber: "",
    barbers: [
      {id: 0, name: "Matt", avatar: require('./assets/images/barbers/matt.jpg')},
      {id: 1, name: "Pedro", avatar: require('./assets/images/barbers/pedro.jpg')},
      {id: 2, name: "John", avatar: require('./assets/images/barbers/john.jpg')},
      {id: 3, name: "Kayla", avatar: require('./assets/images/barbers/kayla.jpg')},
      {id: 4, name: "Corey", avatar: require('./assets/images/barbers/corey.jpg')},
      {id: 5, name: "Next Available", avatar: require('./assets/images/barbers/pedro.jpg')}
    ]
  }

  customers = []

  /**** FUNCTIONS TO CALL WHEN APP LOADS ****/

  componentWillMount = () => {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.LANDSCAPE_RIGHT);
  }

  /**** FUNCTIONS TO CALL WHEN APP CHANGES ****/

  componentWillUpdate = async () => {
    try {
      const storedCustomers = await AsyncStorage.getItem('customers');
      storedCustomers ? this.customers = JSON.parse(storedCustomers) : null;
      // console.log(this.customers);
    }
    catch (error) {
      console.log(error);
    }
  }


  removeCustomerFromQueue = async (id) => {
    try {
      const customers = await AsyncStorage.getItem('customers');
      const parsedCustomers = JSON.parse(customers).filter(customer => id !== customer.id);
      AsyncStorage.setItem('customers', JSON.stringify(parsedCustomers));

      this.setState({
        currentScreen: "NameEntry",
        filteredBarber: ""
      })
    }
    catch (error) {
      console.log(error);
    }
  }



  /**** ROUTING FUNCTIONS ****/

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

  // Navigates to Confirmation screen and then, after 3 seconds, NameEntry
  confirmationNavigation = () => {
    this.setState({currentScreen: "Confirmation"});
    setTimeout(() => {this.setState({currentScreen: "NameEntry"})}, 2000)
  }

  // This adds a pending barber preference
  addBarberPref = (barber) => {
    this.setState({pendingBarberPref: barber})
  }


  /******** BARBER FILTER FUNCTIONS *********/

  filterBarber = (barber) => {
    this.setState({filteredBarber: barber, currentScreen: "Queue"})
  }


    /******** CUSTOMER QUEUE FUNCTIONS *********/

  /*
    1. retrieves a new id via newCustomerId()
    2. returns new customer array with all previous items, and the new
    customer added to the bottom of the list
    3. sets pendingCustomer to an empty string
    4. fires confirmationNavigation function
  */

  addCustomerToQueue = async (barber) => {
    try {
      const customers = await AsyncStorage.getItem('customers');
      const parsedCustomers = customers ? JSON.parse(customers) : [];
      const asyncId = await AsyncStorage.getItem('lastCustomerId');
      const id = asyncId ? parseInt(asyncId, 10) : 0;
      const newCustomers = [
        ...parsedCustomers,
        {
          id,
          name: this.state.pendingCustomer,
          barber
        }
      ];
      await AsyncStorage.multiSet([
        ['customers', JSON.stringify(newCustomers)],
        ['lastCustomerId', (id += 1).toString()]
      ]);
      this.setState({
        pendingCustomer: ''
      });
      this.confirmationNavigation();
    }
    catch (error){
      console.log(error);
    };
  };

  // Logs the state afer button is pressed
  logState = () => console.log(this.state);

  // Takes the value from the inputText in NameEntryScreen (as "text"), sets the state value of pendingCustomer to the "text" value
  changeInputTextValue = (text) => {
    this.setState({pendingCustomer: text})
  }

  /******** COMPONENT RENDER JSX ********/

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#1b1b1b', alignItems: 'center', justifyContent: 'center'}}>
        <KeepAwake />
        <StatusBar hidden={true}/>
        <NameEntryScreen
          currentScreen={this.state.currentScreen}
          pendingCustomer={this.state.pendingCustomer}
          changeInputTextValue={this.changeInputTextValue}
          newCustomerHandler={this.newCustomerHandler}
          logState={this.logState}
          changeScreen={() => this.changeScreen("BarberFilter")}
          navigateToBarbers={this.navigateToBarbers}
        />
        <BarberSelectScreen
          currentScreen={this.state.currentScreen}
          barbers={this.state.barbers}
          logState={this.logState}
          changeScreen={() => this.changeScreen("NameEntry")}
          addCustomerToQueue={this.addCustomerToQueue}
          confirm={() => this.changeScreen("Confirmation")}
        />
        <ConfirmationScreen
          currentScreen={this.state.currentScreen}
          logState={this.logState}
        />
        <QueueScreen
          currentScreen={this.state.currentScreen}
          customers={this.customers}
          changeScreen={() => this.changeScreen("NameEntry")}
          removeCustomerFromQueue={this.removeCustomerFromQueue}
          filteredBarber={this.state.filteredBarber}
        />
        <BarberFilterScreen
          currentScreen={this.state.currentScreen}
          barbers={this.state.barbers}
          filterBarber={this.filterBarber}
          logState={this.logState}
        />
      </View>
    )
  }
}

export default App
