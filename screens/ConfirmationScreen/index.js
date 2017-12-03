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
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 72, fontWeight: '700', color: '#2ecc71'}}>SUCCESS!</Text>
        <Text style={{color: '#fefefe',fontSize: 28,fontWeight: '700',paddingBottom: 20,}}>You are now in line!</Text>
        {/* <Button onPress={this.props.logState} title="Console Log State"/> */}
      </View>
    )
  }
}

export default ConfirmationScreen
