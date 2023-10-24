import React,{useState,useEffect} from 'react'
import {fireStore} from '../../config/firebase'
import { View, Text,TextInput, StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native'
// imorot the loctaion selector

export default function FarmerHomePage({navigation}:any) {
  const [locationAddress, setLocationAddress] = useState<any>('Address');
  const [email, setEmail] = useState<string>('email');
  const [shopLocationAddress, setShopLocationAddress] = useState('shop address');
// const [locationData, setLocationData] = useState(second)
/* locationDtaInterfecae: {coordinates: {
            latitude: number, longitude: number
          },
          address:string
}
*/

  // const handleConfirm = (data:locationDtaInterfecae) =>{
  //   {address} = data;

  //   setlocaData(data)
  // }

  // <LocationSelector navigation={navigation} handleConfirm={handleConfirm}/>

  useEffect(() => {
    // load user profile data
    // load 2 user shops
  }, []);

  const updateProfile = () =>{
    console.log('user updated');
  }

  const updateShopProfile = () =>{
    console.log('shop profile updated');
  }

  const changeProfile = () =>{
    console.log('update profile')
  }

  const changeShopProfileImage = () =>{
    console.log('update shop image');
  }

  const selectLocation = () =>{
    console.log('select location from map');
  }

  const selectShopLocation = () =>{
    console.log('select location from map');
  }

  return (
  <ScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.profileTextView}>
        <Text style={styles.profileText}>Profile</Text>
      </View>
      <View style={styles.profileImageView}>
        <Image source={require('../../assets/profile.jpg')} style={styles.image1}/>
        <TouchableOpacity onPress={changeProfile}>
          <Image source={require('../../assets/photo.png')} style={styles.image2}/>
        </TouchableOpacity>
      </View>
      <View style={styles.doubleRow}>
        <View style={styles.doubleRowView}>
          <Text style={styles.texts}>First Name</Text>
          <View style={styles.inputsView}>
            <TextInput placeholder='first name' style={[styles.inputs,styles.doubleLineInputs]}  underlineColorAndroid="transparent"/>
          </View>
        </View>
        <View style={styles.doubleRowView}>
          <Text style={styles.texts}>Last Name</Text>
          <View style={styles.inputsView}>
            <TextInput placeholder='last name' style={[styles.inputs,styles.doubleLineInputs]}/>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.texts}>Email</Text>
        <View style={styles.inputsView}>
          <TextInput placeholder={email} style={[styles.inputs,styles.singleLineInputs]}/>
        </View>
      </View>
      <View style={styles.doubleRow}>
        <View style={styles.doubleRowView}>
          <Text style={styles.texts}>Gender</Text>
          <View style={styles.inputsView}>
            <TextInput placeholder='gender' style={[styles.inputs,styles.doubleLineInputs]}/>
          </View>
        </View>
        <View style={styles.doubleRowView}>
          <Text style={styles.texts}>Phone</Text>
          <View style={styles.inputsView}>
            <TextInput placeholder='Phone' keyboardType="numeric" style={[styles.inputs,styles.doubleLineInputs]}/>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.texts}>Address</Text>
        <TouchableOpacity onPress={selectLocation}>
          <View style={styles.inputsView}>
            <Image
            resizeMode="contain"
            source={require('../../assets/pin.png')} // Replace with the path to your image
            style={styles.pin}/>
            {/* this address will be changed by map */}
            <TextInput placeholder={locationAddress} editable={false} style={[styles.inputs,styles.singleLineInputs]}/>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.updateBtnContainer}>
        <TouchableOpacity onPress={updateProfile} style={styles.updateBtn}>
          <Text style={styles.updateBtnText}>Update</Text>
        </TouchableOpacity>
      </View>

      {/* dividing line of farmer profile section */}
      <View style={{borderBottomColor: 'gray',borderBottomWidth: 3, paddingHorizontal:175,marginVertical:20}}/>

      <View style={styles.farmerProfileView}>
        <View style={styles.profileTextView}>
          <Text style={styles.profileText}>Farmer Profile</Text>
        </View>
        <View>
          <Image source={require('../../assets/shop.jpg')} style={styles.image1}/>
          <TouchableOpacity onPress={changeShopProfileImage}>
            <Image source={require('../../assets/photo.png')} style={styles.image2}/>
          </TouchableOpacity>
        </View>
        <View style={styles.farmerTextView}>
          <Text style={styles.texts}>Shop Name</Text>
          <View style={styles.inputsView}>
            <TextInput placeholder={'enter name'} style={[styles.inputs,styles.singleLineInputs]}/>
          </View>
        </View>
        <View style={styles.farmerTextView}>
          <Text style={styles.texts}>Contact Email</Text>
          <View style={styles.inputsView}>
            <TextInput placeholder={'enter email'} style={[styles.inputs,styles.singleLineInputs]}/>
          </View>
        </View>
        <View style={styles.farmerTextView}>
          <Text style={styles.texts}>Shop Description</Text>
          <View style={styles.inputsView}>
            <TextInput placeholder={'About the shop'} style={[styles.inputs,styles.singleLineInputs]}/>
          </View>
        </View>
        <View style={styles.farmerTextView}>
          <Text style={styles.texts}>Shop contact number</Text>
          <View style={styles.inputsView}>
            <TextInput placeholder={'enter number'} keyboardType="numeric" style={[styles.inputs,styles.singleLineInputs]}/>
          </View>
        </View>
        <View>
        <Text style={styles.texts}>Shop Address</Text>
        <TouchableOpacity onPress={selectShopLocation}>
          <View style={styles.inputsView}>
            <Image
            resizeMode="contain"
            source={require('../../assets/pin.png')} // Replace with the path to your image
            style={styles.pin}/>
            {/* this address will be changed by map */}
            <TextInput placeholder={shopLocationAddress} editable={false} style={[styles.inputs,styles.singleLineInputs]}/>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.updateBtnContainer}>
        <TouchableOpacity onPress={updateShopProfile} style={styles.updateBtn}>
          <Text style={[styles.updateBtnText,{marginHorizontal:1}]}>Update Shop Profile</Text>
        </TouchableOpacity>
      </View>
      </View>
  </ScrollView>
  )
}

const styles = StyleSheet.create({
  mainContainer:{
    alignItems: 'center',
  },
  farmerProfileView:{
    alignItems:'center',
    marginVertical:20
  },
  profileTextView:{
    marginVertical:20
  },
  profileText:{
    fontSize:30,
    fontWeight:'bold'
  },
  profileImageView:{
    marginVertical:20
  },
  image1:{
    width: 200, // Set the desired width
    height: 200, // Set the desired height
    borderRadius: 100,
  },
  image2:{
    width: 50, // Set the desired width
    height: 50, // Set the desired height
    position:'absolute',
    bottom:0,
    right:0
  },
  texts:{
    color:'#A6ABC4',
    margin:0,
    fontSize:14
  },
  inputsView:{
    marginTop:0
  },
  inputs:{
    borderBottomWidth: 1, // Add an underline
    borderBottomColor: 'gray',
    padding:5,
    fontSize:18
  },
  singleLineInputs:{
    width:320
  },
  doubleLineInputs:{
    width:160
  },
  doubleRow:{
    flexDirection: 'row', // Arrange children horizontally
    justifyContent: 'space-between',
    marginVertical:20
  },
  doubleRowView:{
    // flex: 1, // Take equal horizontal space
    marginLeft: 10,    
  },
  updateBtnContainer:{
    marginHorizontal:40,
    marginVertical:20
  },
  updateBtn:{
    marginVertical:10,
    backgroundColor: '#45A053', // Background color
    borderRadius: 8,            // Border radius
    justifyContent: 'center',   // Center content vertically
    alignItems: 'center',
    width:164,
    height:40
  },
  updateBtnText:{
    color:'white',
    fontWeight:'bold'
  },
  pin:{
    width: 21, // Set the desired width
    height: 30, // Set the desired height
    position:'absolute',
    bottom:0,
    right:0
  },
  savedShopView:{
    marginTop:30
  },
  savedTopView:{
    flexDirection:'row',
    justifyContent: 'space-between',
    marginLeft:20,
    marginRight:20
  },
  mainText:{
    fontSize:20,
    fontWeight:'bold'
  },
  subText:{
    fontSize:20,
  },
  savedCard:{
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 4, // For Android shadow
    padding: 0,
    margin: 5,
  },
  savedCardList:{
    flexDirection:'row'
  },
  savedImage:{
    width:170,
    height:120,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
  },
  savedCardTitel:{
    paddingLeft:10,
    paddingBottom:10,
    fontSize:15,
    fontWeight:'bold',
  },
  viewAllBtn:{
  },
  farmerTextView:{
    marginVertical:20
  }
})