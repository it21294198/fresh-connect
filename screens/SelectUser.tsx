import { View, Text,StyleSheet, TouchableOpacity,Image  } from 'react-native'
import React, { useEffect } from 'react'
import { loaderSlice } from '../features/connection/loaderSlice';
import { setType, swithcUser } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { UserLogin } from '../util/interfaces';

export default function SelectUser() {
  const dispatch = useDispatch()
  let email:string|null = useSelector((state:{user:UserLogin})=> state.user.email)
  let type:boolean|null = useSelector((state:{user:UserLogin})=> state.user.type)
  useEffect(() => {
    dispatch(swithcUser())
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.middleText}>
      <Text style={styles.middleTextMain}>Almost Done</Text>
      </View>
      <View style={styles.bottom}>
          <View style={styles.bottomTextTopView}>
            <Text style={styles.bottomTextTop}>I am a</Text>
          </View>
          <View style={styles.selectUserContainer}>
          <TouchableOpacity
            style={styles.selectUserBtn}
            onPress={()=>{
              dispatch(setType(true))
            }}
            >
              <Image source={require('../assets/Buy.png')} style={styles.image} />
              <Text style={styles.selectUserBtnText}>Buyer</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.selectUserContainer}>
          <TouchableOpacity
            style={styles.selectUserBtn}
            onPress={()=>{
              dispatch(setType(false))
            }}
            >
              <Image source={require('../assets/Shop.png')} style={styles.image} />
              <Text style={styles.selectUserBtnText}>Seller</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomTextBottomView}>
            <Text style={styles.bottomTextBottom}>Don't worry you can still access features of</Text>
            <Text style={styles.bottomTextBottom}>both regardless of what you choose</Text>
          </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
    padding: 0,
    margin: 0,
  },
  bottom:{
    flex: 2,
    backgroundColor: '#45A053',
    borderWidth: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  middleText:{
    flex: 0,
    marginTop:100,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', 
  },
  middleTextMain:{
    fontSize:29,
    fontWeight:'bold',
    marginBottom:50
  },
  bottomTextTopView:{
    alignItems:'center',
    marginBottom:50
  },  
  bottomTextTop:{
    color:'white',
    fontWeight:'bold',
    fontSize:40,
    marginTop:20
  },
  selectUserContainer:{
    marginLeft:40,
    marginRight:40,
    marginBottom:20
  },
  selectUserBtn:{
    backgroundColor: '#fff', // Background color
    padding: 15,                // Padding
    borderRadius: 15,            // Border radius
    justifyContent: 'center',   // Center content vertically
    alignItems: 'center',
    marginLeft:30,
    marginRight:30,
    height:200
  },
  image:{
    width:70,
    height:70   
  },
  selectUserBtnText:{
    color: 'black',             // Text color
    fontSize: 18,
    fontWeight:'bold',
    marginTop:20
  },
  bottomTextBottom:{
    color:'white',
    fontSize:14,
  },
  bottomTextBottomView:{
    justifyContent:'center',
    margin:20,
    alignItems: 'center'
  },
});