import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Bubble, GiftedChat } from 'react-native-gifted-chat'
import { getMessages, getUser, sendMessage } from './ChatController'
import { CustomerHeader } from '../components/headers/CustomerHeader'
import { Div } from 'react-native-magnus'
import { UserLogin } from '../util/interfaces';
import { useSelector } from 'react-redux';

export default function Chat({ route, navigation }: any) {
  const [messages, setMessages] = useState<any[]>([])
  const { user,chatRoom } = route.params
  let id:any = useSelector((state:{user:UserLogin})=>state.user.userId)?.toString()
  let firstName:any = useSelector((state:{user:UserLogin})=>state.user.firstName)?.toString()

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
  }, [messages])

  function renderBubble(props:any) {
    return (
      // Step 3: return the component
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            // Here is the color change
            backgroundColor: '#6646ee'
          },
          left:{
            // Here is the color change
            backgroundColor: '#FCFCFC'
          }
        }}
        textStyle={{
          right: {
            color: '#fff'
          },
          left: {
            color: '#2D332B'
          }
        }}
      />
    );
  }


  function onSend(newMessage:any = []) {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessage));
    const msg:any={
      sender:id,
      senderName:firstName,
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
        _id: id, 
      }}
      scrollToBottom
      renderBubble={renderBubble}
      placeholder='Type a message here'
      isTyping={true}
    />
    </>
  )
}
