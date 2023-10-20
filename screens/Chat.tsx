import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

export default function Chat({ route, navigation }: any) {
  const [messages, setMessages] = useState([])
  const { user,name } = route.params
  const data = [
    {
      _id: 0,
      text: 'New Chat Created',
      createdAt: new Date().getTime(),
      system: true
    },
    {
      _id: 1,
      text: 'Hello!',
      createdAt: new Date().getTime(),
      user: user
    }
  ]

  const handleSend: any = (newMessage = []) => {
    setMessages(GiftedChat.append(messages, newMessage))
  }

  return (
    <View>
      <Text>This is {name}</Text>
      <GiftedChat messages={messages} onSend={newMessage => handleSend(newMessage)} user={{ _id: 1 }} />
    </View>
  )
}