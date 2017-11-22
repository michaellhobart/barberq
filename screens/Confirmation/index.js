import React from 'react'
import {View, Text, Button, StyleSheet} from 'react-native'

const ConfirmationScreen = ({navigation, state}) => (
  <View style={styles.container}>
    <Text style={{fontSize: 72, fontWeight: '700', color: '#2ecc71'}}>SUCCESS!</Text>
    <Text style={styles.initialText}>You are waiting for {barberblock2}</Text>
    <Button onPress={() => {
      navigation.navigate('NameEntry')
      console.log(`Navigation.state: ${JSON.stringify(navigation.state)}`);
    }}
      title="<-- Back to Name input"/>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1b1b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialText: {
    color: '#fefefe',
    fontSize: 28,
    fontWeight: '700',
    paddingBottom: 20,
  }
});

export default ConfirmationScreen
