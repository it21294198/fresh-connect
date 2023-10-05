import { View, Text,Button} from 'react-native'
import React from 'react'
import { CommonActions } from '@react-navigation/native';

export default function Logout({ navigation }:any) {

    const goToSettings = () => {
    // Use CommonActions.navigate to navigate to the "Settings" screen
    navigation.dispatch(
      CommonActions.navigate({
        name: 'SelectUser',
      })
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    <Button title="Go to Settings" onPress={goToSettings} />
    </View>
  )
}