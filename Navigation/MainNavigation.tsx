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
import { View, Image } from 'react-native';
import { customDrawerPropsInterface } from '../util/interfaces';
import Svg, { Path } from "react-native-svg"
import chatIcon from "../assets/Chat.svg"
import emptyHome from "../assets/homeEmptyIcon.svg"
import filledHome from "../assets/homeFilledIcon.svg"
import filledHomeImg2 from "../assets/homeFilledIcon2.png"
import emptyHomeImg from "../assets/homeEmptyImg.png"
import accountsFilledIconImg from "../assets/accountsFilledIconImg.png"
import accountEmptyIconImg from "../assets/accountEmptyIconImg.png"
import favoutitesFilledIconImg from "../assets/favoutitesFilledIconImg.png"
import favoutitesEmptyIconImg from "../assets/favoutitesEmptyIconImg.png"
import helpCenterFilledIconImg from "../assets/helpCenterFilledIconImg.png"
import helpCenterEmptyIconImg from "../assets/helpCenterEmptyIconImg.png"
import switchTypeFilledIconImg from "../assets/switchTypeFilledIconImg.png"
import switchTypeEmptyIconImg from "../assets/switchTypeEmptyIconImg.png"
import logoutEmptyIconImg from "../assets/logoutEmptyIconImg.png"
import { useState } from 'react';
import React from 'react'
import { paths } from '../assets/strings';

export default function MainNavigation()
{
  const [isHomeActive, setIsHomeActive] = useState(false);
  const [currentPage, setCurrentPage] = useState('CustomerHomePage');

  const drawerOptions = {
    drawerActiveTintColor: '#45A053',
    drawerActiveBackgroundColor: '#E5EFE3',
  }

  const drawerHomeOptions = {
    drawerIcon: () => (
      currentPage == 'CustomerHomePage' ? <Image
        source={filledHomeImg2}
        style={{ width: 19, height: 20, resizeMode: 'contain' }}
      /> : <Image
        source={emptyHomeImg}
        style={{ width: 19, height: 20, resizeMode: 'contain' }}
      />
    ),
  }

  // const drawerProfileOptions = {
  //   drawerIcon: () => (
  //     currentPage == 'CustomerHomePage' ?
  //     <Svg
  //       width={20}
  //       height={15}
  //       viewBox="0 0 20 24"
  //     >
  //       <Path d={paths.filledHomePath.path1} fill="#45A053" />
  //       <Path d={paths.filledHomePath.path2} fill="#45A053" />
  //       <Path />


  //     </Svg>: null ),
  // }
  const drawerProfileOptions = {
    drawerIcon: () => (
      currentPage == 'CustomerProfile' ?
        <Image
          source={accountsFilledIconImg}
          style={{ width: 19, height: 20, resizeMode: 'contain' }}
        /> : <Image
          source={accountEmptyIconImg}
          style={{ width: 19, height: 20, resizeMode: 'contain'}}
        />
    )
  };

  const drawerFavouritesOptions = {
    drawerIcon: () => (
      currentPage == 'SavedShops' ?
        <Image
          source={favoutitesFilledIconImg}
          style={{ width: 22, height: 22, resizeMode: 'contain' }}
        /> : <Image
          source={favoutitesEmptyIconImg}
          style={{ width: 22, height: 22, resizeMode: 'contain' }}
        />
    ),
  };

  const drawerHelpOptions = {
    drawerIcon: () => (
      currentPage == 'HelpCenter' ?
        <Image
          source={helpCenterFilledIconImg}
          style={{ width: 20, height: 20, resizeMode: 'contain' }}
        /> : <Image
          source={helpCenterEmptyIconImg}
          style={{ width: 20, height: 20, resizeMode: 'contain' }}
        />
    ),
  };

  const drawerSwitchUserOptions = {
    drawerIcon: () => (
      currentPage == 'SelectUser' ?
        <Image
          source={switchTypeFilledIconImg}
          style={{ width: 22, height: 22, resizeMode: 'contain' }}
        /> : <Image
          source={switchTypeEmptyIconImg}
          style={{ width: 22, height: 22, resizeMode: 'contain' }}
        />
    ),
    headerShown: false,
  };

  const drawerLogOutOptions = {
    drawerIcon: () => (
      <View>
        <Image
          source={logoutEmptyIconImg}
          style={{ width: 19, height: 19.5, resizeMode: 'contain' }}
        />
      </View>
    ),
  };

  const drawerChatOptions = {
    drawerIcon: () => (
      currentPage == 'SavedShops' ?
        <Image
          source={favoutitesFilledIconImg}
          style={{ width: 22, height: 22, resizeMode: 'contain' }}
        /> : <Image
          source={favoutitesEmptyIconImg}
          style={{ width: 22, height: 22, resizeMode: 'contain' }}
        />
    ),
  }



  const Drawer = createDrawerNavigator();
  const Tab = createBottomTabNavigator();

  const farmer = true



  const handleItemClick = (id: string) =>
  {
    console.log('called handleItemClick with', id);
    setCurrentPage(id);

  }

  // const listenersHandler = ({ navigation }: any, name: string) => ({
  //   drawerItemPress: () => handleItemClick('CustomerProfile'),
  // })

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
    //ADD CHATS, SETTINGS (?), MY SHOP buttons
    //Remove unnecessary ones
    return (
      <Drawer.Navigator initialRouteName="CustomerHomePage" screenOptions={drawerOptions}>
        <Drawer.Screen name="CustomerHomePage" component={CustomerTabNavigation} options={drawerHomeOptions} listeners={({ navigation }) => ({
          drawerItemPress: () => handleItemClick('CustomerHomePage'),
        })} />
        <Drawer.Screen name="CustomerProfile" component={CustomerProfile} options={drawerProfileOptions} listeners={({ navigation }) => ({
          drawerItemPress: () => handleItemClick('CustomerProfile'),
        })} />
        <Drawer.Screen name="SavedShops" component={SavedShops} options={drawerFavouritesOptions} listeners={({ navigation }) => ({
          drawerItemPress: () => handleItemClick('SavedShops'),
        })} />
        <Drawer.Screen name="HelpCenter" component={FAQ} options={drawerHelpOptions} listeners={({ navigation }) => ({
          drawerItemPress: () => handleItemClick('HelpCenter'),
        })} />
        <Drawer.Screen name="SelectUser" component={SelectUser} options={drawerSwitchUserOptions} listeners={({ navigation }) => ({
          drawerItemPress: () => handleItemClick('SelectUser'),
        })} />
        <Drawer.Screen name="Logout" component={Logout} options={drawerLogOutOptions} listeners={({ navigation }) => ({
          drawerItemPress: () => handleItemClick('Logout'),
        })} />
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
        <Drawer.Screen name="SelectUser" component={SelectUser} options={{ headerShown: false }} />
        <Drawer.Screen name='Logout' component={Logout} />
      </Drawer.Navigator>
    )
  }

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