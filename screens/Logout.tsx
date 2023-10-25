import { View, Text,TouchableOpacity,StyleSheet, Dimensions} from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux';
import { logOut, swithcUser } from '../features/user/userSlice';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { setLoadingFalse, setLoadingTrue } from '../features/connection/loaderSlice';

const screenHeight = Dimensions.get('window').height;

export default function Logout({ navigation ,props}:any) {
    const dispatch = useDispatch()

    const goToLoing = () => {
    // Use CommonActions.navigate to navigate to the "Settings" screen
    dispatch(setLoadingTrue())
    signOut(auth).then(() => {
      console.log('logout');
    }).catch((error:any) => {
      console.log('logout error',error);
    });
    dispatch(setLoadingFalse())
    dispatch(logOut())
    };

    const goToSelectUser = () =>{
      dispatch(swithcUser())
    }

  return (
    <DrawerContentScrollView >
      <View style={styles.container}>
        <View style={styles.emptyView} />
          <View style={styles.logout}>
            <TouchableOpacity onPress={goToLoing} style={styles.button}>
              <Text style={styles.text}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
    </DrawerContentScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:screenHeight/2,
  },
  emptyView: {
    flex: 1,
    justifyContent: 'center', // Vertically center the "Logout" button
    backgroundColor:'green'
  },
  logout: {
    justifyContent: 'center', // Center the button content horizontally
    alignItems: 'center', // Center the button content vertically
  },
  button:{
    backgroundColor:'green',
    padding:40,
    borderRadius:20
  },
  text:{
    color:'white',
    fontSize:20,
    fontWeight:'bold'
  }
})