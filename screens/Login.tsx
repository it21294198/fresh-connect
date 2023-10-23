import { View, Text,TextInput,StyleSheet, TouchableOpacity } from 'react-native'
import React,{useEffect, useState} from 'react'
import { User } from '../util/interfaces';
import { useDispatch } from "react-redux";
import { logUser } from '../features/user/userSlice';
import SignUp from './SignUp';

export default function Login({navigation}:any) {
  const dispatch = useDispatch()
  const [user, setUser] = useState<User>({
    email:'',
    password:''
  });
  const [loginError, setLoginError] = useState(false);
  
  useEffect(() => {
    setLoginError(true)
  }, []);

  const handleLogin = () => {
    // Perform authentication logic here and call login function if successful
    dispatch(logUser('demo'))
    if (user.email === 'demo' && user.password === 'password') {
      // login({ username }); // You can store user data in context
    }

  }

  const pressSignUp = () =>{
    navigation.navigate('SignUp');
  }

  return (
    <View style={styles.container}>
      <View style={styles.middleText}>
        <Text style={styles.middleTextMain}>Welcome Back</Text>
        <Text style={styles.middleTextSub}>Your Lorem ipsum dolor</Text>
        <Text style={styles.middleTextSub}>amet</Text>
      </View>
      <View style={styles.bottom}>
          <View style={styles.bottomTextTopView}>
            <Text style={styles.bottomTextTop}>Login</Text>
          </View>
        <View style={styles.inputView}>
          <TextInput
          style={styles.input}
          onChangeText={(text)=>{setUser({...user,email:text})}}
          placeholder='Email Address'
          value={user.email}
          />
          <TextInput
          style={styles.input}
          onChangeText={(text)=>{setUser({...user,password:text})}}
          placeholder='Password'
          value={user.password}
          />
          {/* this line will be visible is there is a login error */}
          <View style={loginError?styles.errorView:{display:'none'}}>
            <Text style={styles.error}>Incorrect email or password</Text>
          </View>
          </View>
          <View style={styles.loginBtnContainer}>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={()=>{handleLogin()}}
            ><Text style={styles.loginBtnText}>Login</Text></TouchableOpacity>
          </View>
          <View style={styles.signupContainer}>
            <Text style={styles.bottomTextBottom}>Don't have an account?</Text>
            <TouchableOpacity 
            onPress={()=>{pressSignUp()}}
            ><Text style={styles.signupBtn}> Sign Up</Text></TouchableOpacity>
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
    flex: 0.5,
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
    marginBottom:50
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
    alignItems:'center'
  },
  error:{
    color:'red',
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