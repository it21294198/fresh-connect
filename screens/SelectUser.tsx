import { View, Text,Button,StatusBar } from 'react-native'
import React from 'react'
import {increment,decrement} from '../features/count/counterSlice'
import { useDispatch,useSelector } from 'react-redux';

export default function SelectUser() {
  
  const dispatch = useDispatch()
  const count:number = useSelector((state:any)=>state.counter.value)

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>SelectUser</Text>
      <Text>The count : {count}</Text>
      <Button title="Select Farmer" onPress={()=>dispatch(increment())} />
      <Button title="Select Customer" onPress={()=>dispatch(decrement())} />
    </View>
  )
}   