import React,{useEffect} from 'react';
import { StyleSheet,View,Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import NetInfo from '@react-native-community/netinfo';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from './Navigation/MainNavigation';
import { Provider } from 'react-redux'
import SelectUser from './screens/SelectUser';
import {store} from './contexts/store'
import { useSelector,useDispatch } from 'react-redux';
import Login from './screens/Login';
import { ThemeProvider } from 'react-native-magnus';
import Loading from './screens/Loading';
import SignUp from './screens/SignUp';
import { UserLogin,LoadingState } from './util/interfaces'
import { createStackNavigator } from '@react-navigation/stack';
import CustomerProfile from './screens/CustomerSide/CustomerProfile';
import SavedShops from './screens/CustomerSide/SavedShops';
import RegisterShop from './screens/RegisterShop';

const Stack = createStackNavigator();

export function Main() {

  let email:string|null = useSelector((state:{user:UserLogin})=> state.user.email)
  let type:boolean|null = useSelector((state:{user:UserLogin})=> state.user.type)
  let loading:boolean = useSelector((state:{loader:LoadingState})=>state.loader.isLoading)

  useEffect(() => {
    NetInfo.fetch().then(state => {
          console.log('Connection type', state.type);
          console.log('Is connected?', state.isConnected);
        });
    }, []);

  if(loading){
    return(
      <Loading/>
    )
  }
      
  if(email===null && type===null){
    return(
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
            <Stack.Screen name='SignUp' component={SignUp} options={{ headerShown: false }}/>
          </Stack.Navigator>
        </NavigationContainer>
    )
  }else if(email!==null && type===null){
    return(<SelectUser/>)
  }else{
    return(<MainNavigation/>)
  }


  // return(
  //   <SignUp/>
  // )
}


export default function App(){
    return(
      <ThemeProvider>
        <Provider store={store}>
          {/* <Main/> */}
          {/* <CustomerProfile/> */}
          {/* <SavedShops/> */}
          <RegisterShop/>
        </Provider>
      </ThemeProvider>
  )
}
