// ****** Node Modules/Libraries ******
import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, Text, TouchableOpacity, AsyncStorage} from 'react-native';

import NameEntryScreen from './screens/NameEntryScreen'
import BarberSelectScreen from './screens/BarberSelectScreen'
import ConfirmationScreen from './screens/ConfirmationScreen'
import QueueScreen from './screens/QueueScreen'
import BarberFilterScreen from './screens/BarberFilterScreen'

import fakeCustomers from './FakeData'

class App extends Component {
  state = {
    currentScreen: "NameEntry",
    pendingCustomer: "",
    pendingBarberPref: "",
    filteredBarber: "",
    barbers: [
      {id: 0, name: "Next Available"},
      {id: 1, name: "Pedro"},
      {id: 2, name: "John"},
      {id: 3, name: "Kayla"},
      {id: 4, name: "Corey"},
      {id: 5, name: "Matt"}
    ]
  }

  customers = []

  /**** FUNCTIONS TO CALL WHEN APP CHANGES ****/
  componentWillUpdate = async () => {
    try {
      console.log("componentWillUpdate");
      const storedCustomers = await AsyncStorage.getItem('customers');
      storedCustomers ? this.customers = JSON.parse(storedCustomers) : null;
    }
    catch (error) {
      console.log(error);
    }
  }

  // Navigates to Confirmation screen and then, after 3 seconds, NameEntry
  confirmationNavigation = () => {
    this.setState({currentScreen: "Confirmation"});
    setTimeout(() => {this.setState({currentScreen: "NameEntry"})}, 2000)
  }

  removeCustomerFromQueue = id =>
    this.setState({
      customers: this.state.customers.filter(customer => id !== customer.id),
      currentScreen: "NameEntry",
      filteredBarber: ""
    })


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


  /******** ASYNC TEST FUNCTIONS ********/

  saveData = () => {
    let obj = {
      name: 'Johb Dobe',
      email: 'tust@hormones.come',
      city: 'Rare, CO'
    }
    AsyncStorage.setItem('user', JSON.stringify(obj));
  }

  displayData = async () => {
    try {
      let user = await AsyncStorage.getItem('user');
      let parsed = JSON.parse(user)
      alert(parsed.name)
    }
    catch (error) {
      alert(error)
    }
  }

  removeData = () => AsyncStorage.multiRemove(['customers', 'lastCustomerId']);

  logAsyncStorage = async () => {
    const customerz = await AsyncStorage.getItem('customers')
    console.log(JSON.parse(customerz));
  }


  /******** COMPONENT RENDER JSX ********/

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
          changeScreen={() => this.changeScreen("BarberFilter")}
          navigateToBarbers={this.navigateToBarbers}
        />
        <BarberSelectScreen
          currentScreen={this.state.currentScreen}
          pendingCustomer={this.state.pendingCustomer}
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
          filterBarber={this.filterBarber}
          logState={this.logState}
        />
        <View>
          {/* <TouchableOpacity onPress={this.saveData}>
            <Text style={{color: '#fefefe', fontSize: 40, fontWeight: '700'}}>Click me to save data</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.displayData}>
            <Text style={{color: '#fefefe', fontSize: 40, fontWeight: '700',}}>Click me to Display data</Text>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={this.removeData}>
            <Text style={{color: '#fefefe', fontSize: 40, fontWeight: '700',}}>Click me to Remove data</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.logAsyncStorage}>
            <Text style={{color: '#fefefe', fontSize: 40, fontWeight: '700',}}>Console.log AsyncStorage</Text>
          </TouchableOpacity>
        </View>
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
