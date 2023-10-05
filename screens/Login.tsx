import { View, Text,Button,TextInput } from 'react-native'
import React,{useState} from 'react'
import { useAuth } from '../contexts/auth';
import { User } from '../config/interfaces';

export default function Login() {

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
      <Button title="Login" onPress={handleLogin} />
    </View>
  )
}