import { View, Text,TextInput,Dimensions  } from 'react-native'
import React,{useState} from 'react'
import { useAuth } from '../contexts/auth';
import { User } from '../config/interfaces';
import {increment,decrement} from '../features/count/counterSlice'
import { useSelector, useDispatch } from "react-redux";
// import { useSelector, useDispatch } from "react-redux/es/exports";
import { Input, Icon,Button ,Div} from "react-native-magnus";

export default function Login() {

  const dispatch = useDispatch()
  const count:number = useSelector((state:any)=>state.counter.value)

  const { login }:any = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { width } = Dimensions.get('window'); 

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
      <View style={{width:width/2}}>
      <Input
      placeholder="email"
      p={10}
      focusBorderColor="blue700"
      suffix={<Icon name="search" color="gray900" fontFamily="Feather" />}
      onChangeText={(text) => setUsername(text)}
      />
      <Input
      placeholder="password"
      p={10}
      focusBorderColor="blue700"
      suffix={<Icon name="search" color="gray900" fontFamily="Feather" />}
      onChangeText={(text) => setPassword(text)}
      secureTextEntry={true}
      />
      {/* <Button title="Login" onPress={handleLogin} /> */}
      </View>
      <Div h={width} w={width/2} bg="pink500">
          <Button
    mt="lg"
    px="xl"
    py="lg"
    bg="green700"
    color="white"
    suffix={<Icon name="arrowright" ml="md" color="white" />}
    onPress={()=>dispatch(increment())}
    >Login</Button>
      </Div>
    </View>
  )
}