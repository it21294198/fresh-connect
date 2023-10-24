import { View, Text,StyleSheet,TextInput, TouchableOpacity } from 'react-native'
import React,{useEffect, useState} from 'react'
import { UserSignIn } from '../util/interfaces';
import { useDispatch } from 'react-redux';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth,fireStore } from '../config/firebase';
import { doc, setDoc } from "firebase/firestore"; 
import { setLoadingFalse, setLoadingTrue } from '../features/connection/loaderSlice';

export default function SignUp({navigation}:any) {
  const dispatch = useDispatch()
  const [loginError, setLoginError] = useState(false);
  const [user, setUser] = useState<UserSignIn>({
    firstName:'',
    lastName:'',
    email:'',
    password:''
  });

  useEffect(() => {
    setLoginError(false)
  }, []);
  
const handleSignUp = async () => {
  if (user.email && user.password && user.lastName && user.firstName) {
    dispatch(setLoadingTrue());
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
      const userRef = userCredential.user;
      // console.log(user);
      
      // Add other details to Firestore
      await setDoc(doc(fireStore, "users", userRef.uid), {
        email:user.email,
        firstName:user.firstName,
        lastName:user.lastName,
        isSeller:false
      });
      dispatch(setLoadingFalse());
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
      setLoginError(true);
      dispatch(setLoadingFalse());
    }
  } else {
    setLoginError(true);
  }
};

const pressLogin = () =>{
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <View style={styles.middleText}>
        <View style={styles.middleTextMainView}>
          <Text style={styles.middleTextMain}>Welcome to</Text>
          <Text style={styles.middleTextMain}>FreshConnect</Text>
        </View>
        <Text style={styles.middleTextSub}>Your Lorem ipsum dolor</Text>
        <Text style={styles.middleTextSub}>amet</Text>
      </View>
      <View style={styles.bottom}>
          <View style={styles.bottomTextTopView}>
            <Text style={styles.bottomTextTop}>Sign Up</Text>
          </View>
        <View style={styles.inputView}>
          <TextInput
          style={styles.input}
          onChangeText={(text)=>{setUser({...user,firstName:text})}}
          placeholder='First Name'
          />
          <TextInput
          style={styles.input}
          onChangeText={(text)=>{setUser({...user,lastName:text})}}
          placeholder='Last Name'
          />
          <TextInput
          style={styles.input}
          onChangeText={(text)=>{setUser({...user,email:text})}}
          placeholder='Email Address'
          />
          <TextInput
          style={styles.input}
          onChangeText={(text)=>{setUser({...user,password:text})}}
          placeholder='Password'
          />
          {/* this line will be visible is there is a login error */}
          <View style={loginError?styles.errorView:{display:'none'}}>
            <Text style={styles.error}>Incorrect Details</Text>
          </View>
          </View>
          <View style={styles.loginBtnContainer}>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={()=>{handleSignUp()}}
            ><Text style={styles.loginBtnText}>Sign Up</Text></TouchableOpacity>
          </View>
          <View style={styles.signupContainer}>
            <Text style={styles.bottomTextBottom}>Already have an account?</Text>
            <TouchableOpacity 
            onPress={()=>{pressLogin()}}
            ><Text style={styles.signupBtn}> Login</Text></TouchableOpacity>
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
    flex: 1,
    backgroundColor: '#45A053',
    borderWidth: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  middleText:{
    flex: 0.5,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', 
  },
  middleTextMain:{
    fontSize:29,
    fontWeight:'bold',
  },
  middleTextMainView:{
    marginBottom:50,
    marginTop:20,
    alignItems:'center',
    textAlign:'justify'
  },
  middleTextSub:{
    fontSize:22,
    alignItems:'center',
    textAlign:'justify'
  },
  bottomTextTopView:{
    alignItems:'center'
  },  
  bottomTextTop:{
    color:'white',
    fontWeight:'bold',
    fontSize:40,
    marginTop:20
  },
  errorView:{
    alignItems:'center',
    backgroundColor:'red',
    borderRadius:20
  },
  error:{
    color:'white',
    fontWeight:'bold',
    fontSize:15
  },
  inputView:{
    margin:20
  },
  input:{
    fontSize:15, 
    height: 50,
    margin: 10,
    borderWidth: 0,
    backgroundColor:'white',
    borderRadius:10,
    padding: 10,
  },
  loginBtnContainer:{
    marginLeft:40,
    marginRight:40
  },
  loginBtn:{
    backgroundColor: '#774CBF', // Background color
    padding: 15,                // Padding
    borderRadius: 8,            // Border radius
    justifyContent: 'center',   // Center content vertically
    alignItems: 'center',
    marginLeft:30,
    marginRight:30
  },
  loginBtnText:{
    color: 'white',             // Text color
    fontSize: 18,
    fontWeight:'bold'
  },
  bottomTextBottom:{
    color:'white',
    fontSize:14,
  },
  signupContainer:{
    justifyContent:'center',
    flexDirection: 'row', // Display items horizontally
    margin:20
  },
  signupBtn:{
    color:'white',
    fontSize:14,
    textDecorationLine: 'underline'
  }
});