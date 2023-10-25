import React, { useState } from 'react';
import { createDrawerNavigator, DrawerItem, DrawerNavigationProp, DrawerItemList, DrawerContentScrollView, DrawerContentComponentProps } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
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

import { useSelector } from 'react-redux';
import { View, Image} from 'react-native';
import {UserLogin } from '../util/interfaces';
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
import customHamburger from "../assets/customHamburger.png"
import CustomerChatList from '../screens/CustomerSide/CustomerChatList';
import Chat from '../screens/Chat';
import CustomerShopPage from '../screens/CustomerSide/CustomerShopPage';
import CustomerProductPage from '../screens/CustomerSide/CustomerProductPage';
import { Button, Div, Text } from "react-native-magnus";
import { DrawerProfile } from '../components/DrawerProfile';
import { TestFile } from '../screens/CustomerSide/TestFile';

export default function MainNavigation()
{
  const [currentPage, setCurrentPage] = useState('CustomerHomePage');
  // const navigation = useNavigation()

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
  const Stack = createStackNavigator();

  let farmer:boolean|null = useSelector((state:{user:UserLogin})=> state.user.type)

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
      <Tab.Navigator initialRouteName='Home' screenOptions={{ headerShown: false, }}>
        <Tab.Screen name="Home" component={CustomerHomeStack} />
        <Tab.Screen name="ShopMapDisplay" component={ShopMapDisplay} options={{ headerShown: false, tabBarShowLabel: true, }} />
        <Tab.Screen name="SavedShops" component={SavedShops} />
        <Tab.Screen name="Chats" component={Chats} />
        <Tab.Screen name="CustomerProfile" component={CustomerProfile} />
        <Tab.Screen name="Test" component={TestFile} />
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
    //ADD CHATS, SETTINGS (?)
    //Removed profile screen
    return (
      // <Drawer.Navigator initialRouteName="CustomerHomePage" screenOptions={drawerOptions}
      <Drawer.Navigator initialRouteName="CustomerHomePage" screenOptions={drawerOptions}
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
      <Drawer.Navigator initialRouteName="FarmerHomePage" screenOptions={drawerOptions}
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

        <Drawer.Screen name='FarmerHomePage' component={FarmerTabNavigation} options={drawerHomeOptions} listeners={({ navigation }) => ({
          drawerItemPress: () => handleItemClick('FarmerHomePage'),
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
      <Stack.Navigator initialRouteName='CustomerChatList'>
        <Stack.Screen name='ChatList' options={{ title: 'Chats List' }} component={CustomerChatList}/>
        <Stack.Screen name='Chat' options={({route}:any)=>({title: route.params.chatRoom.name})} component={Chat}/>
      </Stack.Navigator>
    )
  }
  
  function CustomerHomeStack(){
    return(
      <Stack.Navigator initialRouteName='CustomerChatList'>
        <Stack.Screen name='CustomerHomePage' options={{ title: 'Home' }} component={CustomerHomePage}/>
        <Stack.Screen name='CustomerShopPage' options={({route}:any)=>({title: route.params.shop.shopName})} component={CustomerShopPage}/>
        <Stack.Screen name='CustomerProductPage' options={({route}:any)=>({title: route.params.products.name})} component={CustomerProductPage}/>
      </Stack.Navigator>
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

