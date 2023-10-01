import { View, Text } from 'react-native'
import * as React from 'react';
import { Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomerHomePage from '../screens/CustomerSide/CustomerHomePage';
import CustomerProfile from '../screens/CustomerSide/CustomerProfile';
import SavedShops from '../screens/CustomerSide/SavedShops';
import ShopMapDisplay from '../screens/CustomerSide/ShopMapDisplay';
import FarmerHomePage from '../screens/FarmerSide/FarmerHomePage';
import FarmerShopPage from '../screens/FarmerSide/FarmerShopPage';
import AddStocks from '../screens/FarmerSide/AddStocks';
import FarmerProfile from '../screens/FarmerSide/FarmerProfile';
import ProductPage from '../screens/FarmerSide/ProductPage';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export default function MainNavigation() {
  const farmer = true
  return (
    <NavigationContainer>
      {!farmer?
      <ForFarmerSide/>
    :
      <ForCustomerSide/>
    }
    </NavigationContainer>
  )
}

function CustomerTabNavigation(){
  return(
      <Tab.Navigator initialRouteName='Home'>
        <Tab.Screen name="Home" component={CustomerHomePage} />
        <Tab.Screen name="ShopMapDisplay" component={ShopMapDisplay} />
      </Tab.Navigator>
  )
}

function FarmerTabNavigation(){
  return(
    <Tab.Navigator initialRouteName='Home'>
      <Tab.Screen name='Home' component={FarmerHomePage}/>
      <Tab.Screen name='FarmerShopPage' component={FarmerShopPage}/>
    </Tab.Navigator>
  )
}

function ForCustomerSide(){
  return(
      <Drawer.Navigator initialRouteName="CustomerHomePage">
        <Drawer.Screen name="CustomerHomePage" component={CustomerTabNavigation} />
        <Drawer.Screen name="CustomerProfile" component={CustomerProfile} />
        <Drawer.Screen name="SavedShops" component={SavedShops} />
      </Drawer.Navigator>
  )
}

function ForFarmerSide(){
  return(
      <Drawer.Navigator initialRouteName="CustomerHomePage">
        <Drawer.Screen name='FarmerHomePage' component={FarmerTabNavigation}/>
        <Drawer.Screen name='AddStocks' component={AddStocks}/>
        <Drawer.Screen name='FarmerProfile' component={FarmerProfile}/>
        <Drawer.Screen name='ProductPage' component={ProductPage}/>
      </Drawer.Navigator>
  )
}