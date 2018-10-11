import React, {Component} from 'react'
import {View, Text, Button} from 'react-native'

class ConfirmationScreen extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    if (this.props.currentScreen != "Confirmation") {
        return null
    }
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 50}}>
        <Text style={{fontSize: 96, fontWeight: '700', color: '#2ecc71'}}>SUCCESS</Text>
        <Text style={{color: '#fefefe',fontSize: 22,fontWeight: '700',paddingBottom: 20, textAlign: 'center'}}>You are now in line.{'\n'}Your barber to call you shortly.</Text>
        {/* <Button onPress={this.props.logState} title="Console Log State"/> */}
      </View>
    )
  }
}

export default ConfirmationScreen
