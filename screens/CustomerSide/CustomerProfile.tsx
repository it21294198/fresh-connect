import React,{useState,useEffect} from 'react'
import {fireStore} from '../../config/firebase'
import TextLimitedByWords from '../../util/hooks/TextLimitedByWords'
import { View, Text,TextInput, StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native'

export default function CustomerProfile({navigation}:any) {
  const [locationAddress, setLocationAddress] = useState<any>('Address');
  const [email, setEmail] = useState<string>('email');
  useEffect(() => {
    // load user profile data
    // load 2 user shops
  }, []);

  // example two saved shop objects
  const savedShops = [
    {
      id:1,
      title:'hello',
      imageUrl:require('../../assets/shop.jpg')
    },
    {
      id:2,
      title:'helfsfsffs fsdfsfs fsdfssd fsdfsf gdfgd gdfgdfg',
      imageUrl:require('../../assets/splash.png')
    }
  ]

  const updateProfile = () =>{
    console.log('user updated');
  }

  const changeProfile = () =>{
    console.log('update profile')
  }

  const viewAllShops = () =>{
    console.log('redirect to view saved shops');
    // this should navigate to saved shop page
    // navigation.navigate('SavedShop')
  }

  const selectLocation = () =>{
    console.log('select location from map');
  }

  return (
  <ScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.profileTextView}>
        <Text style={styles.profileText}>Profile</Text>
      </View>
      <View style={styles.profilePicView}>
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

    {/* dynamic content */}
      <View style={styles.savedShopView}>
          <View style={styles.savedTopView}>
            <Text style={styles.mainText}>Saved Shops</Text>
            <TouchableOpacity onPress={viewAllShops}>
              <Text style={styles.subText}>View all</Text>
            </TouchableOpacity>
          </View>
          {/* example two most view shops */}
           <View style={styles.savedCardList}>
            {savedShops.map((item, key) => (
              <TouchableOpacity>
                <View style={styles.savedCard} key={item.id}>
                  <TextLimitedByWords text={item.title}/>
                  <Image
                    resizeMode="cover"
                    source={item.imageUrl}
                    style={styles.savedImage}
                    />
                </View>
              </TouchableOpacity>
            ))}
          </View>
      </View>
  </ScrollView>
  )
}

const styles = StyleSheet.create({
  mainContainer:{
    alignItems: 'center',
  },
  profileTextView:{
    marginTop:0,
    marginVertical:20
  },
  profileText:{
    fontSize:30,
    fontWeight:'bold'
  },
  profilePicView:{
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
    marginLeft: 10,    
  },
  updateBtnContainer:{
    marginTop:40,
    marginLeft:40,
    marginRight:40
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
})
