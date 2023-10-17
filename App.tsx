import * as React from 'react';
import { StyleSheet,View,Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import NetInfo from '@react-native-community/netinfo';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from './Navigation/MainNavigation';
import { AuthProvider,useAuth } from './contexts/auth';
import { Provider } from 'react-redux'
// import Login from './screens/Login';
import SelectUser from './screens/SelectUser';
import {store} from './contexts/store'
import { useSelector,useDispatch } from 'react-redux';
import Login from './screens/Login';

export function Main() {

  const dispatch = useDispatch()
  const count:number = useSelector((state:any)=>state.counter.value)
    // NetInfo.fetch().then(state => {
    //     console.log('Connection type', state.type);
    //     console.log('Is connected?', state.isConnected);
    //   });
      
  return (
    <AuthProvider>
      {count === 0?
        <Login/>
      :
        <MainNavigation/>
      }
</AuthProvider>
      
  );
}


export default function App(){
    return(
      <Provider store={store}>
      <View><Text>remove mytailwind</Text></View>
        {/* <Main/> */}
      </Provider>
  )
}
