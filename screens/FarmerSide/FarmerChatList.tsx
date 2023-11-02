import { View, Platform, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, Icon, Div, Text } from 'react-native-magnus'
import { getChatRooms, getMessages, getUser } from '../ChatController'
import { UserLogin } from '../../util/interfaces';
import { useSelector } from 'react-redux';
import { CustomerHeader } from '../../components/headers/CustomerHeader';

export default function FarmerChatList({ route, navigation }: any) {
  const [chatRoom, setChatRoom] = useState<any[]>([])
  let uId:any = useSelector((state:{user:UserLogin})=>state.user.userId)?.toString()
  //const { user } = route.params

  // const user1 = {
  //   id: "8SoZKFk8U0q6l2lEbogL",
  //   name: 'John'
  // }

  async function getRooms() {
    const rooms: any = await getChatRooms(uId);
    const chatRoomDataPromises = rooms.map(async (room: any) => {
      const messages: any = await getMessages(room.id);
      const participantName: string = await getUser(room.participants[0]);
      return {
        room,
        lastMsg: messages[0]?.message || '',
        time: messages[0]?.timestamp.toDate().toLocaleTimeString() || '',
        name: participantName,
      };
    });
    const chatRoomData = await Promise.all(chatRoomDataPromises);
    setChatRoom(chatRoomData);
    console.log(chatRoom)
  }

  // async function renderLastMessage(id:string) {
  //   const lastMessage: any = await getMessages(id)
  //   return(
  //     <Text>
  //       {lastMessage[0]}
  //     </Text>
  //   )
  // }

  // async function getRoomUser(id:string) {
  //   let roomUser: string
  //   getUser(id).then((user:string) => {
  //     roomUser = user
  //   })
  //   return roomUser
  // }

  useEffect(() => {
    getRooms()
  }, [chatRoom])

  // const user1 = {
  //   id: "8SoZKFk8U0q6l2lEbogL",
  //   name: 'John'
  // }

  // const user2 = {
  //   id: "Z04NU1rDCHE8GNus2HbL",
  //   name: 'Peter' 
  // }
  // const chatRooms = [
  //   {
  //     id: '8oCIlz7fwspqb6EOZG4D1',
  //     name: 'Nuwara Farm Chat'
  //   },
  //   {
  //     id: 'nglQRgIiMMIqccafJeFm',
  //     name: 'Western Farm Chat'
  //   },
  // ]

  const renderChatRooms:any = chatRoom.map((roomData, index) => {
    //renderLastMessage(room.id)
    // await getMessages(room.id).then((msg:any) => {
    //   setLastMsg(msg[0].message)
    //   setTime(msg[0].timestamp.toDate().toLocaleTimeString())
    // })
    // await getUser(room.participants[1]).then((user:string) => {
    //   setName(user)
    // })
    //const name:string = getRoomUser(room.participants[1])
    return (
      <Div key={index} m="sm" rounded="lg" bg="white" shadow="md" p="md">
        <TouchableOpacity onPress={() => {navigation.navigate('Chat', { chatRoom: roomData.room.id })}}>
        <Div row>

        <Div flex={1} alignItems='flex-start' mt="sm">
        <Text fontWeight="bold" fontSize="xl">
        <Icon name='user-circle' fontFamily='FontAwesome5' fontSize={20} color='white' bg='blue500' mx="md" h={30} w={30} rounded="circle" />  
        {roomData.name}
        </Text>
        </Div>

        <Div flex={1} alignItems='flex-end'>
        <Text fontSize="md" color="gray500" ml="md" mt="md">
        {roomData.time}
        </Text>
        </Div>

        </Div>
        <Div row>
        <Text fontSize="md" color="gray500" ml="md" mt="sm">
        {roomData.lastMsg}
        </Text>
        </Div>
        </TouchableOpacity>
      </Div>
    )
  })

  return (
    <>
  <CustomerHeader navigation={navigation} title='My Chats' headerRight={false} back={false} />
    <ScrollView style={styles.scrollview}>
      <View style={styles.container}>
      {!(chatRoom.length===0) ? renderChatRooms :
        <Div justifyContent='center' alignItems='center'>
          <Text fontSize="xl" color='red500'>
            No any Chats
            </Text>
            </Div>}
      </View>
    </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollview: {
    flex: 1,
    minHeight: '100%'
  },
})