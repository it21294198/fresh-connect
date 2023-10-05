import { View, Text,Button,StatusBar } from 'react-native'
import React from 'react'
// import { useSelector } from 'react-redux/es/hooks/useSelector';
import {increment,decrement} from '../features/count/counterSlice'
import { useDispatch,useSelector } from 'react-redux';
// import { useSelector, useDispatch } from "react-redux/es/exports";

export default function SelectUser() {


    const dispatch = useDispatch()
  const count:number = useSelector((state:any)=>state.counter.value)

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>SelectUser</Text>
      <Text>The count : {count}</Text>
      <Button title="Increase" onPress={()=>dispatch(increment())} />
      <Button title="Decrement" onPress={()=>dispatch(decrement())} />
    </View>
  )
}   