import React,{useState,useEffect} from 'react'
import {fireStore} from '../config/firebase'
import { View, Text,TextInput, StyleSheet, TouchableOpacity, Image, ScrollView,Dimensions,Button } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ShopRegister } from '../util/interfaces';

const screenWidth = Dimensions.get('window').width;

export default function RegisterShop({navigation}:any) {
  const [locationAddress, setLocationAddress] = useState<any>('Address');
  const [email, setEmail] = useState<string>('email');
  const [isChecked, setIsChecked] = useState(false);
  const [timeInput, setTimeInput] = useState(null);
  const [error, setError] = useState<boolean|null>(null);
  const [openAt, setOpenAt] = useState(true);
  const [farmerRegistrForm, setFarmerRegistrForm] = useState<ShopRegister>({
    shopName:'',
    email:'',
    contactNo:0,
    description:'',
    openAt:undefined,
    closeAt:undefined,
    address:'',
    accept:false
  });

  useEffect(() => {
    // load user profile data
    // load 2 user shops
  }, []);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (time:any) => {
    const timeStore = time
    if(openAt===true){
      setFarmerRegistrForm({...farmerRegistrForm,openAt:timeStore})
      console.log('ran true');
    }else{
      setFarmerRegistrForm({...farmerRegistrForm,closeAt:timeStore})
      console.log('ran false');
    }
    hideDatePicker();
  };

const setShopProfile = () =>{

    if(farmerRegistrForm.accept){
      setError(false)
      for (const key in farmerRegistrForm) {
        if (farmerRegistrForm.hasOwnProperty(key)) {
          console.log(`${key}:`, farmerRegistrForm[key]);
        }
      }
      // send the data to database
      console.log('shop profile updated');
    }else{
      setError(true)
      console.log('error on register');
    }
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
    setFarmerRegistrForm({...farmerRegistrForm,accept:!farmerRegistrForm.accept})
    setIsChecked(!isChecked);
  };
  
  const timePicker = () =>{
    return(
      <View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        />
    </View>
    )
  }
  
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
            <TextInput 
            placeholder={'Enter name'} 
            onChangeText={(text) => setFarmerRegistrForm({ ...farmerRegistrForm, shopName: text })}
            style={[styles.inputs,styles.singleLineInputs]}/>
          </View>
        </View>
        <View style={styles.farmerTextView}>
          <Text style={styles.texts}>Contact Email</Text>
          <View style={styles.inputsView}>
            <TextInput 
            placeholder={'Enter email'} 
            onChangeText={(text) => setFarmerRegistrForm({ ...farmerRegistrForm, email: text })}
            style={[styles.inputs,styles.singleLineInputs]}/>
          </View>
        </View>
        <View style={styles.farmerTextView}>
          <Text style={styles.texts}>Shop contact number</Text>
          <View style={styles.inputsView}>
            <TextInput 
            placeholder={'Enter number'} 
            onChangeText={(text) => {
              const numberValue = parseInt(text, 10); // Parse the input as an integer
              setFarmerRegistrForm({ ...farmerRegistrForm, contactNo: numberValue });
            }}
            keyboardType="numeric" 
            style={[styles.inputs,styles.singleLineInputs]}/>
          </View>
        </View>
        <View style={styles.farmerTextView}>
          <Text style={styles.texts}>About the shop</Text>
          <View style={styles.inputsView}>
            <TextInput 
            placeholder={'Enter description'} 
            onChangeText={(text) => setFarmerRegistrForm({ ...farmerRegistrForm, description: text })}
            style={[styles.inputs,styles.singleLineInputs]}/>
          </View>
        </View>

        {timePicker()}
        <View style={styles.horizontalContainer}>
          <Text style={styles.texts}>Open hours</Text>
        <TouchableOpacity onPress={()=>{
          setOpenAt(true)
          showDatePicker()
        }}>
          <View style={[styles.farmerTextView,{marginRight:50}]}>
              <View style={styles.inputsView}>
                <TextInput 
                placeholder={'From'} 
                editable={false} 
                style={[styles.inputs,styles.timeInput]}/>
              </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          setOpenAt(false)
          showDatePicker()
        }}>
          <View style={styles.farmerTextView}>
            <View style={styles.inputsView}>
              <TextInput 
              placeholder={'To'} 
              editable={false} 
              style={[styles.inputs,styles.timeInput]}/>
            </View>
          </View>
        </TouchableOpacity>
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
            <TextInput 
            placeholder={'Enter shop address'} 
            onChangeText={(text) => setFarmerRegistrForm({ ...farmerRegistrForm, address: text })}
            editable={false} 
            style={[styles.inputs,styles.singleLineInputs]}/>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.acceptTextView}>
        <Text style={styles.acceptText}>Accept Terms and Conditions</Text>
        <TouchableOpacity
        style={[styles.checkbox, isChecked ? styles.checked : styles.unchecked]}
        onPress={handleCheckboxToggle}
        >
        {isChecked && <Text></Text>}
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
// }
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
    backgroundColor: 'green',
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