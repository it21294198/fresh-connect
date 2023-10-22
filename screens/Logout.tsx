import { View, Text,TouchableOpacity} from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux';
import { logOut, swithcUser } from '../features/user/userSlice';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

export default function Logout({ navigation ,props}:any) {
    const dispatch = useDispatch()

    const goToLoing = () => {
    // Use CommonActions.navigate to navigate to the "Settings" screen
    dispatch(logOut())
    navigation.navigate('AnotherScreen');
    // navigation.dispatch(
    //   CommonActions.navigate({
    //     name: 'SelectUser',
    //   })
    // );
    };

    const goToSelectUser = () =>{
      dispatch(swithcUser())
    }

  return (
    <DrawerContentScrollView>

    <DrawerItem
        label="Home"
        onPress={() => navigation.navigate('CustomerHomePage')}
      />
    <DrawerItem
        label="Profile"
        onPress={() => navigation.navigate('CustomerProfile')}
      />

    <View style={{padding:16,   flex: 1,
    justifyContent: 'space-between'}}>
    <TouchableOpacity onPress={goToSelectUser}>
      <Text>Swith User</Text>
    </TouchableOpacity>
    </View>

    <View style={{padding:16}}>
    <TouchableOpacity onPress={goToLoing}>
      <Text>Logout</Text>
    </TouchableOpacity>
    </View>

    </DrawerContentScrollView>
  )
}