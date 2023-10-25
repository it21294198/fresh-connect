import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { getMessages, getUser, sendMessage } from './ChatController'
import { CustomerHeader } from '../components/headers/CustomerHeader'
import { Div } from 'react-native-magnus'

export default function Chat({ route, navigation }: any) {
  const [messages, setMessages] = useState<any[]>([])
  const { user,chatRoom } = route.params

  async function receiveMessages(){
    //console.log(chatRoom)
    const newMessages: any = await getMessages(chatRoom)
    
    const formattedMessage = newMessages.map((msg:any)=> (
      {
      _id: msg.id,
      text: msg.message,
      createdAt: msg.timestamp.toDate(),
      user:{
        _id:msg.sender,
        name: msg.senderName
      },
    }
    ))
    //console.log(formattedMessage)
    setMessages(formattedMessage)
  }

  useEffect(() => {
    receiveMessages()
  }, [])

  function onSend(newMessage:any = []) {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessage));
    const msg:any={
      sender:user.id,
      senderName:user.name,
      chatRoom: chatRoom,
      message:newMessage[0].text,
      // date: new Date().toDateString(),
      // time: new Date().toLocaleTimeString(), 
    }
    sendMessage(msg)
  }

  return (
    <>
    <Div flex={0.5}>
    <CustomerHeader navigation={navigation} title='Chat' headerRight={false} back={true} />
    </Div>
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{
        _id: user.id, 
      }}
      scrollToBottom
    />
    </>
  )
}
