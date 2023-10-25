import React,{useState,useEffect} from 'react'
import {fireStore} from '../../config/firebase'
import { View, Text,TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, RefreshControl, Modal,Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { setLoadingFalse, setLoadingTrue } from '../../features/connection/loaderSlice';
import { UserLogin, locationObjectInterface } from '../../util/interfaces';
import { doc, getDoc, setDoc } from 'firebase/firestore';
// imported the location selector
import LocationSelector from '../../components/LocationSelector';

const screenWidth = Dimensions.get('window').width;

export default function FarmerHomePage({navigation}:any) {
  const dispatch = useDispatch()
  let uId:any = useSelector((state:{user:UserLogin})=>state.user.userId)
  let userEmail:any = useSelector((state:{user:UserLogin})=>state.user.email)

  const [isModalVisible, setIsModalVisible] = useState(false);

  // user profile side
  const [locationAddress, setLocationAddress] = useState<any>('Address');
  const [shopLocationAddress, setShopLocationAddress] = useState('shop address');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [contactNo, setContactNo] = useState(0);
  const [addressUser, setAddress] = useState<any>('');
  const [refresher, setRefresher] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  // farmer profile side
  const [shopName, setShopName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [shopDescription, setShopDescription] = useState('');
  const [shopContactNumber, setShopContactNumber] = useState<any>(0);
  const [locationData, setLocationData] = useState<any>()
/* locationDtaInterfecae: {coordinates: {latitude: number, longitude: number},address:string}*/

//palace this near useStates area
const handleConfirm = (coordinates: locationObjectInterface, selectedAddress: string | undefined) =>
{
  console.log('Called handleConfirm in FarmerHomePage', selectedAddress);
  console.log('geo code',coordinates);
  setAddress(selectedAddress)
  setLocationData(coordinates)
}

useEffect(() => {
  // load user profile data
  const loadUserProfile = async () => {
    // user profile side
    try {
      const docRef = doc(fireStore, 'users', uId);
      const docSnap = await getDoc(docRef);
      console.log(docSnap);
      // Access data from docSnap, not docRef
      setFirstName(docSnap.data()?.firstName)
      setLastName(docSnap.data()?.lastName)
      setContactNo(docSnap.data()?.contactNo)
      setGender(docSnap.data()?.gender)
      
    } catch (error) {
      console.error('Error loading user profile:', error);
    }

    // farmer profile side
    try {
      const docRef = doc(fireStore, 'shops', uId);
      const docSnap = await getDoc(docRef);
      console.log(docSnap);
      // Access data from docSnap, not docRef
      setShopName(docSnap.data()?.shopName)
      setContactEmail(docSnap.data()?.email)
      setShopDescription(docSnap.data()?.description)
      setShopContactNumber(docSnap.data()?.contactNo)
      setAddress(docSnap.data()?.address)
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };
  dispatch(setLoadingTrue());
  loadUserProfile();
  dispatch(setLoadingFalse());
}, [refresher]);


const updateProfile = async () =>{
  dispatch(setLoadingTrue());
  
  const userData = {
    firstName:firstName,
    lastName:lastName,
    gender:gender,
    contactNo:contactNo,
    address:addressUser,
    addressCoordinates:locationData
  }
  
  try {
    const updatedUserDocRef = doc(fireStore, 'users', uId);
    await setDoc(updatedUserDocRef, userData,{ merge: true });
  } catch (error) {
    console.log('error on update user profile');
  }
  
  dispatch(setLoadingFalse());
  setRefresher(refresher + 1);
  console.log('user updated');
}

const updateShopProfile = async () =>{
  dispatch(setLoadingTrue());
  const userData = {
    shopName:shopName,
    email:contactEmail,
    contactNo:shopContactNumber,
    description:shopDescription,
    address:addressUser,
    shopAddress:locationData
    }
    try {
        const updatedShopDocRef = doc(fireStore, 'shops', uId);
        await setDoc(updatedShopDocRef, userData,{ merge: true });
      } catch (error) {
        console.log('error on update user profile');
      }
      dispatch(setLoadingFalse());
      setRefresher(refresher + 1);
      console.log('user updated');
      console.log('shop profile updated');
    }
    
    const changeProfile = () =>{
      console.log('update profile')
    }
    
    const changeShopProfileImage = () =>{
      console.log('update shop image');
    }
    
    const selectLocation = () =>{
      setLocationAddress('place value')
      console.log('select location from map');
    }
    
    const selectShopLocation = () =>{
      // setShopLocationAddress('test location')
      // console.log('select location from map');
      setIsModalVisible(true)
    }
    
    const onRefresh = () => {
      // You can add your refresh logic here
      // setRefreshing(true);
      setRefresher(refresher + 1);
      // setRefreshing(false);
    } 

    const mapModalView = () =>{
      return(
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalMapContainer}>
          <LocationSelector
            navigation={navigation}
            handleConfirm={handleConfirm}
          />
          <TouchableOpacity
            style={styles.mapCancelButton}
            onPress={() => setIsModalVisible(false)}>
            <Text style={{    
              fontSize:20,
              fontWeight:'bold',
              color:'white'
            }}
              >Ok</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      )
    }
    
    return (
      <ScrollView 
      contentContainerStyle={styles.mainContainer}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      showsVerticalScrollIndicator={false}>
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
            <TextInput 
            value={firstName}
            onChange={(text:any)=>{setFirstName(text)}}
            style={[styles.inputs,styles.doubleLineInputs]}  
            underlineColorAndroid="transparent"/>
          </View>
        </View>
        <View style={styles.doubleRowView}>
          <Text style={styles.texts}>Last Name</Text>
          <View style={styles.inputsView}>
            <TextInput 
            value={lastName}
            onChange={(text:any)=>{setLastName(text)}}
            style={[styles.inputs,styles.doubleLineInputs]}/>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.texts}>Email</Text>
        <View style={styles.inputsView}>
          <TextInput 
          placeholder={userEmail} 
          editable={false} style={[styles.inputs,styles.singleLineInputs]}/>
        </View>
      </View>
      <View style={styles.doubleRow}>
        <View style={styles.doubleRowView}>
          <Text style={styles.texts}>Gender</Text>
          <View style={styles.inputsView}>
            <TextInput 
            value={gender}
            onChange={(text:any)=>setGender(text)}
            style={[styles.inputs,styles.doubleLineInputs]}/>
          </View>
        </View>
        <View style={styles.doubleRowView}>
          <Text style={styles.texts}>Phone</Text>
          <View style={styles.inputsView}>
            <TextInput 
              value={contactNo.toString()}  // Convert the value to a string
              onChangeText={(text:any) => {
                setContactNo(text);
              }}
              keyboardType="numeric" 
              style={[styles.inputs, styles.doubleLineInputs]}
            />
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.texts}>Address</Text>
        <TouchableOpacity onPress={selectShopLocation}>
          <View style={styles.inputsView}>
            <Image
            resizeMode="contain"
            source={require('../../assets/pin.png')} // Replace with the path to your image
            style={styles.pin}/>
            {/* this address will be changed by map */}
            <TextInput placeholder={addressUser} editable={false} style={[styles.inputs,styles.singleLineInputs]}/>
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
            <TextInput 
            value={shopName}
            onChange={(text:any)=>setShopName(text)}
            style={[styles.inputs,styles.singleLineInputs]}/>
          </View>
        </View>
        <View style={styles.farmerTextView}>
          <Text style={styles.texts}>Contact Email</Text>
          <View style={styles.inputsView}>
            <TextInput 
            value={contactEmail}
            onChange={(text:any)=>setContactEmail(text)}
            style={[styles.inputs,styles.singleLineInputs]}/>
          </View>
        </View>
        <View style={styles.farmerTextView}>
          <Text style={styles.texts}>Shop Description</Text>
          <View style={styles.inputsView}>
            <TextInput 
            value={shopDescription}
            onChange={(text:any)=>setShopDescription(text)}
            style={[styles.inputs,styles.singleLineInputs]}/>
          </View>
        </View>
        <View style={styles.farmerTextView}>
          <Text style={styles.texts}>Shop contact number</Text>
          <View style={styles.inputsView}>
            <TextInput 
            value={shopContactNumber.toString()}
            onChangeText={(text) => {
              // Use parseInt to convert the text to a number
              const numericValue:number = parseInt(text); 
              setShopContactNumber(isNaN(numericValue) ? '' : numericValue);
            }}
            keyboardType="numeric" 
            style={[styles.inputs,styles.singleLineInputs]}/>
          </View>
        </View>
        <View>
        <Text style={styles.texts}>Shop Address</Text>

        {/* modal view */}
        {mapModalView()}

        <TouchableOpacity onPress={selectShopLocation}>
          <View style={styles.inputsView}>
            <Image
            resizeMode="contain"
            source={require('../../assets/pin.png')} // Replace with the path to your image
            style={styles.pin}/>
            {/* this address will be changed by map */}
            <TextInput 
            placeholder={addressUser}
            editable={false} 
            style={[styles.inputs,styles.singleLineInputs]}/>
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
  },
  modalMapContainer: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#fff',
  },
  mapCancelButton:{
    backgroundColor: 'green',
    borderRadius: 10,
    paddingVertical:5,
    paddingHorizontal:5,
    marginVertical:10,
    width: 150,
    justifyContent:'center',
    alignItems: 'center',
    marginLeft:screenWidth/3.3
  }
})