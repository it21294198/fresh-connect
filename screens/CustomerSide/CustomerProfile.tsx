import { View, Button,TextInput} from 'react-native'
import React,{useState} from 'react'
import { collection, addDoc } from 'firebase/firestore';
import {fireStore} from '../../config/firebase'

export default function CustomerProfile() {
  const [text, setText] = useState('');

  const addDataToFirestore = async () =>{
    try {
      const docRef = await addDoc(collection(fireStore, 'text'), {
        text,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TextInput
        placeholder="Enter data here"
        onChangeText={(value) => setText(value)}
        value={text}
      />
      <Button title="Add Data" onPress={addDataToFirestore} />
    </View>
  )
}