import { View, Text,Button,TextInput } from 'react-native'
import React,{useState} from 'react'
import { useAuth } from '../contexts/auth';
import { User } from '../config/interfaces';
import {increment,decrement} from '../features/count/counterSlice'
import { useSelector, useDispatch } from "react-redux";
// import { useSelector, useDispatch } from "react-redux/es/exports";

export default function Login() {

  const dispatch = useDispatch()
  const count:number = useSelector((state:any)=>state.counter.value)

  const { login }:any = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform authentication logic here and call login function if successful
    if (username === 'demo' && password === 'password') {
      login({ username }); // You can store user data in context
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>The count : {count}</Text>
      <Text>Login</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      {/* <Button title="Login" onPress={handleLogin} /> */}
      <Button title="Increase" onPress={()=>dispatch(increment())} />
    </View>
  )
}