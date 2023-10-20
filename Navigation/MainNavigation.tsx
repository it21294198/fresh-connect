// import * as React from 'react';
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
import Logout from '../screens/Logout';
import FAQ from '../screens/FAQ';
import UpdateStocks from '../screens/FarmerSide/UpdateStocks';
import SelectUser from '../screens/SelectUser';
import { View, Image  } from 'react-native';
import { customDrawerPropsInterface } from '../util/interfaces';
import Svg, { Path } from "react-native-svg"
import chatIcon from "../assets/Chat.svg"

const drawerOptions = {
  drawerActiveTintColor: '#45A053',
  drawerActiveBackgroundColor: '#E5EFE3',

}

const drawerItemOptions ={
  drawerIcon: () => (<Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
  >
    <Path d="M16.993 6.667H3.227l6.883 6.883 6.883-6.883z" fill="#45A053" />
  </Svg>)
}

const drawerChatOptions ={
  drawerIcon: () => (
    <Image
      source={chatIcon}
      style={{width: 22, height: 22}}
    />
 ),
}

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export default function MainNavigation()
{
  const farmer = true
  return (
    <NavigationContainer>
      {/* {farmer? */}
      {!farmer ?
        <ForFarmerSide />
        :
        <ForCustomerSide />
      }
    </NavigationContainer>
  )
}

function CustomerTabNavigation()
{
  return (
    <Tab.Navigator initialRouteName='Home'>
      <Tab.Screen name="Home" component={CustomerHomePage} />
      <Tab.Screen name="ShopMapDisplay" component={ShopMapDisplay} />
      <Tab.Screen name="SavedShops" component={SavedShops} />
      <Tab.Screen name="CustomerProfile" component={CustomerProfile} />
    </Tab.Navigator>
  )
}

function FarmerTabNavigation()
{
  return (
    <Tab.Navigator initialRouteName='Home'>
      <Tab.Screen name='Home' component={FarmerHomePage} />
      <Tab.Screen name='FarmerShopPage' component={FarmerShopPage} />
      <Tab.Screen name='FarmerProfile' component={FarmerProfile} />
      <Tab.Screen name='ProductPage' component={ProductPage} />
    </Tab.Navigator>
  )
}

function ForCustomerSide()
{
  return (
    <Drawer.Navigator initialRouteName="CustomerHomePage" screenOptions={drawerOptions}>
      <Drawer.Screen name="CustomerHomePage" component={CustomerTabNavigation} options={drawerChatOptions}/>
      <Drawer.Screen name="CustomerProfile" component={CustomerProfile} options={drawerItemOptions}/>
      <Drawer.Screen name="SavedShops" component={SavedShops} />
      <Drawer.Screen name="HelpCenter" component={FAQ} />
      <Drawer.Screen name="SelectUser" component={SelectUser} options={{ headerShown: false }} />
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  )
}

function ForFarmerSide()
{
  return (
    <Drawer.Navigator initialRouteName="FarmerHomePage">
      <Drawer.Screen name='FarmerHomePage' component={FarmerTabNavigation} />
      <Drawer.Screen name='FarmerProfile' component={FarmerProfile} />
      <Drawer.Screen name='ProductPage' component={ProductPage} />
      <Drawer.Screen name='AddStocks' component={AddStocks} />
      <Drawer.Screen name='UpdateStocks' component={UpdateStocks} />
      <Drawer.Screen name="HelpCenter" component={FAQ} />
      <Drawer.Screen name="SelectUser" component={SelectUser} options={{ headerShown: false}} />
      <Drawer.Screen name='Logout' component={Logout} />
    </Drawer.Navigator>
  )
}