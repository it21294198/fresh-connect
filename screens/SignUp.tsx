import { View, Text,Button,TextInput } from 'react-native'
import React,{useState} from 'react'
import { useAuth } from '../contexts/auth';

export default function SignUp() {

  const { signUp }:any = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // Perform user registration logic here and call signUp function if successful
    if (username && password) {
      signUp({ username, password }); // You can store user data in context
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Sign Up</Text>
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
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  )
}       