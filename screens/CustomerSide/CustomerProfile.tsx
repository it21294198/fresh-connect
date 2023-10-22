import React,{useState,useEffect} from 'react'
import {fireStore} from '../../config/firebase'
import { View, Text,TextInput, StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native'

export default function CustomerProfile() {

  const mainContainer = () =>{
    console.log('user updated');
  }

  const changeProfile = () =>{
    console.log('update profile')
  }

  return (
  <ScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false}>
    {/* <View style={styles.mainContainer}> */}
      <View style={styles.profileTextView}>
        <Text style={styles.profileText}>Profile</Text>
      </View>
      <View>
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
          <TextInput placeholder='email' style={[styles.inputs,styles.singleLineInputs]}/>
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
            <TextInput placeholder='Phone' style={[styles.inputs,styles.doubleLineInputs]}/>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.texts}>Address</Text>
        <View style={styles.inputsView}>
          <Image
          resizeMode="contain"
          source={require('../../assets/pin.png')} // Replace with the path to your image
          style={styles.pin}/>
          <TextInput placeholder='Address' style={[styles.inputs,styles.singleLineInputs]}/>
        </View>
      </View>
      <View style={styles.updateBtnContainer}>
        <TouchableOpacity onPress={mainContainer} style={styles.updateBtn}>
          <Text style={styles.updateBtnText}>Update</Text>
        </TouchableOpacity>
      </View>

    {/* dynamic content */}
      <View>
        <View>
          <View style={styles.savedTopView}>
            <Text style={styles.mainText}>Saved Shops</Text>
            <Text style={styles.subText}>View all</Text>
          </View>
          <View style={styles.savedCardList}>
            <View style={styles.savedCard}>
              <Text>Hello</Text>
              <Image
              resizeMode="contain"
              source={require('../../assets/shop.jpg')} // Replace with the path to your image
              style={styles.savedImage}/>
            </View>
            <View style={styles.savedCard}>
              <Text>Hello</Text>
              <Image
              resizeMode="contain"
              source={require('../../assets/shop.jpg')} // Replace with the path to your image
              style={styles.savedImage}/>
            </View>
          </View>
        </View>
      </View>
    {/* </View> */}
  </ScrollView>
  )
}

const styles = StyleSheet.create({
  mainContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileTextView:{
    marginTop:0
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
    marginTop:40,
    marginLeft:40,
    marginRight:40
  },
  updateBtn:{
    backgroundColor: '#45A053', // Background color
    paddingLeft: 70,                // Padding
    paddingRight: 70,                // Padding
    paddingTop:20,
    paddingBottom:20,
    borderRadius: 8,            // Border radius
    justifyContent: 'center',   // Center content vertically
    alignItems: 'center',
    marginLeft:30,
    marginRight:30
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
    margin: 10,
  },
  savedCardList:{
    flexDirection:'row'
  },
  savedImage:{
    width:170,
    height:120
  }
})
