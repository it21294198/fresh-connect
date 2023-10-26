import React, { useEffect, useState } from 'react';
import { createDrawerNavigator, DrawerItem, DrawerNavigationProp, DrawerItemList, DrawerContentScrollView, DrawerContentComponentProps } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
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

import { useSelector } from 'react-redux';

import { View, Image } from 'react-native';
import { customDrawerPropsInterface, UserLogin } from '../util/interfaces';

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
import addFilledIcon from "../assets/addFilledIcon.png"
import dashboardEmptyIcon from "../assets/dashboardEmptyIcon.png"
import dashboardFilledIcon from "../assets/dashboardFilledIcon.png"
import shopEmptyIcon from "../assets/shopEmptyIcon.png"
import shopFilledIcon from "../assets/shopFilledIcon.png"
import chatEmptyIcon from "../assets/chatEmptyIcon.png"
import chatFilledIcon from "../assets/chatFilledIcon.png"
import searchIcon from "../assets/searchIcon.png"
import customHamburger from "../assets/customHamburger.png"

import CustomerChatList from '../screens/CustomerSide/CustomerChatList';
import Chat from '../screens/Chat';
import CustomerShopPage from '../screens/CustomerSide/CustomerShopPage';
import CustomerProductPage from '../screens/CustomerSide/CustomerProductPage';


import { paths } from '../assets/strings';

import { Button, Div, Icon, Text } from "react-native-magnus";
import { getHeaderTitle } from '@react-navigation/elements';

import { DrawerProfile } from '../components/DrawerProfile';
import RegisterShop from '../screens/RegisterShop';
import { TestFile } from '../screens/CustomerSide/TestFile';

export default function MainNavigation()
{
  const [currentPage, setCurrentPage] = useState('CustomerHomePage');
  const [userData, setUserData] = useState<UserLogin>();
  // const navigation = useNavigation()
  let isSeller: boolean | null = useSelector((state: { user: UserLogin }) => state.user.isSeller)

  const drawerOptions = {
    drawerActiveTintColor: '#45A053',
    drawerActiveBackgroundColor: '#E5EFE3',
    drawerStyle: { borderTopRightRadius: 30, borderBottomRightRadius: 30 },
    headerTitleAlign: "center",
    headerLeft: (props: any) => (
      <Button
        bg='transparent'
        prefix={<Image
          source={customHamburger}
          style={{ width: 19, height: 21, resizeMode: 'contain', }}
        />}
      ></Button>
    ),
    headerShown: false,
  }

  const drawerHomeOptions = {
    drawerIcon: () => (
      currentPage === 'CustomerHomePage' || currentPage === 'FarmerHomePage' ? <Image
        source={filledHomeImg2}
        style={{ width: 19, height: 20, resizeMode: 'contain' }}
      /> : <Image
        source={emptyHomeImg}
        style={{ width: 19, height: 20, resizeMode: 'contain', }}
      />
    ),
    drawerItemStyle: { borderTopWidth: 1, borderTopEndRadius: 0, borderTopStartRadius: 0, borderTopColor: '#BCB4B4', marginVertical: 5 },

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
      currentPage === 'CustomerProfile' ?
        <Image
          source={accountsFilledIconImg}
          style={{ width: 19, height: 20, resizeMode: 'contain' }}
        /> : <Image
          source={accountEmptyIconImg}
          style={{ width: 19, height: 20, resizeMode: 'contain' }}
        />
    ),
    drawerItemStyle: { borderBottomWidth: 1, borderBottomEndRadius: 0, borderBottomStartRadius: 0, borderBottomColor: '#BCB4B4', marginVertical: 5 },
  };

  const drawerFavouritesOptions = {
    drawerIcon: () => (
      currentPage === 'SavedShops' ?
        <Image
          source={favoutitesFilledIconImg}
          style={{ width: 22, height: 22, resizeMode: 'contain' }}
        /> : <Image
          source={favoutitesEmptyIconImg}
          style={{ width: 22, height: 22, resizeMode: 'contain' }}
        />
    ),
    drawerItemStyle: { marginVertical: 5 },

  };

  const drawerChatsOptions = {
    drawerIcon: () => (
      currentPage === 'My Chats' ?
        <Image
          source={chatFilledIcon}
          style={{ width: 22, height: 22, resizeMode: 'contain' }}
        /> : <Image
          source={chatEmptyIcon}
          style={{ width: 22, height: 22, resizeMode: 'contain' }}
        />
    ),
    drawerItemStyle: { marginVertical: 5 },

  };

  const drawerHelpOptions = {
    drawerIcon: () => (
      currentPage === 'HelpCenter' ?
        <Image
          source={helpCenterFilledIconImg}
          style={{ width: 20, height: 20, resizeMode: 'contain' }}
        /> : <Image
          source={helpCenterEmptyIconImg}
          style={{ width: 20, height: 20, resizeMode: 'contain' }}
        />
    ),
    drawerItemStyle: { borderBottomWidth: 1, borderBottomEndRadius: 0, borderBottomStartRadius: 0, borderBottomColor: '#BCB4B4', marginVertical: 5, paddingBottom: 10 },
  };

  const drawerSwitchUserOptions = {
    drawerIcon: () => (
      currentPage === 'SelectUser' ?
        <Image
          source={switchTypeFilledIconImg}
          style={{ width: 22, height: 22, resizeMode: 'contain' }}
        /> : <Image
          source={switchTypeEmptyIconImg}
          style={{ width: 22, height: 22, resizeMode: 'contain', }}
        />
    ),
    drawerItemStyle: { borderBottomWidth: 1, borderBottomEndRadius: 0, borderBottomStartRadius: 0, borderBottomColor: '#BCB4B4', paddingBottom: 10, },
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
    drawerItemStyle: { marginVertical: 10 }
  };

  const drawerChatOptions = {
    drawerIcon: () => (
      currentPage === 'SavedShops' ?
        <Image
          source={chatFilledIcon}
          style={{ width: 22, height: 22, resizeMode: 'contain' }}
        /> : <Image
          source={chatEmptyIcon}
          style={{ width: 22, height: 22, resizeMode: 'contain' }}
        />
    ),
  }
  // const tabHomeOptions = {{({route}) => {
  //   tabBarIcon: 
  // }}}



  const Drawer = createDrawerNavigator();
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();

  let farmer: boolean | null = useSelector((state: { user: UserLogin }) => state.user.type)

  const handleItemClick = (id: string) =>
  {
    console.log('called handleItemClick with', id);
    setCurrentPage(id);

  }



  // const listenersHandler = ({ navigation }: any, name: string) => ({
  //   drawerItemPress: () => handleItemClick('CustomerProfile'),
  // })

  /**
   * <Tab.Navigator initialRouteName='Home' screenOptions={{ headerShown: false, tabBarActiveTintColor: '#45A053'}}>

   * <Tab.Navigator initialRouteName='Home' screenOptions={({route}) => ({
   * 
   * 
   * })}>

   */

  function CustomerTabNavigation()
  {
    return (
      <Tab.Navigator initialRouteName='Home' screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#45A053',
        tabBarIcon: ({ focused, color, size }) =>
        {
          let icon;
          if (route.name === 'Home')
          {
            icon = focused ? <Image
              source={filledHomeImg2}
              style={{ width: 19, height: 20, resizeMode: 'contain' }}
            /> : <Image
              source={emptyHomeImg}
              style={{ width: 19, height: 20, resizeMode: 'contain', tintColor: '#A89797' }}
            />
          } else if (route.name === 'Shops')
          {
            icon = focused ? <Image
              source={shopFilledIcon}
              style={{ width: 19, height: 20, resizeMode: 'contain', tintColor: '#45A053' }}
            /> : <Image
              source={shopEmptyIcon}
              style={{ width: 25, height: 26, resizeMode: 'contain', tintColor: '#A89797' }}
            />
          }
          else if (route.name === 'Saved Shops')
          {
            icon = focused ? <Image
              source={favoutitesFilledIconImg}
              style={{ width: 19, height: 20, resizeMode: 'contain' }}
            /> : <Image
              source={favoutitesEmptyIconImg}
              style={{ width: 19, height: 20, resizeMode: 'contain', tintColor: '#A89797' }}
            />
          }
          else if (route.name === 'Profile')
          {
            icon = focused ? <Image
              source={accountsFilledIconImg}
              style={{ width: 19, height: 20, resizeMode: 'contain' }}
            /> : <Image
              source={accountEmptyIconImg}
              style={{ width: 19, height: 20, resizeMode: 'contain', tintColor: '#A89797' }}
            />
          }
          else if (route.name === 'Chats')
          {
            icon = focused ? <Image
              source={chatFilledIcon}
              style={{ width: 19, height: 20, resizeMode: 'contain' }}
            /> : <Image
              source={chatEmptyIcon}
              style={{ width: 19, height: 20, resizeMode: 'contain', tintColor: '#A89797' }}
            />
          }


          return icon;
        }
      })}>
        <Tab.Screen name="Home" component={CustomerHomeStack} />
        <Tab.Screen name="Shops" component={ShopMapDisplay} options={{ headerShown: false, tabBarShowLabel: true, }} />
        <Tab.Screen name="Saved Shops" component={CustomerSavedShops} />
        <Tab.Screen name="Chats" component={Chats} />
        <Tab.Screen name="Profile" component={CustomerProfile} />
        {/* <Tab.Screen name="Test" component={TestFile} /> */}
      </Tab.Navigator>

    )
  }

  function FarmerTabNavigation()
  {
    return (

      <Tab.Navigator initialRouteName='Home' screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#45A053',
        tabBarIcon: ({ focused, color, size }) =>
        {
          let farmerIcon;
          if (route.name === 'Home')
          {
            farmerIcon = focused ? <Image
              source={filledHomeImg2}
              style={{ width: 19, height: 20, resizeMode: 'contain' }}
            /> : <Image
              source={emptyHomeImg}
              style={{ width: 19, height: 20, resizeMode: 'contain', tintColor: '#A89797' }}
            />
          } else if (route.name === 'FarmerShopPage')
          {
            farmerIcon = focused ? <Image
              source={dashboardFilledIcon}
              style={{ width: 27, height: 28, resizeMode: 'contain', tintColor: '#45A053' }}
            /> : <Image
              source={dashboardEmptyIcon}
              style={{ width: 27, height: 28, resizeMode: 'contain', tintColor: '#A89797' }}
            />
          } else if (route.name === 'FarmerProfile')
          {
            farmerIcon = focused ? <Image
              source={accountsFilledIconImg}
              style={{ width: 19, height: 20, resizeMode: 'contain', tintColor: '#45A053' }}
            /> : <Image
              source={accountEmptyIconImg}
              style={{ width: 19, height: 20, resizeMode: 'contain', tintColor: '#A89797' }}
            />
          } else if (route.name === 'Add')
          {
            farmerIcon = <Image
              source={addFilledIcon}
              style={{ width: 30, height: 31, resizeMode: 'contain', tintColor: '#45A053' }}
            />
          }
          return farmerIcon;
        }

      })}>
        <Tab.Screen name='Home' component={FarmerHomePage} />
        <Tab.Screen name='FarmerProfile' component={FarmerProfile} />
        <Tab.Screen name='Chat' component={Chat} />
      </Tab.Navigator>
    )
  }

  function FarmerStackNavigation() 
  {
    return (
      <Stack.Navigator initialRouteName='LandingPage' screenOptions={{ headerShown: false, }}>
        <Stack.Screen name='LandingPage' component={FarmerTabNavigation} />
        <Stack.Screen name='AddStocks' component={AddStocks} />
        <Stack.Screen name='UpdateStocks' component={UpdateStocks} />
        <Stack.Screen name='ProductPage' component={ProductPage} />
      </Stack.Navigator>
    )
  }

  function ForCustomerSide()
  {
    //ADD CHATS, SETTINGS (?)
    //Removed profile screen
    return (
      // <Drawer.Navigator initialRouteName="CustomerHomePage" screenOptions={drawerOptions}
      <Drawer.Navigator initialRouteName="CustomerHomePage" screenOptions={{drawerOptions, headerShown:false}}
        drawerContent={(props) =>
        {
          return (
            <DrawerContentScrollView {...props}>
              <DrawerProfile />
              <DrawerItemList {...props} />
            </DrawerContentScrollView>
          )
        }}
      >

        {/* <Drawer.Screen name="CustomerProfile" component={CustomerProfile} options={drawerProfileOptions} listeners={({ navigation }) => ({
          drawerItemPress: () => handleItemClick('CustomerProfile'),
        })} /> */}
        <Drawer.Screen name="CustomerHomePage" component={CustomerTabNavigation} options={drawerHomeOptions} listeners={({ navigation }) => ({
          drawerItemPress: () => handleItemClick('CustomerHomePage'),
        })} />
        <Drawer.Screen name="SavedShops" component={SavedShops} options={drawerFavouritesOptions} listeners={({ navigation }) => ({
          drawerItemPress: () => handleItemClick('SavedShops'),
        })} />
        <Drawer.Screen name="My Chats" component={Chat} options={drawerChatsOptions} listeners={({ navigation }) => ({
          drawerItemPress: () => handleItemClick('My Chats'),
        })} />
        <Drawer.Screen name="HelpCenter" component={FAQ} options={drawerHelpOptions} listeners={({ navigation }) => ({
          drawerItemPress: () => handleItemClick('HelpCenter'),
        })} />
        <Drawer.Screen name="SelectUser" component={SelectUser} options={drawerSwitchUserOptions} listeners={({ navigation }) => ({
          drawerItemPress: () => handleItemClick('SelectUser'),
        })} />
        <Drawer.Screen name="Logout" component={Logout} options={drawerLogOutOptions}
          listeners={({ navigation }) => ({
            drawerItemPress: () => handleItemClick('Logout'),
          })} />
      </Drawer.Navigator>
    )
  }

  function ForFarmerSide()
  { //TODO: Add Shop page, chats, buttons
    //Removed: profile, ProductPage, AddStocks, UpdateStocks
    return (
      <Drawer.Navigator initialRouteName="FarmerHomePage" screenOptions={{drawerOptions, headerShown: false}}
        drawerContent={(props) =>
        {
          return (
            <DrawerContentScrollView {...props}>
              <DrawerProfile />
              <DrawerItemList {...props} />
            </DrawerContentScrollView>
          )
        }}>
        {/* <Drawer.Screen name='FarmerProfile' component={FarmerProfile} />
        <Drawer.Screen name='ProductPage' component={ProductPage} />
        <Drawer.Screen name='AddStocks' component={AddStocks} />
        <Drawer.Screen name='UpdateStocks' component={UpdateStocks} /> */}

        <Drawer.Screen name='FarmerHomePage' component={FarmerStackNavigation} options={drawerHomeOptions} listeners={({ navigation }) => ({
          drawerItemPress: () => handleItemClick('FarmerHomePage'),
        })} />
        <Drawer.Screen name="My Chats" component={Chat} options={drawerChatsOptions} listeners={({ navigation }) => ({
          drawerItemPress: () => handleItemClick('My Chats'),
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

  function Chats(){
    return(
      <Stack.Navigator initialRouteName='CustomerChatList' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='ChatList' options={{ title: 'Chats List' }} component={CustomerChatList}/>
        <Stack.Screen name='Chat' options={({route}:any)=>({title: route.params.chatRoom.name})} component={Chat}/>
      </Stack.Navigator>
    )
  }

  function CustomerSavedShops(){
    return(
      <Stack.Navigator initialRouteName='SavedShops' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='SavedShops' options={{ title: "Saved Shops" }} component={SavedShops}/>
        <Stack.Screen name='CustomerShopPage' options={{title: "Shop"}} component={CustomerShopPage}/>
      </Stack.Navigator>
    )
  }
  
  function CustomerHomeStack(){
    return(
      <Stack.Navigator initialRouteName='CustomerHomePage' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='CustomerHomePage' options={{ title: 'Home' }} component={CustomerHomePage}/>
        <Stack.Screen name='CustomerShopPage' options={{title: 'Shop Page'}} component={CustomerShopPage}/>
        <Stack.Screen name='CustomerProductPage' options={({route}:any)=>({title: route.params.product.name})} component={CustomerProductPage}/>
        <Stack.Screen name='Chat' options={{ title: 'Chat' }} component={Chat}/>
      </Stack.Navigator>
    )

  }



return (
  <NavigationContainer>
    {!farmer ? (
      isSeller ? <ForFarmerSide /> : <RegisterShop />
    ) : (
      <ForCustomerSide />
    )}
  </NavigationContainer>
);
}


