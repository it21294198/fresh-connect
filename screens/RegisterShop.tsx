import React,{useState,useEffect} from 'react'
import {fireStore} from '../config/firebase'
import { View, Text,TextInput, StyleSheet, TouchableOpacity, Image, ScrollView,Dimensions } from 'react-native'

const screenWidth = Dimensions.get('window').width;

export default function RegisterShop({navigation}:any) {
  const [locationAddress, setLocationAddress] = useState<any>('Address');
  const [email, setEmail] = useState<string>('email');
  const [isChecked, setIsChecked] = useState(false);
  const [shopLocationAddress, setShopLocationAddress] = useState('shop address');

  useEffect(() => {
    // load user profile data
    // load 2 user shops
  }, []);

  const setShopProfile = () =>{
    console.log('shop profile updated');
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

  const handleCheckboxToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
  <ScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.farmerProfileView}>
        <View style={styles.profileTextView}>
          <Text style={styles.profileText}>Register</Text>
        </View>
        <View>
          <Image source={require('../assets/shop.jpg')} style={styles.image1}/>
          <TouchableOpacity onPress={changeShopProfileImage}>
            <Image source={require('../assets/photo.png')} style={styles.image2}/>
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
          <Text style={styles.texts}>Shop contact number</Text>
          <View style={styles.inputsView}>
            <TextInput placeholder={'enter number'} keyboardType="numeric" style={[styles.inputs,styles.singleLineInputs]}/>
          </View>
        </View>
        <View style={styles.farmerTextView}>
          <Text style={styles.texts}>About the shop</Text>
          <View style={styles.inputsView}>
            <TextInput placeholder={'enter description'} style={[styles.inputs,styles.singleLineInputs]}/>
          </View>
        </View>

        <View style={styles.horizontalContainer}>
          <Text style={styles.texts}>Open hours</Text>
        <View style={[styles.farmerTextView,{marginRight:50}]}>
          <View style={styles.inputsView}>
            <TextInput placeholder="to" keyboardType="numeric" style={[styles.inputs,styles.timeInput]}/>
          </View>
        </View>
        <View style={styles.farmerTextView}>
          {/* <Text style={styles.texts}>Open hours</Text> */}
          <View style={styles.inputsView}>
            <TextInput placeholder="no" keyboardType="numeric" style={[styles.inputs,styles.timeInput]}/>
          </View>
        </View>
        </View>

        <View>
        <Text style={styles.texts}>Shop Address</Text>
        <TouchableOpacity onPress={selectShopLocation}>
          <View style={styles.inputsView}>
            <Image
            resizeMode="contain"
            source={require('../assets/pin.png')} // Replace with the path to your image
            style={styles.pin}/>
            {/* this address will be changed by map */}
            <TextInput placeholder={shopLocationAddress} editable={false} style={[styles.inputs,styles.singleLineInputs]}/>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.acceptTextView}>
        <Text style={styles.acceptText}>Accept Terms and Conditions</Text>
        <TouchableOpacity
        style={[styles.checkbox, isChecked ? styles.checked : styles.unchecked]}
        onPress={handleCheckboxToggle}
      >
        {isChecked && <Text>X</Text>}
      </TouchableOpacity>
      </View>
      </View>
      <View style={styles.bottomView}>
          <TouchableOpacity onPress={setShopProfile} style={styles.updateBtn}>
            <Text style={[styles.updateBtnText]}>Confirm</Text>
          </TouchableOpacity>
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
    marginVertical:30
  },
  profileTextView:{
    marginTop:0,
    marginVertical:20
  },
  profileText:{
    fontSize:30,
    fontWeight:'bold'
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
  timeInput:{
    width:100
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
    marginBottom:10    
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
    marginHorizontal:screenWidth/12,
    backgroundColor: '#45A053', // Background color
    borderRadius: 8,            // Border radius
    justifyContent: 'center',   // Center content vertically
    alignItems: 'center',
    width:screenWidth/1.2,
    height:screenWidth/8,
  },
  updateBtnText:{
    color:'white',
    fontWeight:'bold',
    fontSize:18
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
  acceptTextView:{
    flexDirection:'row',
    marginTop:30
  },
  acceptText:{
    marginHorizontal:30,
    fontSize:14
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: 'black',
  },
  unchecked: {
    backgroundColor: 'white',
  },
  farmerTextView:{
    marginVertical:20
  },
  horizontalContainer:{
    flexDirection:'row'
  },
  bottomView:{
    flex: 0.5,
    backgroundColor: 'white',
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent:'center',
    width:screenWidth // get the screen with accordingly
  }
})