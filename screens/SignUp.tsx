import { View, Text,StyleSheet,TextInput, TouchableOpacity } from 'react-native'
import React,{useEffect, useState} from 'react'
import { UserSignIn } from '../util/interfaces';
import { useDispatch } from 'react-redux';

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
    setLoginError(true)
  }, []);
  
  const handleSignUp = () => {
    // Perform user registration logic here and call signUp function if successful
    navigation.navigate('Login');
    if (user.email && user.password && user.lastName && user.firstName) {

    }
  }

  const pressLogin = () =>{
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <View style={styles.middleText}>
        <Text style={styles.middleTextMain}>Welcome Back</Text>
        <Text style={styles.middleTextSub}>Your Lorem ipsum dolor sit amet hgfhg gfhh gdfgdfg dgdfgd</Text>
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
          value={user.email}
          />
          <TextInput
          style={styles.input}
          onChangeText={(text)=>{setUser({...user,lastName:text})}}
          placeholder='Last Name'
          value={user.password}
          />
          <TextInput
          style={styles.input}
          onChangeText={(text)=>{setUser({...user,email:text})}}
          placeholder='Email Address'
          value={user.password}
          />
          <TextInput
          style={styles.input}
          onChangeText={(text)=>{setUser({...user,password:text})}}
          placeholder='Password'
          value={user.password}
          />
          {/* this line will be visible is there is a login error */}
          <View style={loginError?styles.errorView:{display:'none'}}>
            <Text style={styles.error}>Incorrect email</Text>
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
    backgroundColor: 'green',
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