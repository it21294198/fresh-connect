import React,{useState,useEffect} from 'react'
import {fireStore} from '../../config/firebase'
import TextLimitedByWords from '../../util/hooks/TextLimitedByWords'
import { View, Text,TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, RefreshControl, Modal, Dimensions} from 'react-native'
import { setLoadingFalse, setLoadingTrue } from '../../features/connection/loaderSlice';
import { UserLogin, locationObjectInterface } from '../../util/interfaces'; // get the path accordingly
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import LocationSelector from '../../components/LocationSelector';

const screenWidth = Dimensions.get('window').width;

export default function CustomerProfile({navigation}:any) {

  let uId:any = useSelector((state:{user:UserLogin})=>state.user.userId)
  let email:any = useSelector((state:{user:UserLogin})=>state.user.email)
  const dispatch = useDispatch()

  const [locationData, setLocationData] = useState<any>()
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [contactNo, setContactNo] = useState<any>(0);
  const [addressUser, setAddress] = useState<any>('');
  const [refresher, setRefresher] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [locationAddress, setLocationAddress] = useState<any>('Address');
  const [savedShops, setSavedShops] = useState<any>([]);
  
  useEffect(() => {
    // load user profile data
    dispatch(setLoadingTrue());
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
      setAddress(docSnap.data()?.address)

    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };
  loadUserProfile();

  const getShops = async () => {
  try {
    const docRef = doc(fireStore, 'users', uId);
    const docSnap = await getDoc(docRef);
    const savedShopsArray = docSnap.data()?.savedShops || [];
    const firstTwoShops = savedShopsArray.slice(0, 2);
    console.log(firstTwoShops);

    for (let i = 0; i < firstTwoShops.length; i++) {
      const shopId = firstTwoShops[i];
      const docRef = doc(fireStore, 'shops', shopId);
      const docSnap = await getDoc(docRef);

      // Generate a unique key for the shop
      const uniqueKey = `${shopId}_${i}`;

      setSavedShops((prevSavedShops: any) => [
        ...prevSavedShops,
        {
          id: uniqueKey,
          title: docSnap.data()?.shopName,
          imageUrl: require('../../assets/splash.png'), // Replace with the correct image source
        },
      ]);
    }
  } catch (error) {
    console.error('Error loading user profile:', error);
    }
  }
  getShops();
  dispatch(setLoadingFalse());
    // load 2 user shops
  }, [refresher]);

  const updateProfile = async () =>{
  dispatch(setLoadingTrue());
  const userData = {
    firstName:firstName,
    lastName:lastName,
    gender:gender,
    contactNo:contactNo,
    address:addressUser
  }
  
  try {
    const updatedUserDocRef = doc(fireStore, 'users', uId);
    await setDoc(updatedUserDocRef, userData,{ merge: true });
  } catch (error) {
    console.log('error on update user profile',error);
  }
  
  dispatch(setLoadingFalse());
  setRefresher(refresher + 1);
  console.log('user updated');
  console.log('user updated');
  }

  const changeProfile = () =>{
    console.log('update profile')
  }

  const viewAllShops = () =>{
    console.log('redirect to view saved shops');
    // this should navigate to saved shop page
    navigation.navigate('SavedShops')
  }

  const onRefresh = () => {
      // You can add your refresh logic here
      // setRefreshing(true);
    setRefresher(refresher + 1);
      // setRefreshing(false);
    } 

  const selectLocation = () =>{
    console.log('select location from map');
  }

  const handleConfirm = (coordinates: locationObjectInterface, selectedAddress: string | undefined) =>{
  console.log('Called handleConfirm in FarmerHomePage', selectedAddress);
  console.log('geo code',coordinates);
  setAddress(selectedAddress)
  setLocationData(coordinates)
}
  const selectShopLocation = () =>{
      // setShopLocationAddress('test location')
      // console.log('select location from map');
      setIsModalVisible(true)
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
  <View style={styles.outerContainer}>
  <ScrollView 
  contentContainerStyle={styles.mainContainer} 
  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
  showsVerticalScrollIndicator={false}>
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
          <TextInput placeholder={email} editable={false} style={[styles.inputs,styles.singleLineInputs]}/>
        </View>
      </View>
      <View style={styles.doubleRow}>
        <View style={styles.doubleRowView}>
          <Text style={styles.texts}>Gender</Text>
          <View style={styles.inputsView}>
            <TextInput 
            value={gender}
            onChange={(text:any)=>{setGender(text)}}
            style={[styles.inputs,styles.doubleLineInputs]}/>
          </View>
        </View>
        <View style={styles.doubleRowView}>
          <Text style={styles.texts}>Phone</Text>
          <View style={styles.inputsView}>
            <TextInput 
            placeholder={contactNo.toString()}
            onChange={(text:any)=>{
              const numericValue:number = parseInt(text); 
              setContactNo(isNaN(numericValue) ? '' : numericValue);
            }}
            keyboardType="numeric" 
            style={[styles.inputs,styles.doubleLineInputs]}/>
          </View>
        </View>
      </View>
      {mapModalView()}
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

      <View style={styles.savedTopView}>
            <Text style={styles.mainText}>Saved Shops</Text>
            <TouchableOpacity onPress={viewAllShops}>
              <Text style={styles.subText}>View all</Text>
            </TouchableOpacity>
      </View>

    {/* dynamic content */}
    {savedShops.length>=0 ?(
      <View style={styles.savedShopView}>
           <View style={styles.savedCardList}>
            {savedShops.map((item: { id: string; title: string; imageUrl: string }, key: number) => (
              <TouchableOpacity onPress={viewAllShops}>
                <View style={styles.savedCard} key={item.id}>
                  <TextLimitedByWords text={item.title}/>
                  <Image
                    resizeMode="cover"
                    source={item.imageUrl}
                    // source={{ uri: item.imageUrl }}
                    style={styles.savedImage}
                    />
                </View>
              </TouchableOpacity>
            ))}
          </View>
      </View>
      ):(
      <View style={styles.emptyShops}><Text>List is empty</Text></View>
      )}
  </ScrollView>
  </View>
  )
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    marginTop:50
  },
  mainContainer:{
    // marginVertical:50,
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
    marginLeft:150
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
  emptyShops:{
    marginVertical:20,
    backgroundColor:'green'
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
